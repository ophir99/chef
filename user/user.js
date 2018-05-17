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
     Save: function(req){
        console.log(req.body);
        let userx = new UserModel({
            fname: req.body.fname,
            lname: req.body.lname,
            user_name: req.body.user_name,
            email: req.body.email,
            password: req.body.password,
        });
        return userx.save()
     },
     login: function(req){
           let email =  req.body.email;
           let password = req.body.password
           return UserModel.findOne({email,password}, '_id', function(err,data){
            if(err){
                return 'Login Failed!!. Try Again';
            }
            if(data){
                return 'Okay'
            }
           });
     }
}