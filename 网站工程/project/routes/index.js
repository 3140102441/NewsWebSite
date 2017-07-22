var express = require('express');
var router = express.Router();
var user = require('../models/database');
var sd = require('silly-datetime');
var time;
var cailastresult,yulastresult,tilastresult,junlastresult,interlastresult,gamelastresult,carlastresult,relastresult;

var client;
var indextype = new Array(15);

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("dfg");
    client = user.connect();

    time=sd.format(new Date(), 'YYYY-MM-DD ');


    if(req.cookies.islogin){
        req.session.islogin=req.cookies.islogin;

            }
     if(req.session.islogin){
            res.locals.islogin=req.session.islogin;
         }
    console.log(res.locals.islogin);
    if(res.locals.islogin){

         user.selecttype(client,res.locals.islogin,function(result){
                indextype = result;
                console.log(indextype);
                next();
         });
    }
    else{
        indextype[0] = {newstype:'caijing',id:'3140102441'};
        next();
    }

});

router.get('/', function(req, res, next) {
    user.select(client, indextype[0].newstype, function (results) {
        console.log("ff");
        console.log(results);
        var type ;
        if(indextype[0].newstype == 'caijing')
            type = 0;
        if(indextype[0].newstype == 'tiyu')
            type = 1;
        if(indextype[0].newstype == 'yule')
            type = 2;
        if(indextype[0].newstype == 'junshi')
            type = 3;
        if(indextype[0].newstype == 'internet')
            type =4;
        if(indextype[0].newstype == 'women')
            type = 5;
        if(indextype[0].newstype == 'game')
            type = 6;
        if(indextype[0].newstype == 'car')
            type = 7;


        if (results.length == 0) {
            res.render('index', {items: cailastresult, type: type, user: res.locals.islogin, time: time, typeitem: indextype});

        }
        else {
            cailastresult = results;
            console.log(indextype);
            res.render('index', {items: results, type: type, user: res.locals.islogin, time: time, typeitem: indextype});
        }
    });
});

router.get('/caijing', function(req, res, next) {
    client = user.connect();
    var type;
    if(req.cookies.islogin){
        req.session.islogin=req.cookies.islogin;

    }
    if(req.session.islogin){
        res.locals.islogin=req.session.islogin;
    }

    if(res.locals.islogin){
        user.selecttype(client,res.locals.islogin,function(result){
            type = result;
        });

    }
    user.select(client,'caijing',function(results){
        if(results.length == 0){
            res.render('index', {items: cailastresult, type: 0,user:res.locals.islogin,time:time,typeitem:type});

        }
        else{
            cailastresult = results;
            res.render('index',{ items:results ,type:0,user:res.locals.islogin,time:time,typeitem:type});
        }

    });



});

router.get('/yule', function(req, res, next) {
    client = user.connect();
    var type;
    if(req.cookies.islogin){
        req.session.islogin=req.cookies.islogin;

    }
    if(req.session.islogin){
        res.locals.islogin=req.session.islogin;
    }

    if(res.locals.islogin){
        user.selecttype(client,res.locals.islogin,function(result){
            type = result;
        });
    }
    user.select(client,'yule',function(results){
        if(results.length == 0){
            res.render('index', {items: yulastresult, type: 2,user:res.locals.islogin,time:time,typeitem:type});

        }
        else{
            yulastresult = results;
            res.render('index', { items:results ,type:2,user:res.locals.islogin,time:time,typeitem:type});
        }

    });

});

router.get('/tiyu', function(req, res, next) {
    client = user.connect();
    var type;
    if(req.cookies.islogin){
        req.session.islogin=req.cookies.islogin;

    }
    if(req.session.islogin){
        res.locals.islogin=req.session.islogin;
    }

    if(res.locals.islogin){
        user.selecttype(client,res.locals.islogin,function(result){
            type = result;
        });
    }
    user.select(client,'tiyu',function(results){
        if(results.length == 0){
            res.render('index', {items: tilastresult, type: 1,user:res.locals.islogin,time:time,typeitem:type});

        }
        else{
            tilastresult = results;
            res.render('index', { items:results ,type:1,user:res.locals.islogin,time:time,typeitem:type});
        }

    });

});

router.get('/junshi', function(req, res, next) {
    client = user.connect();
    var type;
    if(req.cookies.islogin){
        req.session.islogin=req.cookies.islogin;

    }
    if(req.session.islogin){
        res.locals.islogin=req.session.islogin;
    }

    if(res.locals.islogin){
        user.selecttype(client,res.locals.islogin,function(result){
            type = result;
        });
    }
    user.select(client,'junshi',function(results){
        if(results.length == 0){
            res.render('index', {items: junlastresult, type: 3,user:res.locals.islogin,time:time,typeitem:type});

        }
        else{
            junlastresult = results;
            res.render('index', { items:results ,type:3,user:res.locals.islogin,time:time,typeitem:type});
        }
    });
});

router.get('/internet', function(req, res, next) {
    client = user.connect();
    var type;
    if(req.cookies.islogin){
        req.session.islogin=req.cookies.islogin;

    }
    if(req.session.islogin){
        res.locals.islogin=req.session.islogin;
    }

    if(res.locals.islogin){
        user.selecttype(client,res.locals.islogin,function(result){
            type =result;
        });
    }
    user.select(client,'internet',function(results){
        if(results.length == 0){
            res.render('index', {items: interlastresult, type: 4,user:res.locals.islogin,time:time,typeitem:type});

        }
        else{
            interlastresult = results;
            res.render('index', { items:results ,type:4,user:res.locals.islogin,time:time,typeitem:type});
        }
    });
});

router.get('/women', function(req, res, next) {
    client = user.connect();
    var type;
    if(req.cookies.islogin){
        req.session.islogin=req.cookies.islogin;

    }
    if(req.session.islogin){
        res.locals.islogin=req.session.islogin;
    }

    if(res.locals.islogin){
        user.selecttype(client,res.locals.islogin,function(result){
            type = result;
        });
    }
    user.select(client,'women',function(results){
        if(results.length == 0){
            res.render('index', {items: wolastresult, type: 5,user:res.locals.islogin,time:time,typeitem:type});

        }
        else{
            wolastresult = results;
            res.render('index', { items:results ,type:5,user:res.locals.islogin,time:time,typeitem:type});
        }
    });
});


router.get('/game', function(req, res, next) {
    client = user.connect();
    var type;
    if(req.cookies.islogin){
        req.session.islogin=req.cookies.islogin;

    }
    if(req.session.islogin){
        res.locals.islogin=req.session.islogin;
    }

    if(res.locals.islogin){
        user.selecttype(client,res.locals.islogin,function(result){
            type =result;
        });
    }
    user.select(client,'game',function(results){
        if(results.length == 0){
            res.render('index', {items: gamelastresult, type: 6,user:res.locals.islogin,time:time,typeitem:type});

        }
        else{
            gamelastresult = results;
            res.render('index', { items:results ,type:6,user:res.locals.islogin,time:time,typeitem:type});
        }
    });
});

router.get('/car', function(req, res, next) {
    client = user.connect();
    var type;
    if(req.cookies.islogin){
        req.session.islogin=req.cookies.islogin;

    }
    if(req.session.islogin){
        res.locals.islogin=req.session.islogin;
    }

    if(res.locals.islogin){
        user.selecttype(client,res.locals.islogin,function(result){
            type = result;
        });
    }
    user.select(client,'car',function(results){
        if(results.length == 0){
            res.render('index', {items: carlastresult, type: 7,user:res.locals.islogin,time:time,typeitem:type});

        }
        else{
            carlastresult = results;
            res.render('index', { items:results ,type:7,user:res.locals.islogin,time:time,typeitem:type});
        }
    });
});

router.get('/tuijian', function(req, res, next) {
    client = user.connect();
    var type;
    if(req.cookies.islogin){
        req.session.islogin=req.cookies.islogin;

    }
    if(req.session.islogin){
        res.locals.islogin=req.session.islogin;
    }

    if(res.locals.islogin){
        user.selecttype(client,res.locals.islogin,function(result){
            type = result;
        });
    }
    user.select(client,'tuijian',function(results){
        if(results.length == 0){
            console.log(results);
            res.render('index', {items: relastresult, type: 8,user:res.locals.islogin,time:time,typeitem:type});

        }
        else{
            console.log(results);
            relastresult = results;
            res.render('index', { items:results ,type:8,user:res.locals.islogin,time:time,typeitem:type});
        }
    });
});

module.exports = router;
