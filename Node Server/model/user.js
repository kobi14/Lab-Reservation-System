const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const config =require('../config/database');

const UserShema =mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        require:true
    },
    username:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:String,
        default:"enduser"
    }


});

const User=module.exports=mongoose.model('User',UserShema);

module.exports.getUserById=function(id,callback){
    User.findById(id,callback); 
}

module.exports.getUserByUsername=function(username,callback){
    const query={username:username}
    User.findOne(query,callback); 
}
module.exports.getUserByUsermail=function(email,callback){
    const query={email:email}
    User.findOne(query,callback); 
}

module.exports.checkRole=function(role,callback){
    const query={role:role}
    User.findOne(query,callback);
}

module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if(err) throw err;
        newUser.password = hash;
        newUser.save(callback);
      });
    });
  }

  module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
      if(err) throw err;
      callback(null, isMatch);
    });
  }