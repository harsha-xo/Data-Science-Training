create database Assignment1;
use Assignment1;

create table employees(
emp_id INT PRIMARY KEY,
emp_name VARCHAR(100),
department VARCHAR(50),
salary INT,
age INT );

create table departments(
dept_id INT PRIMARY KEY,
dept_name VARCHAR(50),
location VARCHAR(50));

INSERT INTO employees VALUES
(101,'Amit Sharma','Engineering', 60000, 30),
(102,'Neha Reddy', 'Marketing',45000, 28),
(103, 'Faizan Ali', 'Engineering', 58000,32),
(104,'Divya Mehta','HR',40000,29),
(105, 'Ravi Verma','Sales',35000, 26);

INSERT INTO departments VALUES
(1, 'Engineering', 'Bangalore'),
(2, 'Marketing','Mumbai'),
(3, 'HR', 'Delhi'),
(4, 'Sales','Chennai'),
(5,'Finance', 'Hyderabad');


-- SECTION A
select * from employees;
select emp_name, salary from employees;
select * from employees where salary > 40000;
select * from employees where age between 28 AND 32;
select * from employees where department != 'HR';
select * from employees ORDER BY salary DESC;
SELECT COUNT(*) AS employees_count from employees;
SELECT * from employees WHERE salary =(select MAX(salary) from employees);

-- SECTION B
select e.emp_name, d.location
FROM employees e
JOIN departments d
ON e.department =d.dept_name;

select d.dept_name, COUNT(e.emp_id) AS employee_count
FROM departments d JOIN employees e
ON e.department =d.dept_name
GROUP BY d.dept_name;

select department, AVG(salary) as average_salary
FROM employees
GROUP BY department;

select d.dept_name
from departments d
LEFT JOIN employees e 
ON d.dept_name = e.department
WHERE e.emp_id is NULL;

select department, SUM(salary) AS total_salary
from employees
GROUP BY department;

select department, AVG(salary) AS average_salary
from employees
GROUP BY department
HAVING AVG(salary) > 45000;

select emp_name, department
from employees
WHERE salary > 50000;




















