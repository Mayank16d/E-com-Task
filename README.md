# Steps to Follow

## Setup

* Install Node.js and MySQL on your system
* Create a new MySQL database named node_practical
* Create a MySQL user and grant permissions:

  * CREATE USER 'node_user'@'localhost' IDENTIFIED BY 'node_pass';
  * GRANT ALL PRIVILEGES ON node_practical.* TO 'node_user'@'localhost';
  * FLUSH PRIVILEGES;

## Environment Variables

* Create a .env file in the project root with:

  * DB_HOST=localhost
  * DB_NAME=node_practical
  * DB_USER=node_user
  * DB_PASS=node_pass
  * JWT_SECRET=your_secret_key
  * PORT=4000

## Install Dependencies

* Run npm install in the project directory
* Required packages:

  * express
  * sequelize
  * mysql2
  * joi
  * bcrypt
  * jsonwebtoken
  * dotenv
  * nodemon as a dev dependency

## Project Structure

* Keep all models inside src/models
* Keep all controllers inside src/controllers
* Keep all routes inside src/routes
* Keep all middleware inside src/middlewares
* Keep all Joi validators inside src/validators
* Configure database in src/config/db.js
* Run everything from src/app.js

## Database Sync

* Start the server using npm run dev
* Sequelize will automatically sync tables because sync({ alter: true }) is enabled
* Verify tables in MySQL with SHOW TABLES

## Seeding

* Insert a default coupon manually:
  
  * INSERT INTO coupons (code, discount_type, value, min_order_value, expiry_date, usage_limit, createdAt, updatedAt) VALUES ('WELCOME10', 'percent', 10, 0, DATE_ADD(NOW(), INTERVAL 30 DAY), 100, NOW(), NOW());

## Authentication

* Use /auth/register for user registration
* Use /auth/login for user login
* Use /auth/register-seller for seller registration
* Use /auth/login-seller for seller login
* Save the returned token and use it in Authorization header as Bearer token

## Product Management

* Use /products to create a product with a seller token
* Use /products to fetch all products

## Cart Operations

* Use /cart/add to add items to the cart with a user token
* Use /cart to view the cart

## Checkout

* Use /checkout/place to place an order
* Supports coupon discount and wallet deduction
* Clears the cart and deducts stock

## Payment Simulation

* Use /payments/webhook to mark an order as success or failure
* On success, order status becomes paid
* On failure, stock and wallet are restored


