const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const { getHomePage } = require('./routes/index');
const { addStudentPage, addStudent } = require('./routes/student');
const { editStudentPage,editStudent } = require('./routes/student');
// const { deleteStudent } = require('./routes/student'); 
// set the default port 
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client

// configure to mysql database 
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'node-project',
    port: 8889

});

// connect to mysql database

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log(" mysql database connected");
});

// make db connection global 
global.db = db;

// configure the middleware 
app.get('/', getHomePage);
app.get('/add', addStudentPage);
app.post('/add', addStudent);
app.get('/edit/:id', editStudentPage);
app.post('/edit/:id', editStudent);
// app.get('/delete/:id', deleteStudent);

app.set('port', process.env.PORT || PORT); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(express.static(path.join(__dirname, 'public'))); // configure express to 
//use public folder
app.use(fileUpload()); // configure fileupload


// open the port for the server
app.listen(PORT, () => {
    console.log(` The server is running on localhost:${PORT}`);
})