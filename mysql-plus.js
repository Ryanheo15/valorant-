// Changing connection variables
/**
 * @param {Connection} con Connection used by app.js
 */
exports.use = (con) => {
    exports.con = con;
}

exports.conDB = (dbName) => {
    exports.con.changeUser({
        database: dbName
    }, function (err) {
        if (err) throw err;
    });
}

// Query functions
exports.query = (options = {}) => {
    return new Promise((resolve, reject) => {
        exports.con.query(options.query, function (err, result, fields) {
            if (err) return reject(err);

            if (options.action) options.action(result);

            if (options.info) console.log(options.info);
            console.log(options.message ? options.message : result);
            console.log('');

            return resolve(result);
        });
    })
}

exports.escQuery = (options = {}) => {
    return new Promise((resolve, reject) => {
        exports.con.query(options.query, options.placeholders, function (err, result, fields) {
            if (err) return reject(err);

            if (options.action) options.action(result);

            if (options.info) console.log(options.info);
            console.log(options.message ? options.message : result);
            console.log('');

            return resolve(result);
        });
    })
};

// Database level functions
exports.showDBs = async () => {
    return exports.query({
        query: 'SHOW DATABASES',
        info: 'Showing Databases:'
    });
}

exports.createDB = async (dbName) => {
    return exports.query({
        query: `CREATE DATABASE ${dbName}`,
        message: `Database ${dbName} created`
    });
}

// Table level functions
exports.createTable = async (tableName, columns, idCol = true) => { // columns ex: = {colName : 'str', colName2 : 'int'}
    let fullQuery = `CREATE TABLE ${tableName}`;

    if (idCol) {
        fullQuery += ' (id INT AUTO_INCREMENT PRIMARY KEY';
    }

    for (const colName in columns) {
        switch (columns[colName]) {
            case 'str':
                fullQuery += `, ${colName} VARCHAR(255)`;
                break;
            case 'int':
                fullQuery += `, ${colName} INT`;
                break;
        }
    }

    fullQuery += ')';

    return exports.query({
        query: fullQuery,
        message: `Table ${tableName} created`
    });
}

exports.readTable = async (tableName) => {
    return exports.query({
        query: `SELECT * FROM ${tableName}`,
        info: `Reading table ${tableName}`
    });
}

exports.searchTable = async (tableName, col, value, options = {}) => {
    return exports.escQuery({
        query: `SELECT * FROM ${tableName} WHERE ${col} = ?`,
        placeholders: [value],
        info: `Searching table ${tableName} for where ${col} == ${value}`,
        ...options
    });
}

exports.insertRow = async (tableName, columns, options = {}) => {
    const colNames = Object.keys(columns);
    const colValues = Object.values(columns);

    let fullQuery = `INSERT INTO ${tableName}(${colNames.shift()}`;

    colNames.forEach(colName => {
        fullQuery += `, ${colName}`;
    });

    fullQuery += ') VALUES (?';

    for (i = 0; i < colNames.length; i++) {
        fullQuery += ', ?';
    }

    fullQuery += ')';

    return exports.escQuery({
        query: fullQuery,
        placeholders: colValues,
        ...options
    });
}

exports.deleteRow = async (tableName, condition) => {
    return exports.query({
        query: `DELETE FROM ${tableName} WHERE ${condition}`,
        message: `Deleted from ${tableName} where ${condition}`
    });
}