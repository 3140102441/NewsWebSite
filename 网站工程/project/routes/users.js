var express = require('express');
var router = express.Router();
var user = require('../models/database');
var client;

var sd = require('silly-datetime');
var time;


/* GET users listing. */

router.get('/logout', function(req, res, next) {
    res.clearCookie('islogin');
    req.session.destroy();
    res.redirect('/');
});

router.get('/', function(req, res, next) {
    time=sd.format(new Date(), 'YYYY-MM-DD ');
    if(req.cookies.islogin){
        req.session.islogin=req.cookies.islogin;

    }
    if(req.session.islogin){
        res.locals.islogin=req.session.islogin;
    }
    res.render('user', {type: 0,error: 0,user:res.locals.islogin,time:time});
});
router.get('/login', function(req, res, next) {
    time=sd.format(new Date(), 'YYYY-MM-DD ');
    if(req.cookies.islogin){
        req.session.islogin=req.cookies.islogin;

    }
    if(req.session.islogin){
        res.locals.islogin=req.session.islogin;
    }
    res.render('user', {type: 0,error: 0,user:res.locals.islogin,time:time});
});

router.get('/register', function(req, res, next) {
    time=sd.format(new Date(), 'YYYY-MM-DD ');
    if(req.cookies.islogin){
        req.session.islogin=req.cookies.islogin;

    }
    if(req.session.islogin){
        res.locals.islogin=req.session.islogin;
    }
    res.render('user', {type: 1,error: 0,user: res.locals.islogin,time:time});
});

router.post('/login', function(req, res, next) {
    client =user.connect();
    if(req.cookies.islogin){
        req.session.islogin=req.cookies.islogin;

    }
    if(req.session.islogin){
        res.locals.islogin=req.session.islogin;
    }
    user.selectuserid(client,req.body.inputId,function (result){
        if(result.length == 0) {
            res.render('user', {type: 0, error: 3,time:time});

        }
        else{
            if(result[0].psword != req.body.inputPassword)
                res.render('user',{type: 0,error: 4,time:time});
            else{
                req.session.islogin=req.body.inputId;
                res.locals.islogin= req.session.islogin;
                res.cookie('islogin',res.locals.islogin,{maxAge:60000});

                res.redirect('/');
            }

        }
    });

});

router.post('/register', function(req, res, next) {
    client = user.connect();
    if(req.cookies.islogin){
        req.session.islogin=req.cookies.islogin;

    }
    if(req.session.islogin){
        res.locals.islogin=req.session.islogin;
    }

    user.selectuserid(client, req.body.inputId, function (result) {

        if (result.length != 0) {
            res.render('user', {type: 1, error: 1,user: res.locals.islogin,time:time});
            next();
        }
        else {
            next();
        }

    });
});

router.post('/register', function(req, res, next) {
    user.selectuseremail(client, req.body.inputEmail, function (result) {

        if (result.length != 0) {
            res.render('user', {type: 1, error: 2,user: res.locals.islogin,time:time});
        }
        else{
            next();
        }
    });
});

router.post('/register', function(req, res, next) {
    user.insert(client,req.body.inputId,req.body.inputPassword,req.body.inputEmail,function(result){

        res.render('success',{time:time,user:res.locals.islogin});
    });
    next();


});

router.post('/register', function(req, res, next) {
    user.insertall(client,req.body.inputId,function(result){

    });



});




module.exports = router;
