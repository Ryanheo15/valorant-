// PACKAGES
const express = require('express');
const mysql = require('mysql');
const fs = require('fs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const favicon = require('serve-favicon');
const path = require('path');

// CUSTOM MODULES
const mysqlPlus = require('./mysql-plus.js');

// CONSTANTS
const app = express();
const port = 3000; // Port 3000 -> localhost:3000

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: ''
});

const salt = '$2b$09$Du8MEP3D995b/zbEcYR8og';

// FUNCTIONS
function encrypt(input) {
    return bcrypt.hashSync(input, salt).substring(salt.length);
}

function updatePackages() {
    require('./update-packages.js').update();
}

// INITIALIZATION
app.use(express.static(__dirname + '/public')); // url path begins at /public
app.use(bodyParser.urlencoded({
    extended: false
})); // parse application/x-www-form-urlencoded
app.use(cookieParser());
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// REQUEST METHODS
app.post('/signup', async (req, res) => {

    console.log('Signup request received!\n');

    const emailTaken = await mysqlPlus.searchTable('accounts', 'email', req.body.email, {
        action: (result) => {
            if (result.length) {
                res.status(200).redirect('/?error=emailTaken');
                res.end();
            }
        }
    });

    if (!emailTaken.length) {
        mysqlPlus.insertRow('accounts', {
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            email: req.body.email,
            password: encrypt(req.body.password)
        }, {
            message: 'New user sign up at ' + new Date(Date.now()).toString(),
            action: (result) => {
                res.status(200).redirect('/signin.html')
            }
        });
    }
});

// MYSQL QUERIES
mysqlPlus.use(con);

// mysqlPlus.createDB('valorant_tourneys');
mysqlPlus.conDB('valorant_tourneys');
//mysqlPlus.createTable('accounts', {first_name: 'str', last_name: 'str', email: 'str', password: 'str'});
mysqlPlus.readTable('accounts');

// LAUNCH
app.listen(port, () => console.log(`Website listening on port ${port}!\n`));