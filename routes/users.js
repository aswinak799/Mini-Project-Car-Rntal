var express = require('express');
var router = express.Router();
var userHelper = require('../helper/user-helper');
var adminHelper = require('../helper/admin-helper');
var database = require('../config/connection');
var bcrypt = require('bcrypt');
const { response } = require('express');
const fs = require('fs');
//var validator = require('express-validator');
let errMessage;

const verifyLogin=(req,res,next)=>{
  if(req.session.user){
    if(req.session.user.user_type === 'customer') next();
    else res.redirect('/login');
    
  }else{
    res.redirect('/login')
  }
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index',{title:'Home Page'});
});

router.get('/register',(req,res)=>{

  res.render('user/register',{'errMsg':errMessage});
  errMessage = false;


})
router.post('/register',async(req,res)=>{
  let user_ph = await userHelper.existPhone(req.body.phone);
  if(user_ph.length >0){
    console.log(user_ph);
    return res.status(500).send('<script>alert("Phone number already exists");window.location="/register"</script>')
  }else{
  
        let fname = req.body.fname;
        let email = req.body.email;
        let dob = req.body.dob;
        let gender = req.body.gender;
        let phone = req.body.phone;
        let address = req.body.address;
        let docs = req.body.document_type;
        let Password = await bcrypt.hash(req.body.password,10);
        let l_id;
        if(req.files){
          image = req.files.image;
          document = req.files.document;
        }
        console.log(Password);
    
    var sql1 =  `INSERT INTO login(email,password) values("${email}","${Password}")`;
    database.query(sql1,(err,result)=>{
      if(!err){
         l_id= result.insertId;
         console.log(l_id);
        var sql = `INSERT INTO registration(full_name,gender,dob,phone,address,l_id) values("${fname}","${gender}","${dob}","${phone}","${address}","${l_id}")`; 
        // var sql = "INSERT INTO registration(full_name,gender,dob,email,phone,address,l_id) values('"+fname+"','"+gender+"','"+dob+"','"+email+"','"+phone+"',"+address+"','"+l_id+"','"+Password+"')"; 
            database.query(sql, function(err, result) {
              //if(err) throw err
              if (err) {
                errMessage=true;
                res.redirect('/register')
                
              console.log(err.sqlMessage);
              } else {
                
                image.mv('./public/user-images/'+fname+result.insertId+'.jpg',(err,done)=>{
                  if(err){
                    return res.status(500).send(err);
                  }
                  document.mv('./public/user-document/'+docs+result.insertId+'.jpg',(err,done)=>{
                    if(err){
                      return res.status(500).send(err);
                    }else{
                      let user_type="customer"
                      userHelper.uploadDocument({'Document':docs},result.insertId,user_type).then(()=>{
                        return res.redirect('/login');
                      })
                    }
                    
  
                  })

                })
              }
              })
      }else{
        res.redirect('/register')
        errMessage=true;
      }
    })
            
  }
    
    })
    


router.get('/login',(req,res)=>{
  res.render('login',{'loginerr':req.session.userloggedInErr})
  req.session.userloggedInErr = null;
})

router.post('/login',(req,res)=>{
  console.log(req.body);
  userHelper.doLogin(req.body).then((response)=>{
    if(response.status){
      
      req.session.user=response.user
      req.session.userloggedIn=true
      if(req.session.user.user_type === 'admin')res.redirect('/admin')
      else if(req.session.user.user_type === 'driver') res.redirect('/driver')
      else res.redirect('/user-home')
    }else{
      req.session.userloggedInErr=true
      res.redirect('/login')
    }
    console.log(req.session.user)
  })

})

//user home
router.get('/user-home',verifyLogin,(req,res)=>{
  console.log(req.session.user);
  let user = req.session.user;
 
  let dob = user.dob;
  const date = dob.split('T')[0];
  // console.log("************************",date)
  user.dob = date;
  res.render('user/user-home',{'user':true,'customer':user})
})
//update profile
router.get('/update-profile',verifyLogin,(req,res)=>{
  
  let dob = req.session.user.dob
  const[date,time] = dob.split('T')
  console.log(time);
  res.render('user/update-profile',{'user':true,'customer':req.session.user,'date':date})
})
router.post('/update-profile',async(req,res)=>{
  let user_ph = await userHelper.existPhoneWhenUpdate(req.body.phone,req.session.user.user_id);
  // console.log(user_ph,"**********************************");
  if(user_ph.length >0){
    
    return res.status(500).send('<script>alert("Phone number already exists");window.location="/update-profile"</script>')
  }else{
  let name = await req.session.user.full_name;
  let id = await req.session.user.user_id;
  // console.log(name+id,'***************************');
  req.session.user.full_name=req.body.fname;
  req.session.user.email=req.body.email;
  req.session.user.dob=req.body.dob;
  req.session.user.gender=req.body.gender;
  req.session.user.phone=req.body.phone;
  req.session.user.address=req.body.address;
  let image;
  if(req.files){
    image = req.files.image;
    image.mv('./public/user-images/'+req.body.fname+req.session.user.user_id+'.jpg',(err,done)=>{
      if(err){
        console.log(err);

      }
      

    })
    
  }else{
    fs.rename('./public/user-images/'+name+id+'.jpg','./public/user-images/'+req.body.fname+id+'.jpg', (err)=>{
      if(err){
        
        return res.status(500).send('Updation Faild')
      }
    })
  }

  userHelper.updateUser(req.session.user.user_id,req.session.user.l_id,req.body).then(()=>{
    res.redirect('/user-home');
    
  }).catch((status)=>{
    return res.status(500).send("<h1>Somthing wrong</h1>");
  })
}
})
//view documents
router.get('/my-documents',verifyLogin,(req,res)=>{
  userHelper.getDocuments(req.session.user.l_id,req.session.user.user_type).then((response)=>{
    return res.render('user/my-documents',{'user':true,'docs':response,'customer':req.session.user});
  })
  
})
//add document
router.get('/add-document',verifyLogin,(req,res)=>{
  res.render('user/add-document',{'user':true,'customer':req.session.user})
})
router.post('/add-document',async(req,res)=>{
  // let totalDocs = await userHelper.getDocumentLength(req.session.user.user_id)
  // console.log(totalDocs);
  // let fname = req.session.user.full_name;
  let docs = req.body.Document;
  let user_id = req.session.user.user_id;
  if(req.files){
    let document = req.files.document;
    document.mv('./public/user-document/'+docs+user_id+'.jpg',(err,done)=>{
      if(err){
        return res.status(500).send(err);
      }
    })
  }
  
    userHelper.uploadDocument(req.body,req.session.user.user_id,req.session.user.user_type).then(()=>{
      res.redirect('/my-documents');
  
    }).catch(()=>{
      return res.redirect('/my-documents');
    })
})

//booking form
router.get('/booking-form',verifyLogin,(req,res)=>{
  res.render('user/booking-form',{'customer':req.session.user,"user":true})
})

router.get('/cars',verifyLogin,async(req,res)=>{

  // let cate =[{cname:'Hatchback'},
  //   {cname:'Sedan'},
  //   {cname:'SUV'},
  //   {cname:'MUV'},
  //   {cname:'Luxury'}
  // ]
  let cate = await userHelper.getCategories()
  console.log(cate);
  let cars =await adminHelper.getCarsOrderby(req.session.picup,req.session.dropoff)
  let l = cars.length;
  for (let i = 0; i < l; i++) {
    cars[i].amount = cars[i].amount * req.session.rent_days;
    
    
  }
  // console.log(cars);
  res.render('user/car-lists',{'user':true,'customer':req.session.user,'days':req.session.rent_days,'cars':cars,'category':cate})
  // req.session.rent_days = null;
})

router.post('/car-search',async(req,res)=>{
  
  let dropoff = req.body.dropoff;
  let picup = req.body.picup;
  let days = parseInt(new Date(dropoff) - new Date(picup)) / (1000 * 60 * 60 * 24);
  req.session.rent_days = days;
  req.session.picup = picup;
  req.session.dropoff = dropoff; 
  console.log(req.session.rent_days);
  res.redirect('/cars')
})
router.get('/take-driver/:id',(req,res)=>{
  req.session.car_id = req.params.id;
  
  res.render('user/driver-choice',{'customer':req.session.user,'user':true,})
  console.log(req.params.id);

});
//without driver
router.get('/checkout',verifyLogin,async(req,res)=>{
  // console.log(req.session.car_id);
  let car = await userHelper.getCar(req.session.car_id).catch(()=>{
    return res.status(500).send('Something wrong')
  });
  let totalAmt = req.session.rent_days * car.amount; 
  res.render('user/checkout',{'customer':req.session.user,'user':true,'car':car,'amount':totalAmt,'date':{'picup':req.session.picup,'drop':req.session.dropoff,'days':req.session.rent_days}})
});

router.post('/checkout',async(req,res)=>{
  let car = await userHelper.getCar(req.session.car_id)

  let bookingDetails;
 if(req.session.dr_id){

  bookingDetails = {
    car_id : req.session.car_id,
   user_id : req.session.user.user_id,
   picup : req.session.picup,
   dropoff : req.session.dropoff,
   days : req.session.rent_days,
   amount : req.body.amount,
   driver : req.session.dr_id,

 };

  // userHelper.changeDriverStatus(req.session.dr_id).then(()=>{

  // }).catch(()=>{
  //   return res.status(500).send('Booking Faild');
  // })
 

 }else{
  bookingDetails = {
    car_id : req.session.car_id,
   user_id : req.session.user.user_id,
   picup : req.session.picup,
   dropoff : req.session.dropoff,
   days : req.session.rent_days,
   amount : req.body.amount,

 };

 }
  




 if (car.status === 'Available') {
  
 
  userHelper.placeOrder(bookingDetails).then((orderId)=>{
    req.session.b_id=orderId;
    userHelper.generateRazorpay(req.session.b_id,bookingDetails.amount).then((response)=>{
      console.log(response);
      res.json(response)
    })
    // userHelper.changeCarStatus(bookingDetails.car_id).then(()=>{
  
    // })

  }).catch(()=>{
    return res.status(500).send('<h1>Something Wrong</h1>');
  })
}else{
  res.json({status:false});
}

});

//with driver

router.get('/checkout-with-driver/:d_id',verifyLogin,async(req,res)=>{
  req.session.dr_id = req.params.d_id;
  // console.log(req.session.car_id);
  let car = await userHelper.getCar(req.session.car_id).catch(()=>{
    return res.status(500).send('Something wrong')
  });
  let rentAmt = req.session.rent_days * car.amount;
  let totalAmt = req.session.rent_days * car.amount + req.session.rent_days * 700;
  let drAmt =  req.session.rent_days * 700;
  res.render('user/checkout',{'customer':req.session.user,'user':true,drv:drAmt,'car':car,'amount':totalAmt,carAmt:rentAmt,'date':{'picup':req.session.picup,'drop':req.session.dropoff,'days':req.session.rent_days}})
});



router.post('/verify-payment',async(req,res)=>{
  // console.log(req.body);
  // console.log("****************************");
  // console.log(req.body)
  userHelper.verifyPayment(req.body).then(()=>{
    
    console.log(req.body);
    userHelper.changeBookingStatus(req.session.b_id).then(()=>{
      
      res.json({status:true})
    })
  }).catch((err)=>{
    console.log(err);
    res.json({status:'payment Faild'})
  })

});

router.get('/payment-success',(req,res)=>{
  res.send('<script>alert("Payment Success");window.location="/user-home"</script>')
})

//select select-driver
router.get('/select-driver',verifyLogin,(req,res)=>{
  adminHelper.getAllDrivers(req.session.picup,req.session.dropoff).then((response)=>{
    res.render('user/driver-list',{drivers:response,user:true,customer:req.session.user})
  })
})


router.get('/bookings',verifyLogin,(req,res)=>{
  userHelper.getBookings(req.session.user.user_id).then(async(bookings)=>{
    for (let i = 0; i < bookings.length; i++) {
      bookings[i].picup =await bookings[i].picup.toString().split('00')[0];
      bookings[i].dropoff =await bookings[i].dropoff.toString().split('00')[0];
      bookings[i].time =await bookings[i].time.toString().split('GMT')[0];
      
      
    }
    console.log(bookings)
    res.render('user/bookings',{booking:bookings,user:true,customer:req.session.user})
  })
  
})


//view bookings
router.get('/view-booking',verifyLogin,async(req,res)=>{
  let driver;
  if (req.query.driver_id) {
    
   driver =await adminHelper.getDriver(req.query.driver_id);
   driver = driver[0]
   console.log(driver);
  }
  let rent_details =await userHelper.getBooking(req.query.booking_id)
  let pic=rent_details.picup;
  let drop = rent_details.dropoff;
  const[d_date,d_time] = drop.toString().split('00');
  const[date,time] = pic.toString().split('00');
  rent_details.picup = date;
  rent_details.dropoff = d_date;
  console.log(rent_details.picup);
  let car =await userHelper.getCar(req.query.car_id)
  res.render('user/view-booking',{car:car,emp:driver,user:true,customer:req.session.user,booking:rent_details})
 
})

//Booking cancel
router.get('/booking-cancel',(req,res)=>{
  let booking_id = req.query.booking_id;
  let car_id =  req.query.car_id;
  let driver_id = req.query.driver_id;
  userHelper.cancelBooking(booking_id,car_id,driver_id).then(()=>{
    res.redirect('/bookings')
  }).catch(()=>{
    return res.status(500).send("<h1 align='center'>ERROR</h1>");
  })
})


//contact section

router.get('/contact',(req,res)=>{
  res.render('user/feedback')
})
router.post('/contact',(req,res)=>{
  userHelper.feedback(req.body).then(()=>{
    return res.send('<script>alert("Message sending");window.location="/"</script>');
  }).catch(()=>{
    return res.send('<script>alert("Message sending faild");window.location="/contact"</script>');
  })
});


//feedback section

router.get('/booking-feedback',(req,res)=>{
  console.log(req.query);
  userHelper.leaveFeedback(req.query).then(()=>{
    res.redirect('/bookings')
  }).catch(()=>{
    res.send('<script>alert(" You already sumitted ");window.location="/bookings"</script>')
  })

})


//logout section
router.get('/logout',(req,res)=>{
  req.session.user=null
  req.session.userloggedIn=false
  // req.session.destroy()
  res.redirect('/')

})


module.exports = router;
