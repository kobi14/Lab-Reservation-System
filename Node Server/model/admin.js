// const mongoose=require('mongoose');
// const bcrypt=require('bcryptjs');
// const config =require('../config/database');

// const AdminShema =mongoose.Schema({
 
//     email:{
//         type:String,
//         require:true
//     },
//     name:{
//         type:String,
//         require:true
//     },
//     password:{
//         type:String,
//         require:true
//     }


// });

// const Admin=module.exports=mongoose.model('Admin',AdminShema);

// module.exports.getAdminById=function(id,callback){
//     Admin.findById(id,callback); 
// }

// module.exports.getAdminByAdminmail=function(email,callback){
//     const query={email:email}
//     Admin.findOne(query,callback); 
// }

// module.exports.addAdmin = function(newAdmin, callback) {
//     bcrypt.genSalt(10, (err, salt) => {
//       bcrypt.hash(newAdmin.password, salt, (err, hash) => {
//         if(err) throw err;
//         newAdmin.password = hash;
//         newAdmin.save(callback);
//       });
//     });
//   }

//   module.exports.comparePassword = function(candidatePassword, hash, callback) {
//     bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
//       if(err) throw err;
//       callback(null, isMatch);
//     });
//   }