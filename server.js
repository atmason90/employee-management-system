// Dependencies
const inquirer = require('inquirer');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'ems_db'
    },
    console.log('Connected to the ems_db database')
);