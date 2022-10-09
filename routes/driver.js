var express = require('express');
var router = express.Router();
var userHelper = require('../helper/user-helper');
var adminHelper = require('../helper/admin-helper');

router.get('/', function(req, res, next) {
    res.render('driver/driver-home',{'driver':req.session.user});
  });
router.get('/update-profile',(req,res)=>{
  res.render('driver/update-profile',{'driver':req.session.user})
});
router.post('/update-profile',(req,res)=>{
  console.log(req.body);
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
  }

  userHelper.updateDriver(req.session.user.driver_id,req.session.user.l_id,req.body).then(()=>{
    res.send('<script>alert("Successfully updated");window.location="/driver"</script>')
    // res.redirect('/driver/');
    
  }).catch((status)=>{
    return res.status(500).send("<h1>Somthing wrong</h1>");
  })
})


router.get('/my-documents',(req,res)=>{
  userHelper.getDocuments(req.session.user.l_id,req.session.user.user_type).then((response)=>{
    return res.render('driver/my-documents',{'driver':req.session.user,'docs':response,});
  })
  
})
//add document
router.get('/add-document',(req,res)=>{
  res.render('driver/add-document',{'driver':req.session.user})
})
router.post('/add-document',async(req,res)=>{
  // let totalDocs = await userHelper.getDocumentLength(req.session.user.user_id)
  // console.log(totalDocs);
  let fname = req.session.user.name;
  let docs = req.body.Document;
  let driver_id = req.session.user.driver_id;
  if(req.files){
    let document = req.files.document;
    document.mv('./public/driver-documents/'+fname+docs+driver_id+'.jpg',(err,done)=>{
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
router.get('/change-status',(req,res)=>{
  let id = req.query.Id;
  console.log(id);
  
  let status =  req.query.status;
  req.session.user.status=status;
  adminHelper.changeDriverStatus(status,id).then((response)=>{
    res.redirect('/driver/')
  })  
})

router.get('/login',(req,res)=>{
    res.send('driver login')
})
module.exports = router;