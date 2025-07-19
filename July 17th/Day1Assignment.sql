use hexaware;

create table products (
product_id int primary key,
product_name varchar(100),
category varchar(50),
price decimal(10,2),
stock_quantity int,
added_date date);

insert into products values
(1, 'smartphone', 'electronics', 15000.00, 8, '2023-03-10'),
(2, 'sofa', 'furniture', 22000.00, 3, '2024-05-15'),
(3, 'shirt', 'clothing', 1200.00, 15, '2023-11-20'),
(4, 'skincare set', 'beauty', 950.00, 5, '2024-01-25'),
(5, 'sports watch', 'fitness', 1800.00, 0, '2022-12-30');

select * from products;
select product_name, price from products;
select * from products where stock_quantity < 10;
select * from products where price between 500 and 2000;
select * from products where added_date > '2023-01-01';
select * from products where product_name like 's%';
select * from products where category in ('electronics', 'furniture');

update products set price = 16000.00 where product_id = 1;
update products set stock_quantity = stock_quantity + 5 where category = 'furniture';
delete from products where product_id = 5;
delete from products where stock_quantity = 0;

select * from products;











