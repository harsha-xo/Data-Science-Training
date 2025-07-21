create database Assign3;
use Assign3;

-- PART 1
CREATE TABLE books (
    book_id INT PRIMARY KEY,
    title VARCHAR(100),
    author VARCHAR(100),
    genre VARCHAR(50),
    price DECIMAL(10,2));

CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    city VARCHAR(50));

CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    book_id INT,
    order_date DATE,
    quantity INT);
    
-- PART 2
INSERT INTO books VALUES
(1, 'Atomic Habits','James Clear','Self-help',450.00),
(2,'The Alchemist', 'Paulo Coelho', 'Fiction', 550.00),
(3,'Introduction to Algorithms','Cormen','Education',1200.00),
(4,'Think Like a Monk','Jay Shetty', 'Self-help', 600.00),
(5, 'The Silent Patient', 'Alex Michaelides','Thriller', 480.00);

INSERT INTO customers VALUES
(1,'Amit Sharma','amit@gmail.com','Delhi'),
(2, 'Neha Reddy', 'neha@gmail.com','Hyderabad'),
(3,'Faizan Ali','faizan@gmail.com', 'Mumbai'),
(4, 'Divya Mehta', 'divya@gmail.com','Bangalore'),
(5, 'Ravi Verma', 'ravi@gmail.com', 'Chennai');

INSERT INTO orders VALUES
(1,1, 2, '2023-02-15',1),
(2, 2,4, '2023-05-20', 2),
(3, 3, 3,'2023-01-10',1),
(4,1, 1, '2022-12-25', 1),
(5,4, 2,'2023-03-10', 1),
(6,2, 3, '2023-06-05', 1),
(7, 2,2, '2023-07-01', 3);

-- PART 3
-- Basic queries
SELECT * FROM books WHERE price > 500;
SELECT * FROM customers WHERE city = 'Hyderabad';
SELECT * FROM orders WHERE order_date > '2023-01-01';

-- Joins and aggregations
SELECT c.name, b.title
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
JOIN books b ON o.book_id = b.book_id;

SELECT b.genre, SUM(o.quantity) AS total_sold
FROM orders o
JOIN books b ON o.book_id = b.book_id
GROUP BY b.genre;

SELECT b.title, SUM(b.price * o.quantity) AS total_sales
FROM orders o
JOIN books b ON o.book_id = b.book_id
GROUP BY b.title;

SELECT c.name, COUNT(o.order_id) AS order_count
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
GROUP BY c.name
ORDER BY order_count DESC
LIMIT 1;

SELECT genre, AVG(price) AS avg_price
FROM books
GROUP BY genre;

SELECT * FROM books
WHERE book_id NOT IN (SELECT DISTINCT book_id FROM orders);

SELECT c.name, SUM(b.price * o.quantity) AS total_spent
FROM orders o JOIN customers c
ON o.customer_id = c.customer_id
JOIN books b ON o.book_id = b.book_id
GROUP BY c.name
ORDER BY total_spent DESC
LIMIT 1;














