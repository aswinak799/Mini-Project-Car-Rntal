var express = require('express');
var router = express.Router();
var userHelper = require('../helper/user-helper');
var adminHelper = require('../helper/admin-helper');
const fs = require('fs');
const verifyLogin=(req,res,next)=>{
  if(req.session.user){
    if(req.session.user.user_type === 'driver') next();
    else res.redirect('/login');
    
  }else{
    res.redirect('/login')
  }
}

router.get('/',verifyLogin, function(req, res, next) {
    res.render('driver/driver-home',{'driver':req.session.user});
  });
router.get('/update-profile',verifyLogin,(req,res)=>{
  let dob = req.session.user.dob
  const[date,time] = dob.split('T')
  res.render('driver/update-profile',{'driver':req.session.user,'date':date})
});
router.post('/update-profile',async(req,res)=>{

  let name  =await req.session.user.name;
  let id = await req.session.user.driver_id;
  req.session.user.name=req.body.fname;
  req.session.user.email=req.body.email;
  req.session.user.dob=req.body.dob;
  req.session.user.gender=req.body.gender;
  req.session.user.phone=req.body.phone;
  req.session.user.exp=req.body.exp;
  req.session.user.address=req.body.address;
  let image;

  if(req.files){
    image = req.files.image;
    image.mv('./public/driver-images/'+req.body.fname+req.session.user.driver_id+'.jpg',(err,done)=>{
      if(err){
        return res.status(500).send("<h1>Image Uploading Faild</h1><br><h2>Please Try again</h2>")
      }
    })
  }else{
    // fs.readdir('./public/driver-images/',(err,files)=>{
    //   if(err){
    //     throw err;
    //   }else{
    //     files.forEach(file => {
    //       console.log(file);
    //     });
    //   }
    // })
    fs.rename('./public/driver-images/'+name+id+'.jpg','./public/driver-images/'+req.body.fname+id+'.jpg', (err)=>{
      if(err){
        
        return res.status(500).send('Updation Faild')
      }
    })
  }

  userHelper.updateDriver(req.session.user.driver_id,req.session.user.l_id,req.body).then(()=>{
    res.send('<script>alert("Successfully updated");window.location="/driver"</script>')
    // res.redirect('/driver/');
    
  }).catch((status)=>{
    return res.status(500).send('<script>alert("Mobile number already exist");window.location="/driver/update-profile"</script>');
  })
})


router.get('/my-documents',verifyLogin,(req,res)=>{
  userHelper.getDocuments(req.session.user.l_id,req.session.user.user_type).then((response)=>{
    return res.render('driver/my-documents',{'driver':req.session.user,'docs':response,});
  })
  
})
//add document
router.get('/add-document',verifyLogin,(req,res)=>{
  res.render('driver/add-document',{'driver':req.session.user})
})
router.post('/add-document',async(req,res)=>{
  // let totalDocs = await userHelper.getDocumentLength(req.session.user.user_id)
  // console.log(totalDocs);
  // let fname = req.session.user.name;
  let docs = req.body.Document;
  let driver_id = req.session.user.driver_id;
  if(req.files){
    let document = req.files.document;
    document.mv('./public/driver-documents/'+docs+driver_id+'.jpg',(err,done)=>{
      if(err){
        return res.status(500).send(err);
      }
    })
  }
  
    userHelper.uploadDocument(req.body,req.session.user.driver_id,req.session.user.user_type).then(()=>{
      res.redirect('/driver/my-documents');
  
    }).catch(()=>{
      return res.send('<script>alert("Document Updated");window.location="/driver/my-documents"</script>')
    })
})


//change status
router.get('/change-status',verifyLogin,(req,res)=>{
  let id = req.query.Id;
  console.log(id);
  
  let status =  req.query.status;
  req.session.user.status=status;
  adminHelper.changeDriverStatus(status,id).then((response)=>{
    res.redirect('/driver/')
  })  
})

//Bookings
router.get('/bookings',verifyLogin,(req,res)=>{
  let driver_id = req.session.user.driver_id;
  userHelper.getDriverBookings(driver_id).then(async(data)=>{
    for (let i = 0; i < data.length; i++) {
      data[i].picup =await data[i].picup.toString().split('00')[0];
      data[i].dropoff =await data[i].dropoff.toString().split('00')[0];
      data[i].time =await data[i].time.toString().split('GMT')[0];
      
      
    }
      res.render('driver/all-bookings',{driver:req.session.user,bookings:data})
  })
   
})

//view-booking
router.get('/view-booking',verifyLogin,async(req,res)=>{

  let user = await adminHelper.getUser(req.query.user_id);
  console.log(user);
  let rent_details =await userHelper.getBooking(req.query.booking_id)
  let pic=rent_details.picup;
  let drop = rent_details.dropoff;
  const[d_date,d_time] = drop.toString().split('00');
  const[date,time] = pic.toString().split('00');
  rent_details.picup = date;
  rent_details.dropoff = d_date;
  console.log(rent_details.picup);
  let car =await userHelper.getCar(req.query.car_id)
  res.render('driver/view-booking',{car:car,driver:req.session.user,customer:user[0],booking:rent_details})
})
//login
router.get('/login',(req,res)=>{
    res.send('driver login')
})
module.exports = router;