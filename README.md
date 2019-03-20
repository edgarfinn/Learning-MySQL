# Learning-MySQL

### Cloud9 Specific
Start a new instance of MySQL which runs in the background.

```mysql-ctl start```

Stop the existing instance of MySQL running.

```mysql-ctl stop```

Start the CLI:

```mysql-ctl cli;```

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

|  Name  | Breed | Age |
| ------------- | ------------ || ------------- |
| Rover | Labrador  | 3  |
| Dennis  | Jack Russel  | 1  |
| Daisy  | Golden Retriever  | 6  |

#### Data Types
Whenever you create a new column, MySQL requires that you specify what kind of data can be used to populate it (ie number / string etc...), to avid data inconsistencies such as:

|  Name  | Breed | Age |
| ------------- | ------------ || ------------- |
| Rover | Labrador  | 3  |
| Dennis  | Jack Russel  | one  |
| Daisy  | Golden Retriever  | 6  |

There are [loads of different mysql datatypes](https://dev.mysql.com/doc/refman/8.0/en/data-types.html). (See below for how to declare them)

### Creating a table:

```
CREATE TABLE tablename
  (
    column_name data_type,
    column_name data_type,
    column_name data_type,
    etc...
  );
```

eg:

```
CREATE TABLE dogs
  (
    name VARCHAR(100),
    age INT,
    breed VARCHAR(255),
    etc...
  );
```
