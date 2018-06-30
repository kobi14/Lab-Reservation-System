const express = require('express');
var mongodb = require('mongodb');


const router = express.Router();
const momentTimezone = require('moment-timezone')




const config = require('../config/database');


const Reserve = require('../model/reserve');
const DayDate = require('../model/reserve');

const dateAEST = date => {
    return momentTimezone(date).tz('Asia/Colombo')
}

//reserve lab

router.post('/lab', (req, res, next) => {
    //res.send('lab');

    // let newReservation = new Reserve({
    //     reserved: req.body.reserved,
    //     username: req.body.username
    // });

    let newDate = new DayDate({

        // username:req.body.username,
        // labname:req.body.labname,
        // date:req.body.date,
        // timein:req.body.timein,
        // timeout:req.body.timeout
        date: req.body.date,
        labd: {
            lab: req.body.labd.lab,
            timed: {
                time: req.body.labd.timed.time,
                reservation: {
                    reserved: req.body.labd.timed.reservation.reserved,
                    username: req.body.labd.timed.reservation.username
                }
            }
        }

    });

    // let newReserve=new Reserve({
    //     reserved:req.body.reserved,
    //     username:req.body.username

    // });

    DayDate.addDate(newDate, (err, DayDate) => {
        if (err) {
            res.json({ success: false, msg: 'Failed To Register time' });
        } else {
            res.json({ success: true, msg: 'Done To Register time' });
        }
    });
    // Reserve.addReserve(newReservation,(err,Reserve)=>{
    //     if(err){
    //         res.json({success:false,msg:'Failed To Register'});
    //     }else{
    //         res.json({success:true,msg:'Done To Register'});
    //     }

    // });

});

// View RESERVATION
router.get('/view', (req, res, next) => {
    //const date='2018-06-29 00:00:00.000';
    //const date=req.params.date;
    const date = '2018-07-02';


    //var cursor = db.collection('test').find();
    //var collection = new mongodb.Collection('wlab', 'reserves');
    Reserve.find({ date: date }, function (err, reserve) {
        if (err) {
            res.send("eeee");

        }
        res.json(reserve);

    });
    //     Reserve.getReserveByDate(date,(err,reserve)=>{
    //         if(err) throw err;

    //         if(!reserve){
    //             return res.json({success:false , msg:'User Not Found'});
    //         }
    //         res.json({
    //             success: true,

    //             reserve: {
    //               id: reserve._id,
    //               labname:reserve.labname,

    //             }

    //     });
    //     //res.json({reserve: req.reserve});
    //     //res.send(reserves.username);


    //   });
});




module.exports = router;