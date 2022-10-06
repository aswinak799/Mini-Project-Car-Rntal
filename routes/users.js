var express = require('express');
var router = express.Router();
var userHelper = require('../helper/user-helper');
var database = require('../config/connection');
var bcrypt = require('bcrypt');
const { response } = require('express');
//var validator = require('express-validator');
let errMessage;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index',{title:'Home Page'});
});

router.get('/register',(req,res)=>{

  res.render('user/register',{'errMsg':errMessage});
  errMessage = false;


})
router.post('/register',async(req,res)=>{
  console.log(req.body);
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
                  document.mv('./public/user-document/'+fname+docs+result.insertId+'.jpg',(err,done)=>{
                    if(err){
                      return res.status(500).send(err);
                    }else{
                      userHelper.uploadDocument({'Document':docs},result.insertId).then(()=>{
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
router.get('/user-home',(req,res)=>{
  console.log(req.session.user);
  let user = req.session.user;
 
  // let dob = user.dob;
  // console.log("************************",dob.toDateString())
  // user.dob = dob.toDateString()
  res.render('user/user-home',{'user':true,'customer':user})
})
//update profile
router.get('/update-profile',(req,res)=>{
  res.render('user/update-profile',{'user':true,'customer':req.session.user})
})
router.post('/update-profile',(req,res)=>{
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
    
  }

  userHelper.updateUser(req.session.user.user_id,req.session.user.l_id,req.body).then(()=>{
    res.redirect('/user-home');
    
  }).catch((status)=>{
    return res.status(500).send("<h1>Somthing wrong</h1>");
  })
})
//view documents
router.get('/my-documents',(req,res)=>{
  userHelper.getDocuments(req.session.user.l_id).then((response)=>{
    return res.render('user/my-documents',{'user':true,'docs':response,});
  })
  
})
//add document
router.get('/add-document',(req,res)=>{
  res.render('user/add-document',{'user':true})
})
router.post('/add-document',async(req,res)=>{
  // let totalDocs = await userHelper.getDocumentLength(req.session.user.user_id)
  // console.log(totalDocs);
  let fname = req.session.user.full_name;
  let docs = req.body.Document;
  let user_id = req.session.user.user_id;
  if(req.files){
    let document = req.files.document;
    document.mv('./public/user-document/'+fname+docs+user_id+'.jpg',(err,done)=>{
      if(err){
        return res.status(500).send(err);
      }
    })
  }
  
    userHelper.uploadDocument(req.body,req.session.user.user_id).then(()=>{
      res.redirect('/my-documents');
  
    }).catch(()=>{
      return res.redirect('/my-documents');
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
