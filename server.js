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
    let query = 'SELECT roles.id, roles.title, roles.salary, department.name AS department FROM ems_db.roles LEFT JOIN ems_db.department ON roles.department_id = department.id;';

    db.query(query, (err, res) => {
        if (err) throw (err);
        console.table(res);
        startPrompt();
    });
};

// view all employees
function viewEmployees() {
    console.log('Viewing all employees');
    let query = 'SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name AS department, roles.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager, manager.id AS "manager id" FROM employee LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN department ON roles.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id;';

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
        let query = 'INSERT INTO department (name) VALUES (?)'
        db.query(query, [answer.newDepartment], function(err, res) {
            if (err) throw (err);
            console.table(res);
            startPrompt();
        });
    });
};


// add a role
function addRole() {
    let query1 = 'SELECT roles.title AS role, roles.salary, department.name FROM roles LEFT JOIN department ON department.id = roles.department_id;';
    let query2 = 'SELECT department.name FROM department;';

    db.query(query1, (err, res) => {
        if (err) throw (err);
        // console.table(res);
        db.query(query2, (err, res) => {
            if (err) throw (err);
            let deptList = res;
            let addRolePrompt = [
                {
                    type: 'input',
                    name: 'newRole',
                    message: 'What is the name of the role?'
                },
                {
                    type: 'input',
                    name: 'newSalary',
                    message: 'What is the salary?'
                },
                {
                    type: 'list',
                    name: 'newRoleDept',
                    message: "Select a department.",
                    choices: function() {
                        depts = [];
                        for(i = 0; i < deptList.length; i++) {
                            const roleId = i + 1;
                            depts.push(roleId + ": " + deptList[i].name);
                        };
                        depts.unshift("0: Exit");
                        return depts;
                    }
                }
            ];
            inquirer.prompt(addRolePrompt)
            .then((answer) => {
                if(answer.newRoleDept == "0: Exit") {
                    startPrompt();
                } else {
                    let query = "INSERT INTO roles SET ?;";
                    db.query(query,
                        {
                            title: answer.newRole,
                            salary: answer.newSalary,
                            department_id: parseInt(answer.newRoleDept.split(":")[0])
                        }, (err, res) => {
                            if (err) throw (err);
                        });
                        let addRoleAgain = [
                            {
                                type: 'list',
                                name: 'addRoleAgain',
                                message: 'Would you like to add another role?',
                                choices: ["Yes", "No"]
                            }
                        ];
                        inquirer.prompt(addRoleAgain)
                        .then((answer) => {
                            let query = "SELECT roles.id, roles.title AS roles, department.name FROM roles LEFT JOIN department ON department.id = roles.department_id;";
                            db.query(query, (err, res) => {
                                if (err) throw (err);
                                if (answer.addRoleAgain == "Yes") {
                                    addRole();
                                } else if (answer.addRoleAgain == "No") {
                                    console.table(res),
                                    startPrompt();
                                };
                            });
                        });
                };
            });
        });
    });
};


// add an employee
function addEmployee() {
    let query1 = "SELECT title FROM roles;";
    let query2 = "SELECT employee.first_name, employee.last_name, roles.title, roles.salary, department.name, employee.manager_id FROM employee JOIN roles ON roles.id = employee.role_id JOIN department ON roles.department_id = department.id ORDER BY employee.id;";

    db.query(query1, (err, res) => {
        if (err) throw (err);
        let rolesList = res;
        db.query(query2, (err, res) => {
            if (err) throw (err);
            for (i = 0; i < res.length; i++) {
                if(res[i].manager_id == 0) {
                    res[i].manager = "None"
                } else {
                    res[i].manager = res[res[i].manager_id - 1].first_name + " " + res[res[i].manager_id - 1].last_name;
                };
                delete res[i].manager_id;
            };
            console.table(res);
            let managerList = res;
            let addEmployeePrompt = [
                {
                    type: 'input',
                    name: 'first_name',
                    message: "What is the new employee's first name?"
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: "What is the new employee's last name?"
                },
                {
                    type: 'list',
                    name: 'selectRole',
                    message: "What is the new employee's role?",
                    choices: function() {
                        roles = [];
                        for(i = 0; i < rolesList.length; i++) {
                            const roleId = i + 1;
                            roles.push(roleId + ": " + rolesList[i].title);
                        };
                        roles.unshift("Exit");
                        return roles;
                    }
                },
                {
                    type: 'list',
                    name: 'selectManager',
                    message: "Who is the new employee's manager?",
                    choices: function() {
                        managers = [];
                        for(i = 0; i < managerList.length; i++) {
                            const managerId = i + 1;
                            managers.push(managerId + ": " + managerList[i].first_name + " " + managerList[i].last_name);
                        };
                        managers.unshift("0: None");
                        managers.unshift("Exit");
                        return managers;
                    },
                    when: function(answers) {
                        return answers.selectRole !== "Exit"
                    }
                }
            ];
            inquirer.prompt(addEmployeePrompt)
            .then((answer) => {
                if(answer.selectRole == "Exit" || answer.selectManager == "Exit") {
                    startPrompt();
                } else {
                    let query = "INSERT INTO employee SET ?;";
                    db.query(query,
                        {
                            first_name: answer.first_name,
                            last_name: answer.last_name,
                            role_id: parseInt(answer.selectRole.split(":")[0]),
                            manager_id: parseInt(answer.selectManager.split(":")[0])
                        },
                        (err, res) => {
                            if (err) throw (err);
                        })
                        let addEmpAgainPrompt = [
                            {
                                type: 'list',
                                name: 'addEmpAgain',
                                message: 'Would you like to add another employee?',
                                choices: ["Yes", "No"]
                            }
                        ];
                        inquirer.prompt(addEmpAgainPrompt)
                        .then((answer) => {
                            let query = "SELECT employee.first_name, employee.last_name, roles.title, roles.salary, department.name, employee.manager_id FROM employee JOIN roles ON roles.id = employee.role_id JOIN department ON roles.department_id = department.id ORDER BY employee.id;";
                            db.query(query, (err, res) => {
                                if (err) throw (err);
                                if (answer.addEmpAgain == "Yes") {
                                    addEmployee();
                                } else if (answer.addEmpAgain == "No") {
                                    for (i = 0; i < res.length; i++) {
                                        if(res[i].manager_id == 0) {
                                            res[i].manager = "None"
                                        } else {
                                            res[i].manager = res[res[i].manager_id - 1].first_name + " " + res[res[i].manager_id - 1].last_name;
                                        };
                                        delete res[i].manager_id;
                                    };
                                    console.table(res);
                                    startPrompt();
                                };
                            });
                        });
                };
            });
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
