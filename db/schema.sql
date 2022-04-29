DROP DATABASE IF EXISTS ems_db;
CREATE DATABASE ems_db;

USE ems_db;

CREATE TABLE department (
    id INT PRIMARY KEY,
    department_name VARCHAR(30)
);

CREATE TABLE roles (
    id INT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    FOREIGN KEY (role_id)
    REFERENCES roles(id)
    ON DELETE SET NULL
);