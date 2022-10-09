const { response } = require('express');
var express = require('express');
const session = require('express-session');
var router = express.Router();
var adminHelper = require('../helper/admin-helper');
var userHelper = require('../helper/user-helper');
let errMessage = false;
let Message =false;
const verifyLogin=(req,res,next)=>{
  if(req.session.user){
    if(req.session.user.user_type === 'admin') next();
    else res.redirect('/login');
    
  }else{
    res.redirect('/login')
  }
}
/* GET home page. */
router.get('/',verifyLogin,function(req, res, next) {
  res.render('admin/admin-home',{'admin':true})
  console.log(req.session.user);
});

//get car list
router.get('/carlist',verifyLogin,async(req,res)=>{
  var cars = await adminHelper.getCars();
  let carCount = cars.length;
  //let carList = {};
  
  // if(carCount>0){
  //   for(let i=0;i<=carCount;i++){
  //     Object.assign(cars[i], {index:""});
      
  //   }
  // }
  console.log(cars);
  
  res.render('admin/carlist',{'Cars':cars,'err':errMessage,'msg':Message,'admin':true})
  errMessage=false;
  Message=false;
})
//add cars to the list
router.get('/add-car',verifyLogin,(req,res)=>{
  res.render('admin/add-car',{'admin':true})
})

router.post('/add-car',(req,res)=>{
  let image;
  if(req.files)  image = req.files.image;
  
  adminHelper.addCar(req.body).then((response)=>{

    image.mv('./public/car-images/'+req.body.register_no+response.insertId+'.jpg',(err,done)=>{
      if(err){
        console.log(err);
      }
      res.redirect('/admin/carlist')

    })
    console.log(response);
  }).catch((err)=>{
    res.redirect('/admin/add-car')
  })
  
  
})

//edit cars status
router.get('/edit-status',(req,res)=>{
  let status = req.query.status;
  let carId = req.query.Id;
  adminHelper.changeStatus(status,carId).then((response)=>{
    console.log(response);
    res.redirect('/admin/carlist')
  })
})

//login
router.get('/login',(req,res)=>{
  res.redirect('/login')
})

// driver list
router.get('/driver-list',verifyLogin,(req,res)=>{
  adminHelper.getDrivers().then((response)=>{
    res.render('admin/driverlist',{'drivers':response,'admin':true})
  })
  
})

//add driver
router.get('/add-driver',verifyLogin,(req,res)=>{
  res.render('admin/add-driver',{'admin':true})
})
router.post('/add-driver',(req,res)=>{
  console.log(req.body);
  adminHelper.addDriver(req.body).then((response)=>{
    console.log(response);
    res.redirect('/admin/driver-list')
  }).catch((status)=>{
    console.log(status);
  })
})
//edit driver status
router.get('/driver-status',(req,res)=>{
  let id = req.query.Id;
  let status = req.query.status;
  adminHelper.changeDriverStatus(status,id).then((response)=>{
    console.log(response);
    res.redirect('/admin/driver-list')
  })
})

//edit car
router.get('/edit-car/:id',(req,res)=>{
  adminHelper.getAcar(req.params.id).then((response)=>{
    res.render('admin/edit-car',{'car':response})
  })
  console.log(req.params.id);
  
})
router.post('/edit-car',(req,res)=>{
  console.log(req.body)
  let image;
  if(req.files){
    image = req.files.image;
  }
  adminHelper.updateCar(req.body).then((response)=>{
    console.log(response);
    if(image){
      console.log(image);
      image.mv('./public/car-images/'+req.body.register_no+req.body.carId+'.jpg',(err,done)=>{
        if(err){
          console.log(err);
        }
      })
    }
    Message=true;
    res.redirect('/admin/carlist')

  }).catch((response)=>{
    
    res.redirect('/admin/carlist')
    errMessage=true;

  })
  
})


//delete car
router.get('/delete-car/:id',(req,res)=>{
  var carId = req.params.id;
  adminHelper.deleteCar(carId).then((response)=>{
    res.redirect('/admin/carlist')
  })

})

//view driver
router.get('/view-driver/:id',(req,res)=>{
  console.log("haiii");
  
  adminHelper.getDriver(req.params.id).then(async(result)=>{
    console.log(result);
    let docs = await userHelper.getDocuments(result[0].l_id,"driver")
    res.render('admin/view-driver',{'driver':result[0],'admin':true,'docs':docs})
  }).catch((err)=>{
    res.redirect('/admin/driver-list')
  })
  
})
// view all users
router.get('/all-users',async(req,res)=>{
  let users =await adminHelper.getAllUsers().catch(()=>{
    return res.status(500).send("<h1>Try again</h1>")
  })
  res.render('admin/all-users',{'admin':true,'users':users})
})

router.get('/view-user/:id',async(req,res)=>{
  let user = await adminHelper.getUser(req.params.id);
  let docs = await userHelper.getDocuments(user[0].l_id,"customer")
  let dob = user[0].dob;
  user[0].dob = dob.toDateString();
  res.render('admin/view-user',{'admin':true,'customer':user[0],'docs':docs})
})

router.get('/logout',(req,res)=>{
  req.session.user=null
  req.session.userloggedIn=false
  // req.session.destroy()
  res.redirect('/')

})

module.exports = router;