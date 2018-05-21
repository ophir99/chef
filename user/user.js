const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    user_name: {type: String},
    email: {type: String},
    date: {type: Date, default: Date.now},
    password: String
});
const UserModel =  mongoose.model('UserModel', userSchema);
module.exports.user={
     Save: function(req,x){
        console.log(req.body);
        UserModel.find({email: req.body.email}, function(err,res){
            if(err){
                console.log("err",err);
                x.send(res);
            }
            if(res){
                if(res.length === 0){
                    let userx = new UserModel({
                        fname: req.body.fname,
                        lname: req.body.lname,
                        user_name: '',
                        email: req.body.email,
                        date: new Date(),
                        password: req.body.password,
                    });
                    userx.save(function(err,data){
                        if(err){
                                x.send({'msg': 'Unable to Save Try, again'})
                        }
                        if(data){
                            x.send({'msg':data});
                        }
                    });
                }
                else{
                    x.send({'msg': 'Email is already used. Try with other'});
                }
            }
        });
        
     },
     login: function(req,x){
           let email_ =  req.body.email;
           let password_ = req.body.password
           console.log("Request Body",req.body)
           /*return UserModel.findOne({email:email_}).where('email').equals(email_)
           .where('password').equals(password_).select('_id user_name')*/

            UserModel.find({email: email_, password: password_}, function(err,res){
                if(err){
                    console.log("err",err);
                    x.send(res);
                }
                if(res){
                    if(res.length === 0){
                        x.send({'msg': 'Username not found'});
                    }
                    else{
                        x.send({'msg': 'Logged In'});
                    }
                }
            });
     }
}