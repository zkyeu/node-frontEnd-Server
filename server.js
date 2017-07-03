var express = require('express');

//post接口处理
var bodyParser = require('body-parser');

// 数据库链接
var mysql = require('mysql');

var con = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '123456',
    database : 'teacher'
});

con.connect();


// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false });


var app = express();

console.log(app)
app.get('/show', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By",' 3.2.1');
        res.header("Content-Type", "application/json;charset=utf-8");
    var addSql = 'select *  from detail';
    con.query(addSql, function (err, r) {
        if(err) return console.log('失败');
        if(r.length > 0){
            res.send(JSON.stringify({
                message:'seccess',
                status:200,
                teacher:r
            }));
        }else {
            res.send(JSON.stringify({
                message:'seccess',
                status:200,
                teacher:[]
            }));
        }
        console.log('sss成功')
    })
});


app.post('/add', urlencodedParser, function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By",' 3.2.1');
        res.header("Content-Type", "application/json;charset=utf-8");
    console.log(req.body);
    //add
    var addSql = 'INSERT INTO detail(id,name,age,sex) VALUES(0,?,?,?)';
    var adaValue = [req.body.name,req.body.age,req.body.sex];
    con.query(addSql, adaValue, function (err, r) {
        if(err) return console.log('失败');
        res.send(JSON.stringify({
            message:'seccess',
            status:200,
            data:{
                name : req.body.name,
                age : req.body.age,
                sex : req.body.sex
            }
        }));
        console.log('添加成功')
    })


});



app.listen(8080, function () {
    console.log('启动成功');
})