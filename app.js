var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressVlaid = require('express-validator');
var host = 'blog';
var app = express();
var mongojs = require('mongojs');
var db = mongojs('employeesManager', ['employees']);
var ObjectId = mongojs.ObjectId;
var cors = require('cors');


// ErrorMSG

app.use((req, res, next) => {
	res.locals.errors = null;
	next();
});

// Cors

app.use(cors());

// BodyParser Midlwhare 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// Express Static Folder

app.use(express.static(path.join(__dirname, 'public')));

// EJS Folder

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ExpressValidator

app.use(expressVlaid());

app.get('/', (req, res)=>{
 db.employees.find((err, docs) =>{
 res.render('index', {


 	employees:docs
 });

 });

});

app.post('/employees/add', (req, res) => {

    req.checkBody('employee_id', 'The ID Number Is Required').notEmpty();
    req.checkBody('fullName', 'The Name Is Required').notEmpty();
    req.checkBody('department', 'The Department Is Required').notEmpty();
    req.checkBody('position', 'The Position Is Required').notEmpty();

    var errors = req.validationErrors();
     
     if(errors){
db.employees.find((err, docs) =>{
 res.render('index', {

    errors:errors,
 	employees:docs
 });

 });

     }else{
      var newU = {
      	employee_id: req.body.employee_id,
      	fullName: req.body.fullName,
      	department: req.body.department,
      	position: req.body.position


      }

db.employees.insert(newU, function(err, result){
     if(err){
       console.log(err);
     }
   res.redirect('/');

    });


     }

    


});


app.delete('/employees/delete/:id', (req, res) =>{

db.employees.remove({_id:ObjectId(req.params.id)}, function(err, result){
if(err){
	console.log(err);
}
res.redirect('/');
});
  

});



app.listen(3000, (req, res) =>{
	console.log('Your Runing On Host ' + host);
});