const express = require('express');
const mysql = require('mysql');
const fs = require('fs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const favicon = require('serve-favicon');
const path = require('path')

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'valorant_tourneys'
});

const app = express();
const port = 3000; // Port 3000 -> localhost:3000

const salt = '$2b$09$Du8MEP3D995b/zbEcYR8og';

function encrypt(input) {
    return bcrypt.hashSync(input, salt).substring(salt.length);
}

app.use(express.static(__dirname + '/public')); // url path begins at /public
app.use(bodyParser.urlencoded({extended: false})); // parse application/x-www-form-urlencoded
app.use(cookieParser());
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

app.post('/signup', function (req, res) {
    con.query(`SELECT * FROM accounts WHERE email = '${req.body.email}'`, function (err, result, fields) {
        if (err) throw err;

        if (result.length) {
            res.sendFile(__dirname + '/public/signin.html?error=emailTaken')
        }
    })

    con.query(`INSERT INTO accounts(first_name, last_name, email, password) VALUES ` +
        `('${req.body.firstName}', '${req.body.lastName}', '${req.body.email}', '${encrypt(req.body.password)}')`,
        function (err, result, fields) {
            if (err) throw err;

            console.log('New user sign up at ' + new Date(Date.now()).toString());
        });

    res.status(200).redirect('/');
});

app.listen(port, () => console.log(`Website listening on port ${port}!`));