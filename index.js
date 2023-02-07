
var con = require('./connection')
var express = require("express")
var bodyParser = require('body-parser')

var app = express()
app.listen(3000)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : true}))

app.set('view engine', 'ejs')

app.get('/',(req, res)=>{
    res.sendFile(__dirname+"/register.html")
})

app.post('/',(req,res)=>{
    emp = req.body.ename
    age = req.body.age
    mno = req.body.mno
    jrole = req.body.jrole

    var sql = `insert into employee(ename, age, mno, jrole) values (?, ?, ?, ?)`

    con.query(sql,[emp, age, mno, jrole],(err,result)=>{
        if(err) console.log(err);
        // else res.send("Employee Registered Succesfully With I'd " + result.insertId)
        res.redirect('/employee')
    })
})

app.get('/delete_emp',(req,res)=>{
    var sql = `Delete from employee where id=?`
    var id = req.query.id
    con.query(sql, [id], (err, result)=>{
        if(err) console.log(err);
        res.redirect('/employee')
    })
})

app.get('/register',(req,res)=>{
    res.redirect('/')
})

app.get('/update',(req,res)=>{
    var sql = `select * from employee where id=?`
    var id = req.query.id
    con.query(sql, [id], (err, result)=>{
        if(err) console.log(err);
        res.render(__dirname+'/update',{employee:result})
    })
})

app.post('/update',(req,res)=>{
    var ename = req.body.ename
    var age = req.body.age
    var mno = req.body.mno
    var jrole = req.body.jrole
    var id = req.body.id
 
    var sql = `update employee set ename=?, age=?, mno=?, jrole=? where id=? `

    con.query(sql, [ename, age, mno, jrole, id], (err, result)=>{
        if(err) console.log(err);
        res.redirect('/employee')
    })
})

app.get('/employee',(req,res)=>{

    var sql = `select * from employee`
    con.query(sql,(err, result)=>{
        if(err) console.log(err);
        // console.log(result);
        res.render(__dirname+"/employee",{employee:result})
    })

})


con.connect((err)=>{
    if(err) console.log(err);
    else console.log("Connected Succesfully!!!");
    
})
