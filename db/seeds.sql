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
VALUES  (1, 'Amanda', 'Manning', 500, NULL),
        (2, 'Carrington', 'Taylor', 500, NULL),
        (3, 'Justin', 'Stilley', 500, NULL);
        (4, 'Cash', 'Counter', 100, 1),
        (5, 'Penny', 'Wise', 101, 1),
        (6, 'Mark', 'Devel', 200, 2),
        (7, 'Sally', 'Signer', 201, 2),
        (8, 'Gregor', 'Byte', 300, 3),
        (9, 'Andrew', 'Mason', 301, 3),
        (10, 'Judy', 'Law', 400, NULL),
        (11, 'Lawrence', 'Judge', 401, NULL),

