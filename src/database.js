const mysql = require('mysql');
const { promisify } = require('util');
const { database } = require('./keys');

const pool = mysql.createPool(database); //crea conexion a la bd

pool.getConnection((err, connection) => {
    if (err) {
        if(err.code === 'PROTOCOL_CONNECTION_LOSS'){
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('DATABASE HAS TOO MANY CONECTIONS');
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }

    if(connection) connection.release();
    console.log('DB IS CONNECTED');
    return;
});

//Promisify pool queries
pool.query = promisify(pool.query);

module.exports = pool;