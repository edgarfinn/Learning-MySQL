# Learning-MySQL

### Cloud9 Specific
Start a new instance of MySQL which runs in the background.

```bash
mysql
# or if password protected:
mysql -u [user_name] -p
# followed by your password when prompted
```

Stop the existing instance of MySQL running.

```bash
exit;
```

### Creating a database.
List available databases:

```sql
SHOW DATABASES;
```

The general command for creating a database

```sql
CREATE DATABASE database_name;
```
(can be all lower case but capitals for commands is convention to differentiate commands from values)

A specific example:

```sql
CREATE DATABASE soap_store;
```

Delete a database:

```sql
DROP DATABASE database_name;
```

eg:
```sql
DROP DATABASE soap_store;
```


Tell MySQL which database which database to work with.
```sql
USE database_name;
```

example:
```sql
USE dog_walking_app;
```

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
$> SELECT * FROM cats;
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

$>
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
$> CREATE TABLE cats2
       (
         name VARCHAR(100) NOT NULL,
         age INT NOT NULL
       );
Query OK, 0 rows affected (0.04 sec)


$> INSERT INTO cats2 (name) VALUES ('stinky');
Query OK, 1 row affected, 1 warning (0.01 sec)

$> SHOW WARNINGS;
+---------+------+------------------------------------------+
| Level   | Code | Message                                  |
+---------+------+------------------------------------------+
| Warning | 1364 | Field 'age' doesnt have a default value  |
+---------+------+------------------------------------------+


$> SELECT * FROM cats2;
+--------+-----+
| name   | age |
+--------+-----+
| stinky |   0 |
+--------+-----+
1 row in set (0.00 sec)
```

In the absence of a default value, SQL will use its own [implicit default value](https://dev.mysql.com/doc/refman/8.0/en/data-type-defaults.html#data-types-defaults-implicit) for that insert (for example with INT, MySQL will default to `0`, for VARCHAR(100), MySQL will default to `''`.)

### Setting default values

You can set the default values for a table using the `DEFAULT` keyword:

```sql

CREATE TABLE cats3
  (
    name VARCHAR(20) DEFAULT 'no name provided',
    age INT DEFAULT 99
  );
```

Now whenever no value is provided for `name`, the table will default to `'no name provided'`, and when no age is provided, it will default to `99`.

Be carefull using DEFAULT without the NOT NULL constraint, because although it will default in the *absence* of a value being passed in, it *could* still take `null` as an explicitly passed value.

eg:

```sql
INSERT INTO cats3() VALUES();
INSERT INTO cats3 (name, age) VALUES (null, null);
```

...neither of the above insertions would return any errors, and they would both succesfully insert values into the table:

```sql
$> SELECT * FROM cats3;
+------------------+------+
| name             | age  |
+------------------+------+
| no name provided |   99 |
| NULL             | NULL |
+------------------+------+
2 rows in set (0.00 sec)
```

There is a risk you might find yourself with null values in your code base, so its important to safeguard against them being unintentionally inserted. If you dont want null values, use NOT NULL!

By contrast, if that table were created also using the `NOT NULL` constraint, it would return an error whenever NULL were passed in:

```sql
$> CREATE TABLE cats4
  (
    name VARCHAR(20) NOT NULL DEFAULT 'no name provided',
    age INT NOT NULL DEFAULT 99
  );

$> INSERT INTO cats4() VALUES();
Query OK, 1 row affected (0.01 sec)

$> SELECT * FROM cats4;
+------------------+-----+
| name             | age |
+------------------+-----+
| no name provided |  99 |
+------------------+-----+
1 row in set (0.00 sec)

$> INSERT INTO cats4 (name, age) VALUES (null, null);
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'VALES (null, null)' at line 1

```

### Primary Keys
A primary key is a column in a table that is used as a unique identifier (meaning no two values in that column can be the same).

##### Setting a primary key:

```sql
$> CREATE TABLE unique_cats
  (
    cat_id INT NOT NULL PRIMARY KEY,
    name VARCHAR(100),
    age INT,
  );

-- or alternatively:
$> CREATE TABLE unique_cats
(
  cat_id INT NOT NULL,
  name VARCHAR(100),
  age INT,
  PRIMARY KEY (cat_id)
);


```


```sql
$> DESC unique_cats;

+--------+--------------+------+-----+---------+-------+
| Field  | Type         | Null | Key | Default | Extra |
+--------+--------------+------+-----+---------+-------+
| cat_id | int(11)      | NO   | PRI | NULL    |       |
| name   | varchar(100) | YES  |     | NULL    |       |
| age    | int(11)      | YES  |     | NULL    |       |
+--------+--------------+------+-----+---------+-------+
3 rows in set (0.00 sec)
```

Notice the key column now tells you that the `cat_id` field is the primary key (`PRI`).

This table will not accept any two entries where the `cat_id` hold the same value, because they must be unique.

```sql
$> INSERT INTO unique_cats(cat_id, name, age) VALUES (1, 'sid', 3);                                                                  
Query OK, 1 row affected (0.01 sec)

$> INSERT INTO unique_cats(cat_id, name, age) VALUES (1, 'dave', 2);                                                                
ERROR 1062 (23000): Duplicate entry '1' for key 'PRIMARY'
$>
```
because the cat_id are the same in both inserts, the second insert has returned an error, and not executed.

#### Auto-incrementing:

You can use `AUTO_INCREMENT` to automatically fill ascending `INT` values for primary keys:

```sql
$> CREATE TABLE unique_cats2
    ->   (
    ->     cat_id INT NOT NULL AUTO_INCREMENT,
    ->     name VARCHAR(100),
    ->     age INT,
    ->     PRIMARY KEY (cat_id)
    ->   );
Query OK, 0 rows affected (0.00 sec)

$> INSERT INTO unique_cats2(name, age) VALUES('skippy', 4);
Query OK, 1 row affected (0.01 sec)

$> INSERT INTO unique_cats2(name, age) VALUES('bravo', 3);                                                                          
Query OK, 1 row affected (0.01 sec)

$> INSERT INTO unique_cats2(name, age) VALUES('barbara', 10);                                                                       
Query OK, 1 row affected (0.01 sec)

$> SELECT * FROM unique_cats2;
+--------+---------+------+
| cat_id | name    | age  |
+--------+---------+------+
|      1 | skippy  |    4 |
|      2 | bravo   |    3 |
|      3 | barbara |   10 |
+--------+---------+------+
3 rows in set (0.00 sec)
```

Above you can see how the table has automatically added ascending numbers in the cat_id field for each insertion.
