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

```
CREATE TABLE tablename
  (
    column_name data_type,
    column_name data_type
  );
```

eg:

```
CREATE TABLE cats
  (
    name VARCHAR(100),
    age INT
  );
```

Return all tables in current database:
```SHOW TABLES;```

Return slightly more detailed info about columns in the specified table in the current database:
```SHOW COLUMNS FROM tablename;```

A shorter-hand alternative to `SHOW COLUMNS` is

```
DESC tablename;
```

...which pretty much returns the same information.

Permanently delete Table (be careful!):
```DROP TABLE tablename;```

### Adding data to Tables (`INSERT`).

```
INSERT INTO tablename
            ( column1Name,
              column2Name )
VALUES      ( value1,
              value2 );
```      

eg:

```
INSERT INTO cats
            ( NAME,
              age )
VALUES      ( "Jetson",
              5 );
```

You can insert multiple rows of data in one command by chaining values in parens and separating them by commas:

```
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
