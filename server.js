const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const userX = require('./user/user');
mongoose.connect('mongodb+srv://ophir:awesomedev@cluster0-pnbt0.mongodb.net/chef_dev?retryWrites=true')
.then(function(res){
    console.log('Connected..');
}).catch(function(err){
    console.log(err);
});
app.use(cors());
app.use(bodyParser.json());
app.get('/', function(req, res){
    console.log(req);
    res.send({msg: "You are awesome"})
});


app.post('/users', function(req, res){
    const s =  userX.user.Save(req, res);
    
});

app.post('/login', function(req, res){
    console.log(req.body);
    const s =  userX.user.login(req,res);
    
});


const x = process.env.y || 200;
app.listen(3000);
console.log("This is user Schema",x);