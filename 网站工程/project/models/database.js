var mysql = require('mysql');
var done = 1;

function connectServer(){
    var client = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'3140102441',
        database:'news'
    })

    return client;
}

function select(client,type,callback){
    client.query('select * from news_infor where newstype = "'+ type + '"order by newstime DESC',function(err,results,fields){
        if(err) throw err;
            callback(results);
        });
}

function selectuserid(client,content,callback){
    var  userAddSql_Params = [content];
    client.query('select * from user_infor where id = ?;',userAddSql_Params,function(err,results){

        if(err) throw err;
        callback(results);
    });
}

function selectuseremail(client,content,callback){
    var  userAddSql_Params = [content];
    client.query('select * from user_infor where email = ?;',userAddSql_Params,function(err,results){

        if(err) throw err;
        callback(results);
    });
}



function insert(client,username,password,email,callback){
    var  userAddSql_Params = [username,password ,email];

    client.query('INSERT INTO user_infor(id,psword,email) VALUES(?,?,?)',userAddSql_Params, function(err,results,fields){
        if(err) throw err;
        callback(results);
    });
}

function deletecol(client,username,callback){
    var  userAddSql_Params = [username];
    client.query('delete from user_interes where id = ?',userAddSql_Params, function(err,results,fields){
        if(err) throw err;
        callback(results);
    });
}

function  insertcol(client,type ,username,callback){
    var  userAddSql_Params = [username,type];
    done = 0;
    client.query('INSERT INTO user_interes(id,newstype) VALUES(?,?)',userAddSql_Params, function(err,results,fields){
        console.log(results);
        done = 1;
        if(err) throw err;
        callback(results);
    });
}

function selecttype(client,username,callback){
    var  userAddSql_Params = [username];
    console.log(username);
    console.log("query");
    client.query('select * from user_interes where id = ?;',userAddSql_Params,function(err,results){

        console.log(results);
        if(err) throw err;
        callback(results);
    });
}

function isdone(){
    return done;
}

function  insertall(client,username,callback){
    var  userAddSql_Params = [username];
    client.query('INSERT INTO user_interes(id,newstype) VALUES(?,\'caijing\')',userAddSql_Params, function(err,results,fields){
        console.log(results);
        if(err) throw err;
        callback(results);
    });
    client.query('INSERT INTO user_interes(id,newstype) VALUES(?,\'tiyu\')',userAddSql_Params, function(err,results,fields){
        console.log(results);
        if(err) throw err;
        callback(results);
    });
    client.query('INSERT INTO user_interes(id,newstype) VALUES(?,\'yule\')',userAddSql_Params, function(err,results,fields){
        console.log(results);
        if(err) throw err;
        callback(results);
    });
    client.query('INSERT INTO user_interes(id,newstype) VALUES(?,\'junshi\')',userAddSql_Params, function(err,results,fields){
        console.log(results);
        if(err) throw err;
        callback(results);
    });
    client.query('INSERT INTO user_interes(id,newstype) VALUES(?,\'internet\')',userAddSql_Params, function(err,results,fields){
        console.log(results);
        if(err) throw err;
        callback(results);
    });
    client.query('INSERT INTO user_interes(id,newstype) VALUES(?,\'women\')',userAddSql_Params, function(err,results,fields){
        console.log(results);
        if(err) throw err;
        callback(results);
    });
    client.query('INSERT INTO user_interes(id,newstype) VALUES(?,\'game\')',userAddSql_Params, function(err,results,fields){
        console.log(results);
        if(err) throw err;
        callback(results);
    });
    client.query('INSERT INTO user_interes(id,newstype) VALUES(?,\'car\')',userAddSql_Params, function(err,results,fields){
        console.log(results);
        if(err) throw err;
        callback(results);
    });

}

exports.connect = connectServer;
exports.select  = select;
exports.insert = insert;
exports.selectuserid = selectuserid;
exports.selectuseremail = selectuseremail;
exports.deletecol = deletecol;
exports.insertcol = insertcol;
exports.selecttype = selecttype;
exports.isdone = isdone;
exports.insertall = insertall;