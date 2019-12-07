DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products (
item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(100) NOT NULL,
price DECIMAL (10,2) NOT NULL,
stock_quantity INTEGER (20) NOT NULL,
PRIMARY KEY (item_id)
);

SELECT * FROM products;
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("NHL 19", "Games", 16, 30),
	   ("Febreze", "Cleaning", 3, 69),
       ("Nintendo Switch" "Games", 200, 40),
       ("Candles", "Home Goods", 10, 25),
       ("Backpacks", "Bags", 30, 40),
       ("Socks", "Footwear", 5, 100),
       ("Planet Earth", "Videos", 20, 1),
       ("iPhone Cases", "Tech", 22, 77),
       ("Bananas", "Food", 7, 99),
       ("PS4", "Games", 300, 50)
