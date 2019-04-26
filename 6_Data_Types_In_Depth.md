# Data Types

## Text

### `CHAR` and `VARCHAR`
(see [documentation](https://dev.mysql.com/doc/refman/8.0/en/char.html) for more detailed information)

Both `CHAR` and `VARCHAR` define fields for variable numbers of characters, and are implemented by passing in the maximum required number of characters anticipated for that field

- CHAR(50)
  - *(can be anything from 0 to 255)*
- VARCHAR(50)
  - *(can be anything from 0 to 65,535, subject to maximum row size shared among columns)*
    - see [#Limits on Table Column Count and Row Size](https://dev.mysql.com/doc/refman/8.0/en/column-count-limit.html)


- Whilst any number of characters **up to** the specified maximum can be entered with either `CHAR` or `VARCHAR`, `CHAR` will always ensure the value is the same size, and pad any remaining storage with spaces to the right of the value.

- For example an entry of `'ab'` into a `CHAR(3)` field will be stored as `'ab '` (with an added space on the end to bring it up to the character limit). As such, `CHAR` fields always take up the same amount of storage space.

  - When `SELECT`'ed, those padded spaces are removed unless specified otherwise. BEWARE - that deliberately trailing spaces will also be removed in this process!


- `CHAR` can be more performant for tables storing high volumes of entries of data of a fixed size.


## Numbers

### `INT`
whole numbers

### `DECIMAL`
numbers that can whole decimal points.

`DECIMAL(M, D)`

**M** is the maximum number of digits the number can be (including numbers after the decimal point). Can range from 1 to 65.

**D** is the number of digits to the right of the decimal point, which can range form 0 to 30, and must be no larger than **M**.

So for example: `CREATE TABLE items(price DECIMAL(5,2));` would declare a field for values that looked like: `nnn.nn`, like `999.99` (**5** digits long in total, and has **2** digits after the decimal place).

- it will always add the specified digits to the right of the decimal point, even if a whole number is added (in which case the decimals will just be zeros).

  - eg: `INSERT INTO items(price) VALUES(7);` would be stored as `7.00`.


- it will round any numbers that exceed the maximum possible value of its constraints.

  - eg: `INSERT INTO items(price) VALUES(798654);` would be stored as `999.99`.

- rounding may also be applied to decimal places that exceed the character limit:

  - eg: `INSERT INTO items(price) VALUES(298.9999);` will be stored as `299.00`, to round up the excess 9's after the decimal place.
  - similarly, `INSERT INTO items(price) VALUES(1.99999);` would be stored as `2.00`, again rounding up the excess 9s.


### Approximate value numbers (`FLOAT` and `DOUBLE`).

`FLOAT` and `DOUBLE` are floating-point data types, and calculations are approximate. They can however be useful for storing larger numbers using less storage space.

- `FLOAT`s require 4 bytes of memory, and will have precision issues after around 7 digits.

- `DOUBLE`s require 8 bytes of memory, and will have precision issues after around 15 digits.

```SQL
CREATE TABLE floats(price FLOAT);

INSERT INTO floats(price) VALUES(25);

SELECT * FROM floats;
-- +-------+
-- | price |
-- +-------+
-- |    25 |
-- +-------+

INSERT INTO floats(price) VALUES(99.88);

SELECT * FROM floats;
-- +-------+
-- | price |
-- +-------+
-- |    25 |
-- | 99.88 |
-- +-------+

INSERT INTO floats(price) VALUES(99887766.55);

SELECT * FROM floats;
-- +----------+
-- | price    |
-- +----------+
-- |       25 |
-- |    99.88 |
-- | 99887800 |
-- +----------+
```
Notice in the last insert, the 7th character  of the inserted value has been rounded into the 6th, and the remainder of the value is just padded with zeros. This is the nature of the precision error faced with `FLOAT` and `DOUBLE`.

As a rule of thumb, unless you absolutely know taht precision doesn't matter, its best to default to using `DECIMAL`.

### Dates and Times.

- `DATE` (no time) `YYYY-MM-DD`

- `TIME` (no date) `HH:MM:SS`

- `DATETIME` (most commonly used) `YYYY-MM-DD HH:MM:SS`

```SQL
CREATE TABLE people (
    -> name VARCHAR(100),
    -> birthdate DATE,
    -> birthtime TIME,
    -> birthdt DATETIME
    -> );
Query OK, 0 rows affected (0.02 sec)

INSERT INTO people (name, birthdate, birthtime, birthdt)
VALUES('Padma', '1983-11-11', '10:07:35', '1983-11-11 10:07:35');

INSERT INTO people (name, birthdate, birthtime, birthdt)
VALUES('Larry', '1943-12-25', '16:10:42', '1943-12-25 16:10:42');

SELECT * FROM people;
-- +-------+------------+-----------+---------------------+
-- | name  | birthdate  | birthtime | birthdt             |
-- +-------+------------+-----------+---------------------+
-- | Padma | 1983-11-11 | 10:07:35  | 1983-11-11 10:07:35 |
-- | Larry | 1943-12-25 | 16:10:42  | 1943-12-25 16:10:42 |
-- +-------+------------+-----------+---------------------+
```

- `CURDATE()` - gives current date
- `CURTIME()` - gives current time
- `NOW()` - gives current datetime

```SQL
INSERT INTO people (name, birthdate, birthtime, birthdt)
VALUES('Toaster', CURDATE(), CURTIME(), NOW());

SELECT * FROM people;
-- +---------+------------+-----------+---------------------+
-- | name    | birthdate  | birthtime | birthdt             |
-- +---------+------------+-----------+---------------------+
-- | Padma   | 1983-11-11 | 10:07:35  | 1983-11-11 10:07:35 |
-- | Larry   | 1943-12-25 | 16:10:42  | 1943-12-25 16:10:42 |
-- | Toaster | 2019-04-26 | 08:15:03  | 2019-04-26 08:15:03 |
-- +---------+------------+-----------+---------------------+
```
