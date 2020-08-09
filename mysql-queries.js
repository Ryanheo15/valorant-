const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: ''
});

const conDB = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'valorant_tourneys'
});

// Initializing database
/*
con.connect(function (err) {
    if (err) throw err;

    console.log('Connected!');

    // Creates 'valorant_tourneys' database
    con.query('CREATE DATABASE valorant_tourneys', function (err, result) {
        if (err) throw err;
        console.log('Database created');
    });

    // Show databases
    con.query('SHOW DATABASES', function (err, result) {
        if (err) throw err;

        console.log(result);
    });
});
 */

// Initializing tables
conDB.connect(function (err) {
    if (err) throw err;

    console.log('Connected!');

    // Create 'accounts' table
    /*
    conDB.query('CREATE TABLE accounts (id INT AUTO_INCREMENT PRIMARY KEY, first_name VARCHAR(255), '
        + 'last_name VARCHAR(255), email VARCHAR(255), password VARCHAR(255))', function (err, result) {
        if (err) throw err;
    });
     */

    // Show tables in 'valorant_tourneys' database
    /*
    conDB.query('SHOW TABLES', function (err, result) {
        if (err) throw err;

        console.log(result);
    });
     */

    // Read 'accounts' tables
    conDB.query('SELECT * FROM accounts', function (err, result) {
        if (err) throw err;

        console.log(result);
    });
});