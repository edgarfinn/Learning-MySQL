# Learning-MySQL

### Cloud9 Specific
Start a new instance of MySQL which runs in the background.

```mysql-ctl start```

Stop the existing instance of MySQL running.

```mysql-ctl stop```

Start the CLI:

```mysql-ctl cli;```

### Creating a database.
List available databases:

```show databases;```

The general command for creating a database

```CREATE DATABASE database_name;```
(can be all lower case but capitals for commands is convention to differentiate commands from values)

A specific example:

```CREATE DATABASE soap_store;```

Delete a database:

```DROP DATABASE database_name;```

eg:
```DROP DATABASE soap_store;```


Tell MySQL which database which database to work with.
```USE database_name;```

example:
```USE dog_walking_app;```

Return the current database in use:

```SELECT database();```

### Tables
A MySQL database is essentially a collection of Tables.

Wiki definition: "A Table is a collection of related data held in a structured format within a database."

You can think of a table as similar to an excel spreadsheet, where you have columns (vertically) and rows (horizontally):

|  Name         | Breed           | Age             |
| ------------- | :------------:  | :-------------: |
| Rover         | Labrador        | 3               |
| Dennis        | Jack Russel     | 1               |
| Daisy         | Golden Retrieve | 6               |

#### Data Types
Whenever you create a new column, MySQL requires that you specify what kind of data can be used to populate it (ie number / string etc...), to avoid data inconsistencies such as:

|  Name         | Breed             | Age      |
| ------------- | :---------------: | :------: |
| Rover         | Labrador          | 3        |
| Dennis        | Jack Russel       | one      |
| Daisy         | Golden Retriever  | 6        |

There are [loads of different mysql datatypes](https://dev.mysql.com/doc/refman/8.0/en/data-types.html). (See below for how to declare them)

### Creating a table:

```sql
CREATE TABLE tablename
  (
    column_name data_type,
    column_name data_type
  );
```

eg:

```sql
CREATE TABLE cats
  (
    name VARCHAR(100),
    age INT
  );
```

Return all tables in current database:
```SHOW TABLES;```

Return slightly more detailed info about columns in the specified table in the current database:
```sql
SHOW COLUMNS FROM tablename;
```

A shorter-hand alternative to `SHOW COLUMNS` is

```sql
DESC tablename;
```

...which pretty much returns the same information.

Permanently delete Table (be careful!):
```sql
DROP TABLE tablename;
```

### Adding data to Tables (`INSERT`).

```sql
INSERT INTO tablename
            ( column1Name,
              column2Name )
VALUES      ( value1,
              value2 );
```      

eg:

```sql

INSERT INTO cats
            ( NAME,
              age )
VALUES      ( "Jetson",
              5 );
```

You can insert multiple rows of data in one command by chaining values in parens and separating them by commas:

```SQL

INSERT INTO table_name
            (column_name, column_name)
VALUES      (value, value),
            (value, value),
            (value, value);
```

##### Escaping quotation marks in commands:

Either:

- Escape the quotes with a backslash:
    - `"This text has \"quotes\" in it"` or `'This text has \'quotes\' in it'`

or

- Alternate single and double quotes:
    - `"This text has 'quotes' in it"` or `'This text has "quotes" in it'`


### A note on warnings:
```
    +-------+-------------+------+-----+---------+-------+
    | Field | Type        | Null | Key | Default | Extra |
    +-------+-------------+------+-----+---------+-------+
    | name  | varchar(50) | YES  |     | NULL    |       |
    | age   | int(11)     | YES  |     | NULL    |       |
    +-------+-------------+------+-----+---------+-------+
```

If an incorrect data type were inserted into the above table, for example 'seven' for an age:

```INSERT INTO cats (name, age) VALUES ('Boris', 'seven');```

MySQL will return the normal response, but mention that there's a warning too:

`Query OK, 1 row affected, 1 warning (0.01 sec)`

**Only** directly after receiving the warning response, you can ask for more information about the warning with:

``` SHOW WARNINGS;```, which would return:

```
+---------+------+------------------------------------------------------------+
| Level   | Code | Message                                                    |
+---------+------+------------------------------------------------------------+
| Warning | 1366 | Incorrect integer value: 'seven' for column 'age' at row 1 |
+---------+------+------------------------------------------------------------+
```

NOTE: If you run another command after receiving the warning response then `SHOW WARNINGS` wont return anything. It only works on the most recently executed command.

### Null in SQL

```
# cats table
    +-------+-------------+------+-----+---------+-------+
    | Field | Type        | Null | Key | Default | Extra |
    +-------+-------------+------+-----+---------+-------+
    | name  | varchar(50) | YES  |     | NULL    |       |
    | age   | int(11)     | YES  |     | NULL    |       |
    +-------+-------------+------+-----+---------+-------+
```

Null means undefined / unspecified. In the above table, the Null column is marked as `YES` because those rows are permitted to be empty. In other words you can INSERT into that table with incomplete data such as `INSERT INTO cats (name) VALUES ('sandy');` without any problems.

SQL will just fill in the gap with `NULL`.

```
mysql> SELECT * FROM cats;
+-----------+------+
| name      | age  |
+-----------+------+
| Blue      |    1 |
| peanut    |    2 |
| Butter    |    4 |
| Jelly     |    7 |
| Boris     |    0 |
| sandy     | NULL |
+-----------+------+

mysql>
```

You can prevent columns from being null by specifying NOT NULL:

```sql
CREATE TABLE cats
  (
    name VARCHAR(100) NOT NULL,
    age INT NOT NULL
  )
```

Then if a column is left blank, SQL will try to fill it with the default value, and will return a warning whenever a default value is not provided:

```sql
mysql> CREATE TABLE cats2
       (
         name VARCHAR(100) NOT NULL,
         age INT NOT NULL
       );
Query OK, 0 rows affected (0.04 sec)


mysql> INSERT INTO cats2 (name) VALUES ('stinky');
Query OK, 1 row affected, 1 warning (0.01 sec)

mysql> SHOW WARNINGS;
+---------+------+------------------------------------------+
| Level   | Code | Message                                  |
+---------+------+------------------------------------------+
| Warning | 1364 | Field 'age' doesnt have a default value  |
+---------+------+------------------------------------------+


mysql> SELECT * FROM cats2;
```

In the absence of a default value, SQL will use its own [implicit default value](https://dev.mysql.com/doc/refman/8.0/en/data-type-defaults.html#data-types-defaults-implicit) for that insert (for example with INT, MySQL will default to `0`, for VARCHAR(100), MySQL will default to `''`.)
