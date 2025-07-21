create database Assign4;
use Assign4;

-- SECTION 1
CREATE TABLE movies (
    movie_id INT PRIMARY KEY,
    title VARCHAR(100),
    genre VARCHAR(50),
    release_year INT,
    rental_rate DECIMAL(6,2));

CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    city VARCHAR(50));

CREATE TABLE rentals (
    rental_id INT PRIMARY KEY,
    customer_id INT,
    movie_id INT,
    rental_date DATE,
    return_date DATE,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id));
    
-- SECTION 2
INSERT INTO movies VALUES
(1,'The Last Stand', 'Action', 2019,150.00),
(2,'Silent Echoes', 'Thriller', 2021, 200.00),
(3, 'Love Again','Romance',2022, 180.00),
(4,'Galactic Wars', 'Sci-Fi', 2023,220.00),
(5, 'Laugh Out Loud', 'Comedy',2018, 130.00);

INSERT INTO customers VALUES
(1,'Amit Sharma', 'amit@gmail.com','Delhi'),
(2,'Riya Mehra','riya@gmail.com', 'Bangalore'),
(3,'Karan Patel','karan@gmail.com','Hyderabad'),
(4, 'Sara Khan', 'sara@gmail.com','Mumbai'),
(5,'Neha Verma', 'neha@gmail.com', 'Bangalore');

INSERT INTO rentals VALUES
(1,1, 2,'2024-06-01', '2024-06-05'),
(2, 2, 3, '2024-06-02','2024-06-06'),
(3,1, 1,'2024-06-03', '2024-06-08'),
(4,3, 1,'2024-06-04','2024-06-10'),
(5, 4, 4,'2024-06-06', '2024-06-11'),
(6, 5, 5, '2024-06-07','2024-06-09'),
(7,2, 2,'2024-06-08', NULL),
(8, 1, 4, '2024-06-09','2024-06-12');

-- SECTION 3
-- Basic queries
SELECT m.title
FROM rentals r JOIN customers c ON r.customer_id = c.customer_id
JOIN movies m ON r.movie_id = m.movie_id
WHERE c.name = 'Amit Sharma';

SELECT * FROM customers
WHERE city = 'Bangalore';

SELECT * FROM movies
WHERE release_year > 2020;

-- Aggregate queries
SELECT c.name, COUNT(r.rental_id) AS rental_count
FROM customers c
LEFT JOIN rentals r ON c.customer_id = r.customer_id
GROUP BY c.customer_id;

SELECT m.title, COUNT(*) AS times_rented
FROM rentals r
JOIN movies m ON r.movie_id = m.movie_id
GROUP BY r.movie_id
ORDER BY times_rented DESC
LIMIT 1;

SELECT SUM(m.rental_rate) AS total_revenue
FROM rentals r
JOIN movies m ON r.movie_id = m.movie_id;

-- Advanced queries
insert into customers values (6, 'Arjun raj', 'arjun@gmail.com', 'Chennai');
SELECT c.name
FROM customers c
LEFT JOIN rentals r ON c.customer_id = r.customer_id
WHERE r.rental_id IS NULL;

SELECT m.genre, SUM(m.rental_rate) AS total_genre_revenue
FROM rentals r
JOIN movies m ON r.movie_id = m.movie_id
GROUP BY m.genre;

SELECT c.name, SUM(m.rental_rate) AS total_spent
FROM rentals r
JOIN customers c ON r.customer_id = c.customer_id
JOIN movies m ON r.movie_id = m.movie_id
GROUP BY c.customer_id
ORDER BY total_spent DESC
LIMIT 1;

SELECT m.title
FROM rentals r
JOIN movies m ON r.movie_id = m.movie_id
WHERE r.return_date IS NULL;
















