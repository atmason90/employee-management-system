INSERT INTO department (id, department_name)
VALUES  (001, 'Accounting'),
        (002, 'Sales'),
        (003, 'Engineering'),
        (004, 'Legal'),
        (005, 'Management');

INSERT INTO roles (id, title, salary, department_id)
VALUES  (100, 'Accountant', 90000, 001),
        (101, 'Controller', 160000, 001),
        (200, 'Market Development Representative', 75000, 002),
        (201, 'Account Executive', 120000, 002),
        (300, 'Web Developer', 150000, 003),
        (301, 'Software Architect', 225000, 003),
        (400, 'Legal Counsel', 200000, 004),
        (401, 'Lead Legal Counsel', 250000, 004),
        (500, 'Manager', 300000, 005);
        

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  (10, 'Cash', 'Counter', 100, 50),
        (11, 'Penny', 'Wise', 101, 50),
        (20, 'Mark', 'Devel', 200, 51),
        (21, 'Sally', 'Signer', 201, 51),
        (30, 'Gregor', 'Byte', 300, 52),
        (31, 'Andrew', 'Mason', 301, 52),
        (40, 'Judy', 'Law', 400, NULL),
        (41, 'Lawrence', 'Judge', 401, NULL),
        (50, 'Amanda', 'Manning', 500, NULL),
        (51, 'Carrington', 'Taylor', 500, NULL),
        (52, 'Justin', 'Stilley', 500, NULL);
