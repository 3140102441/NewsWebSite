var express = require('express');
var router = express.Router();
var user = require('../models/database');
var sd = require('silly-datetime');
var time;

var client;
var username;

router.get('/', function(req, res, next) {

    client = user.connect();

    time=sd.format(new Date(), 'YYYY-MM-DD ');


    if(req.cookies.islogin){
        req.session.islogin=req.cookies.islogin;

    }
    if(req.session.islogin){
        res.locals.islogin=req.session.islogin;
    }

    res.render('setting', {type: 0,user:res.locals.islogin,time:time});

    // user.select(client,'caijing',function(result){
    //     if(result.length == 0){
    //         res.render('index', {items: lastresult, type: 0,user:res.locals.islogin,time:time});
    //
    //     }
    //     else{
    //         lastresult = result;
    //         res.render('index', {items: result, type: 0,user:res.locals.islogin,time:time});
    //     }
    // });

});

router.post('/',function(req, res, next) {
    client = user.connect();

    if(req.cookies.islogin){
        req.session.islogin=req.cookies.islogin;

    }
    if(req.session.islogin){
        res.locals.islogin=req.session.islogin;
    }

    user.deletecol(client,res.locals.islogin,function(result){
        next();
    });

});

router.post('/',function(req, res, next) {

    if(req.cookies.islogin){
        req.session.islogin=req.cookies.islogin;

    }
    if(req.session.islogin){
        res.locals.islogin=req.session.islogin;
    }

    if (req.body.caijing != undefined)
        user.insertcol(client, 'caijing',res.locals.islogin, function (result) {
            next();
        });
    else{
        next();
    }


});
router.post('/',function(req, res, next) {
    if (req.body.tiyu != undefined) {
        user.insertcol(client, 'tiyu', res.locals.islogin, function (result) {
            next();
        });
    }
    else{
        next();
    }
});
router.post('/',function(req, res, next) {
    if (req.body.yule != undefined)
        user.insertcol(client, 'yule',res.locals.islogin,  function (result) {
            next();
        });
    else{
        next();
    }
});

router.post('/',function(req, res, next) {
    if (req.body.junshi != undefined)
        user.insertcol(client, 'junshi',res.locals.islogin,  function (result) {
            next();
        });
    else{
        next();
    }
});

router.post('/',function(req, res, next) {
    if (req.body.women != undefined)
        user.insertcol(client, 'women',res.locals.islogin,  function (result) {
            next();
        });
    else{
        next();
    }
});

router.post('/',function(req, res, next) {
    if (req.body.game != undefined)
        user.insertcol(client, 'game', res.locals.islogin, function (result) {
            next();
        });
    else{
        next();
    }
});

router.post('/',function(req, res, next) {
    if (req.body.car != undefined)
        user.insertcol(client, 'car', res.locals.islogin, function (result) {
            next();
        });
    else{
        next();
    }
});

router.post('/',function(req, res, next) {
    if (req.body.internet != undefined)
        user.insertcol(client, 'internet', res.locals.islogin, function (result) {
            next();
        });
    else{
        next();
    }
});




router.post('/',function(req, res, next) {
    console.log("reditext");
    res.redirect('/');
});
module.exports = router;