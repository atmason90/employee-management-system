INSERT INTO department (name)
VALUES  ('Accounting'),
        ('Sales'),
        ('Engineering'),
        ('Legal'),
        ('Management');

INSERT INTO roles (title, salary, department_id)
VALUES  ('Accountant', 90000, 1),
        ('Controller', 160000, 1),
        ('Market Development Representative', 75000, 2),
        ('Account Executive', 120000, 2),
        ('Web Developer', 150000, 3),
        ('Software Architect', 225000, 3),
        ('Legal Counsel', 200000, 4),
        ('Lead Legal Counsel', 250000, 4),
        ('Manager', 300000, 5);
        

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Amanda', 'Manning', 9, NULL),
        ('Carrington', 'Taylor', 9, NULL),
        ('Justin', 'Stilley', 9, NULL);
        ('Cash', 'Counter', 1, 1),
        ('Penny', 'Wise', 2, 1),
        ('Mark', 'Devel', 3, 2),
        ('Sally', 'Signer', 4, 2),
        ('Gregor', 'Byte', 5, 3),
        ('Andrew', 'Mason', 6, 3),
        ('Judy', 'Law', 7, NULL),
        ('Lawrence', 'Judge', 8, NULL),

