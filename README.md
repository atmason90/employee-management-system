# Employee Management System
![License Badge](https://img.shields.io/badge/License-MIT-blue)

GitHub Repository: https://github.com/atmason90/employee-management-system

## Table of Contents
* [Description](#description)
* [Application Demo](#application-demo)
* [Usage Instructions](#usage-instructions)
* [Code Examples](#code-examples)
* [Technologies Used](#technologies-used)
* [Questions](#questions)
* [License](#license)

## Description

The purpose of this project was to create a content management system to give the user the ability to manage employees at a company. 

This command line application uses node.js, inquirer, and mysql as it's core technologies.

## Application Demo

https://user-images.githubusercontent.com/99947655/166392001-e153fc6e-ddc9-4334-8ab9-fb791541c65e.mp4

## Code Examples

This example displays how I used mysql to display all roles within the company.

```js
function viewRoles() {
    console.log('Viewing all roles');
    let query = 'SELECT roles.id, roles.title, roles.salary, department.name AS department FROM ems_db.roles LEFT JOIN ems_db.department ON roles.department_id = department.id;';

    db.query(query, (err, res) => {
        if (err) throw (err);
        console.table(res);
        startPrompt();
    });
};
```

This example shows how is used mysql to add a department to the company.

```js
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
```

## Technologies Used

![JavaScript Badge](https://img.shields.io/badge/Language-JavaScript-yellow)
![Mysql Badge](https://img.shields.io/badge/Database-MySql-informational)
![Node.js Badge](https://img.shields.io/badge/Environment-Node.js-red)
![inquirer Badge](https://img.shields.io/badge/NPM-Inquirer-green)
![Ctable Badge](https://img.shields.io/badge/NPM-ConsoleTable-important)

## Questions

If you have any questions regarding this project, please reach out to me via email at atmason90@gmail.com.

You can view my other projects on GitHub by visiting my profile. 
[atmason90](https://github.com/atmason90)

## License

MIT License

Copyright (c) 2022 Andrew Mason

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
