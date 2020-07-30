const express =require('express');
const mongoose=require('mongoose');
const router = express.Router();
const db = 'mongodb+srv://admin:admin123@cluster0.b83rp.mongodb.net/utilitymanagement?retryWrites=true&w=majority';
const User = require('../models/user');
const ElectricBill = require('../models/electricbill');
const Task=require('../models/task');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const Labservice = require('../models/lab');

router.get("/",(req,res)=>{
    res.send("From API");

})

//DB connection
mongoose.connect(db ,function(err){

    if(err){
        console.error(err);
    }
    else{
        console.log("Connected to MongoDB");
    }
});

function verifyToken(req,res,next){
    if(!req.headers.authorization){
        return res.send(401).send('Unauthorized request');
    }
    let token = req.headers.authorization.split(' ') [1];
    if(token==='null'){
        return res.send(401).send('Unauthorized request');
    }
    let payload = jwt.verify(token,'secretkey123');
    if(!payload){
        return res.send(401).send('Unauthorized request');
    }
    req.userId = payload.subject;
    next();

}

//Register user call to db

router.post('/register',(req,res)=>{

    let userData=req.body;
    let user=new User(userData);
    console.log(user);
    User.findOne({email:userData.email},(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            if(data){
                res.status(422).send("Email Id already exists");
            }
            else{
                user.save((err,registeredUser)=>{
                    if(err){
                        console.error(err);
                    }
                    else{
                        let payload = {subject:user._id};
                        let token = jwt.sign(payload,'secretkey123');
                        res.status(200).send({token});
                        //  res.status(200).send(registeredUser);
                    }
                })
            }
        }
    });
    

})

//get all tasks

router.get('/gettasks',verifyToken,(req,res)=>{

    res.header("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
    Task.find().then(function(data){
    console.log("Retrieved tasks");
    res.send(data);
})

})


router.get('/getincompletetasks',verifyToken,(req,res)=>{

    res.header("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
    filter={completed:false};
    Task.find(filter).then(function(data){
    console.log("Retrieved incomplete tasks");
    res.send(data);
})

})
//get task by id


router.post('/getsingletask',verifyToken,(req,res)=>{

    res.header("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
    let _id= req.body._id;
    console.log(req.body);
    Task.findById(_id).then(function(data){
        console.log(`Retrieved task details for ${_id} `);
        res.send(data);
    })
    
    })


//add a new task into tasks collection
router.post('/addtask',verifyToken,(req,res)=>{

    res.header("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');

    let task=req.body;
    let taskdata= new Task(task);
    taskdata.save((err,regtask)=>{
        if(err){
            console.log(err);
        }
        else{
            res.status(200).send(regtask);
        }
    })

})

//update Task

router.post("/updatetask",verifyToken,(req,res)=>{

    res.header("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
    
    console.log(req.body);

    userID = req.body.userID;
    type=req.body.servicetype;

    const filter={userID:userID,servicetype:type,completed:false};

    const update={scheduleddate:req.body.scheduleddate,completed:req.body.completed};

    Task.findOneAndUpdate( filter,update)
        .then(function(){
            console.log("Update success");    
            res.send(true);
        })
       
   })

   router.post('/completetask',verifyToken,(req,res)=>{

    res.header("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
    let _id=req.body._id;
    const filter={_id:_id};
    const update={completed:true};
     Task.findByIdAndUpdate(filter,update)
     .then(function(data){
         res.send(data);
     })
    
   })

router.post('/addebill',verifyToken,(req,res)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');

    let ebill=req.body;
    let ebilldata=new ElectricBill(ebill);
    
    ElectricBill.findOne({userID:ebilldata.userID},(err,bill)=>{
        if(err){
            console.log(err);
        }
        else{
            if(bill){
                res.status(422).send("Electricity Bill payment service already available for this user.");
            }
            else
            {
                ebilldata.save((err,registeredebill)=>{
                    if(err){
                        console.error(err);
                    }
                    else{
                        // let payload = {subject:user._id};
                        // let token = jwt.sign(payload,'secretkey123');
                        // res.status(200).send({token});
                         res.status(200).send(registeredebill);
                    }
                })
        }
    }
    });
   

})


router.post('/addlabservice',verifyToken,(req,res)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');

    let lab=req.body;
    let labdata=new Labservice(lab);
    
    Labservice.findOne({userID:labdata.userID},(err,labrecord)=>{
        if(err){
            console.log(err);
        }
        else{
            if(labrecord){
                res.status(422).send("Lab@Home service already available for this user.");
            }
            else
            {
                labdata.save((err,registeredrecord)=>{
                    if(err){
                        console.error(err);
                    }
                    else{
                         res.status(200).send(registeredrecord);
                    }
                })
        }
    }
    });
   

})


router.post('/login',(req,res)=>{

    let isAdmin =false;

    let userData= req.body;

    if(userData.email=="admin@gmail.com" && userData.password=="admin123"){
        isAdmin=true;
        let id = mongoose.Types.ObjectId();
        let email=userData.email;
        let payload = {subject:id};
        let token = jwt.sign(payload,'secretkey123');
        res.status(200).send({token,id,email,isAdmin});
    }
    else if(userData.email=="admin@gmail.com" && userData.password!="admin123")
    {
        res.status(401).send("Invalid password");
    }
    else{
    
        User.findOne({email:userData.email},(err,user)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(user);
            if(!user){
                res.status(422).send("Invalid email Id");
            }
            else if(user.password != userData.password){
                res.status(401).send("Invalid password");
            }
            else{
                let id = user._id;
                let email=user.email;
                let payload = {subject:user._id};
                let token = jwt.sign(payload,'secretkey123');
                res.status(200).send({token,id,email,isAdmin});
                //  res.status(200).send(user);
            }
        }

    })
  }
})

router.post("/getUserDetails",verifyToken,(req,res)=>{

    res.header("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');

    let _id = req.body._id;
    console.log(req.body.id)
    User.findById(_id,(err,user)=>{
        if(err){
            console.log(err);
        }
        else
        {
            res.status(200).send(user);
        }
    })
    
})


router.get("/getUsers",verifyToken,(req,res)=>{

    res.header("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');

 
     User.find((err,users)=>{
        if(err){
            console.log(err);
        }
        else
        {
            res.status(200).send(users);
        }
    })
    
})

router.post("/getEBService",verifyToken,(req,res)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');

    let userID=req.body.userID;
    console.log(req.body);
    ElectricBill.findOne({userID:userID},(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(data);
            res.status(200).send(data);
        }

    })
    

})

//get lab service for user ID

router.post("/getlabService",verifyToken,(req,res)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');

    let userID=req.body.userID;
    console.log(req.body);
    Labservice.findOne({userID:userID},(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(data);
            res.status(200).send(data);
        }

    })
    

})

// Update User Details
router.post("/updateUser",verifyToken,(req,res)=>{

    res.header("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');    
    console.log(req.body);
    const filter={_id:req.body._id};
    const update={name:req.body.name,email:req.body.email,address:req.body.address,contact:req.body.contact};

    User.findByIdAndUpdate( filter,update)
        .then(function(){
            console.log("Update success");    
        })
       
   })

//update eb service
router.post("/updateEbill",verifyToken,(req,res)=>{

    res.header("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');    
    console.log(req.body);
    const filter={_id:req.body._id};
    const update={consumernum:req.body.consumernum,paymentfreq:req.body.paymentfreq,dateofpayment:req.body.dateofpayment};

    ElectricBill.findByIdAndUpdate( filter,update)
        .then(function(data){
            res.send(data);
            
        })
       
   })

//delete EBill service

router.post("/deleteEBill",verifyToken,(req,res)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
    id=req.body.userID;
    ElectricBill.findOneAndDelete({userID:id}).then(function(){
        console.log("Delete ebill success"); 
        ElectricBill.findOne({userID:id})
        .then(function(bill){
            res.send(bill);
        });
      })


})

router.post("/deleteLabservice",verifyToken,(req,res)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
    id=req.body.userID;
    Labservice.findOneAndDelete({userID:id}).then(function(){
        console.log("Delete lab service success"); 
        Labservice.findOne({userID:id})
        .then(function(record){
            res.send(record);
        });
      })


})
//delete all tasks for user
router.post("/deletetasksforUser",verifyToken,(req,res)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
    id=req.body.userID;
    console.log(id);
    Task.deleteMany({userID:id}).then(function(){
        console.log("Delete tasks for user success"); 
       res.send(true);
      })


})


//delete all tasks for user for specific service type
router.post("/deletetasksforUserandservicetype",verifyToken,(req,res)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
    id=req.body.userID;
    type=req.body.servicetype;
    console.log(id);
    console.log(type);
    Task.deleteMany({userID:id,servicetype:type}).then(function(){
        console.log("Delete tasks for user and service type success"); 
       res.send(true);
      })


})



//delete User
router.post("/deleteUser",verifyToken,(req,res)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
    id=req.body.userID;
    User.findOneAndDelete({_id:id}).then(function(){
        console.log("Delete user success"); 
        User.find()
        .then(function(users){
            res.send(users);
        });
      })


})


//get EBservice based on email id


router.post("/getEBServiceByEmail",verifyToken,(req,res)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');

    console.log(req.body);
    let email=req.body.email;
    
    ElectricBill.findOne({email:email},(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(data);
            res.status(200).send(data);
        }

    })
    

})

// define a sendmail endpoint, which will send emails and response with the corresponding status
router.post("/sendmail", verifyToken,(req, res) => {

    res.header("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
    console.log("request came");

    let mail = req.body;

    let mailTransporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: 'creatorcalms123@gmail.com',
            pass: 'admin@calms!'
        }
    });

    let mailDetails = { 
        from: 'creatorcalms123@gmail.com', 
        to: mail.email, 
        subject:mail.subject, 
        text: mail.text
    }; 
    mailTransporter.sendMail(mailDetails, function(err, data) { 
        if(err) { 
            console.log(err); 
        } else { 
            console.log('Email sent successfully'); 
            res.status(200).send(true);
        } 
    }); 
  
    
  });

//update eb service
router.post("/updateLabservice",verifyToken,(req,res)=>{

    res.header("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');    
    console.log(req.body);
    const filter={_id:req.body._id};
    const update={testname:req.body.testname,visitfreq:req.body.visitfreq,visitdate:req.body.visitdate};

    Labservice.findByIdAndUpdate( filter,update)
        .then(function(data){
            res.send(data);
            
        })
       
   })


module.exports = router;