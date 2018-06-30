const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// const ReserveShema =mongoose.Schema({
//     _reserve_id:Schema.Types.ObjectId,
//     username:{
//         type:String
//      },
//     labname:{
//         type:String,
//         require:true
//     },
//     date:{
//         type:Date,
//         require:true
//     },
//     timein:{
//         type:Number,
//         require:true
//     },
//     timeout:{
//         type:Number,
//         require:true
//     }



// });

var ReservationSchema = mongoose.Schema({
    reserved: {
        type: Boolean
    },
    username: {
        type: String
    }
});

var TimeSchema = mongoose.Schema({
    time: {
        type: String
    },
    reservation: [ReservationSchema]
});

var labSchema = mongoose.Schema({
    lab: {
        type: String
    },
    timed: [TimeSchema]
});

var dateSchema = mongoose.Schema({
    date: {
        type: String
    },
    labd: [labSchema]
});



//const Reserve = module.exports = mongoose.model('Reserve', ReservationSchema);
const DayDate = module.exports = mongoose.model('DayDate', dateSchema);

module.exports.addDate = function (newDate, callback) {
    newDate.save(callback);
}

module.exports.addTime = function (newTime, callback) {
    newTime.save(callback);
}

module.exports.addReserve = function (newReserve, callback) {
    newReserve.save(callback);
}

module.exports.getReserveById = function (id, callback) {
    Reserve.findById(id, callback);
}

module.exports.getReserveByDate = function (date, callback) {
    const query = { date: date }
    //var dbo = db.db('../config/database');
    Reserve.find(query, callback);
}