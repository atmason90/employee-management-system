// Dependencies
const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');

// Establish connection to mysql
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'ems_db'
    },
    console.log('Connected to the ems_db database')
);

// connect to mysql
db.connect (function (err) {
    if (err) throw (err);
    startPrompt();
});

// initial prompt
function startPrompt() {
    inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What action would you like to take?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Exit application']
    })
    .then(({ action }) => {
        switch (action) {
            case 'View all departments':
                viewDepartments();
                break;
            case 'View all roles':
                viewRoles();
                break;
            case 'View all employees':
                viewEmployees();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Update an employee role':
                updateEmployee();
                break;
            case 'Exit application':
                connection.end();
                break;
        }
    });
};

// view all departments
function viewDepartments() {
    console.log('Viewing all departments');
    let query = 'SELECT * FROM ems_db.department;';

    db.query(query, (err, res) => {
        if (err) throw (err);
        console.table(res);
        startPrompt();
    });
};

// view all roles
function viewRoles() {
    console.log('Viewing all roles');
    let query = 'SELECT * FROM ems_db.roles;';

    db.query(query, (err, res) => {
        if (err) throw (err);
        console.table(res);
        startPrompt();
    });
};

// view all employees
function viewEmployees() {
    console.log('Viewing all employees');
    let query = 'SELECT * FROM ems_db.employee;';

    db.query(query, (err, res) => {
        if (err) throw (err);
        console.table(res);
        startPrompt();
    });
};

// add a department
function addDepartment() {
    inquirer.prompt({
        type: 'input',
        name: 'newDepartment',
        message: 'Name of new department:'
    })
    .then(function(answer) {
        db.query('INSERT INTO department (name) VALUES (?)', [answer.newDepartment], function(err, res) {
            if (err) throw (err);
            console.table(res);
            startPrompt();
        });
    });
};

// add a role
function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newRole',
            message: 'What is the name of the role?'
        },
        {
            type: 'input',
            name: 'newSalary',
            message: 'What is the salary for this role?',
        },
        {
            type: 'input',
            name: 'newRoleDeptId',
            message: 'What is the department id #?'
        }
    ])
    .then(function(answer) {
        db.query('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?);', [answer.newRole, answer.newSalary, answer.newRoleDeptId], function(err, res) {
            if (err) throw (err);
            console.table(res);
            startPrompt();
        });
    });
};

// add an employee
function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newFirstName',
            message: "What is the employee's first name?",
        },
        {
            type: 'input',
            name: 'newLastName',
            message: "What is the employee's last name?"
        },
        {
            type: 'input',
            name: 'newRoleId',
            message: "What is the employee's role id #?"
        },
        {
            type: "input",
            name: 'newManagerId',
            message: "What is the manager of this employee's id #?"
        }
    ])
    .then(function(answer) {
        db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [answer.newFirstName, answer.newLastName, answer.newRoleId, answer.newManagerId], function(err, res) {
            if (err) throw (err);
            console.table(res);
            startPrompt();
        });
    });
};

// update employee role
function updateEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'updateEmployee',
            message: 'Which employee would you like to update?'
        },
        {
            type: 'input',
            name: 'updateRole',
            message: "What is the employee's new role id#?"
        }
    ])
    .then(function(answer) {
        db.query('UPDATE employee SET role_id=? WHERE first_name=?;', [answer.updateRole, answer.updateEmployee], function(err, res) {
            if (err) throw (err);
            console.table(res);
            startPrompt();
        });
    });
};
