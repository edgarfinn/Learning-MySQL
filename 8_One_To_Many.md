# One To Many

## (Intro) Relationship Basics:

There are three main types of data relationships:
- One to one
- One to many relationship
- Many to may relationship

One to one is slightly less common, but one likely example might whereby data on one user is too much to store on one table, so its split out in to several tables. Here you might have a user with a username on one table, and their billing address on another table.

One to many describes how one entity can be linked to several of another entity, such as one user leaving many reviews of books, or having any orders in their order history. Here, the user can be connected to any number reviews or orders, but each of these reviews or orders can only be connected to one user.

Many to many could be demonstrated when a blog post is `"liked"` by many users, and those user like several blog posts. Here, a user's `"likes"` can be linked to any number of blog posts, and those blog posts can be connected to any number of user `"likes"`, so the relationship is many to many.

### Primary Keys
A primary key is a field in a table which uniquely identifies each row / record in a database table. They must be unique, and cannot be `null`.

A table can have only one primary key, which may consist of single or multiple fields. When multiple fields are used as a primary key, they are called a composite key.

If a table has a primary key defined on any field(s), then you cannot have two records having the same value of that field(s).

![Primary Keys](./assets/primarykeys.png)

In the above diagram, each table has a primary key, for customers: `customer_id`, for orders, `order_id`. Every entry of each of them is unique, and never null, and can therefore be used to reference the entire entry quickly and easily.

Refresher on how to [declare a `PRIMARY KEY`](https://github.com/edgarfinn/Learning-MySQL/blob/master/1_Creating_tables_and_inserting_data.md#primary-keys)

### Foreign keys
A foreign key is a key used to link two tables together. This is sometimes also called as a referencing key.

A Foreign Key is a column or a combination of columns whose values match a Primary Key in a different table.

The relationship between 2 tables matches the Primary Key in one of the tables with a Foreign Key in the second table.

If a table has a primary key defined on any field(s), then you cannot have two records having the same value of that field(s).

![Foreign Keys](./assets/foreignkeys.png)

Syntax for adding a foreign key constraint:

```SQL
CREATE TABLE customers(
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(100)
);

CREATE TABLE orders(
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_date DATE,
    amount DECIMAL(8,2),
    customer_id INT,
    
    FOREIGN KEY(customer_id) REFERENCES customers(id)
);
```
