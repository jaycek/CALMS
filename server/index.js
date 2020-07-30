const express =require('express');
const bodyParser = require('body-parser');
const cors=require('cors');
const api = require('./routes/api');
const port=3000;
const app= express();

app.use(cors());
app.use(bodyParser.json());
app.use('/',api);

app.get("/",(req,res)=>{
    res.send("Server is responding well");
})
app.listen(port,function(){
    console.log("CALMS Server is listening on port 3000 ");
})


