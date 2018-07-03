const express = require('express');

const router = express.Router();

const passport = require('passport');

const jwt = require('jsonwebtoken');

const config = require('../config/database');


const User = require('../model/user');



//Register

router.post('/register', (req, res, next) => {
    //res.send('REGISTER');
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role
    });
    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({ success: false, msg: 'Failed To Register' });
        } else {
            res.json({ success: true, msg: 'Done To Register' });
        }

    });

});

router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const role = 'admin';

    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;

        if (!user) {
            return res.json({ success: false, msg: 'User Not Found' });
        }
        //console.log(user.role == role);
        if (user.role == role) {


            User.comparePassword(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    const token = jwt.sign({ data: user }, config.secret, {
                        expiresIn: 604800 // 1 week
                    });
                    res.json({
                        success: true,
                        token: 'JWT ' + token,
                        role:user.role,
                        user: {
                            id: user._id,
                            name: user.name,
                            username: user.username,
                            email: user.email,
                            role:user.role,
                           
                        }
                    })
                } else {
                    return res.json({ success: false, msg: 'Wrong pass' });
                }
            });

        } else {

            return res.json({ success: false, msg: 'User Role Not Match' });

        }





    });

});

// Profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    //res.json(req.user.role);
    if ((req.user.role) == 'admin') {

        res.json({ user: req.user });
    }

});


module.exports = router;