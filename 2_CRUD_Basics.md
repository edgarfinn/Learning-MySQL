# CRUD Basics (Create, Read, Update, Delete)

## CREATE
Review of Creating data here:
  - [Adding Data To Tables](https://github.com/edgarfinn/Learning-MySQL/blob/master/1_Creating_tables_and_inserting_data.md#adding-data-to-tables-insert)

## READ

- `SELECT` is used to read information from a table.

- The `*` character can be used to denote all columns from a table:

```sql
SELECT * FROM cats;

-- alternatively you can specify any number and combination of columns
-- and in any order:
SELECT name FROM cats;

SELECT age FROM cats;

SELECT cat_id FROM cats;

SELECT name, age FROM cats;

SELECT cat_id, name, age FROM cats;

SELECT age, breed, name, cat_id FROM cats;

SELECT cat_id, name, age, breed FROM cats;
```

### Specify conditions for queries with the `WHERE` keyword:

The WHERE keyword can be used to specify particular conditions for the data you want to target.
Its not unique to READing, it can also be used for updating, deleting etc... too)

Select by age or name:

`SELECT * FROM cats WHERE age=4;`

`SELECT * FROM cats WHERE name='Egg';`

Strings by default are not case sensitive:

`SELECT * FROM cats WHERE name='egG';`

You can also specify conditions for queries based on relationships between columns:


Select only cats where they have the same age as their `cat_id` number:

`SELECT cat_id, age FROM cats WHERE cat_id=age;`

### Relabel column names with the `AS` keyword:

`SELECT column_name AS alias_name FROM cats;`

eg:
Select `cat_id` and `name` from cats, and relabel `cat_id` to `id`:

`SELECT cat_id AS id, name FROM cats;`

Select `name` and `breed` from cats and rename them respectively as `cat name` and `kitty breed`
`SELECT name AS 'cat name', breed AS 'kitty breed' FROM cats;`


## UPDATE
Updating existing sets of data is done using the `UPDATE` and `SET` keywords:

`UPDATE table_name SET column_name='value' WHERE [some condition]`;

For example:

`UPDATE cats SET age=14 WHERE name='Misty';`

`UPDATE cats SET breed='Shorthair' WHERE breed='Tabby';`

BE CAREFUL, there's no undo button, so its good practise to `SELECT` the data you want to update first, before then running an `UPDATE` on it.

```SQL
$> SELECT * FROM cats WHERE name='Jackson';
-- +--------+---------+--------+------+
-- | cat_id | name    | breed  | age  |
-- +--------+---------+--------+------+
-- |      7 | Jackson | Sphynx |    7 |
-- +--------+---------+--------+------+

$> UPDATE cats SET name='Jack' WHERE name='Jackson';
-- Query OK, 1 row affected (0.01 sec)
-- Rows matched: 1  Changed: 1  Warnings: 0

$> SELECT * FROM cats WHERE name='Jackson';
-- Empty set (0.00 sec)

$> SELECT * FROM cats WHERE name='Jack';
-- +--------+------+--------+------+
-- | cat_id | name | breed  | age  |
-- +--------+------+--------+------+
-- |      7 | Jack | Sphynx |    7 |
-- +--------+------+--------+------+
-- 1 row in set (0.01 sec)

$> SELECT * FROM cats WHERE name='Ringo';
-- +--------+-------+-------+------+
-- | cat_id | name  | breed | age  |
-- +--------+-------+-------+------+
-- |      1 | Ringo | Tabby |    4 |
-- +--------+-------+-------+------+
-- 1 row in set (0.00 sec)

$> UPDATE cats SET breed='Shorthair' WHERE name='Ringo';
-- Query OK, 1 row affected (0.01 sec)
-- Rows matched: 1  Changed: 1  Warnings: 0

$> SELECT * FROM cats WHERE name='Ringo';
-- +--------+-------+-----------+------+
-- | cat_id | name  | breed     | age  |
-- +--------+-------+-----------+------+
-- |      1 | Ringo | Shorthair |    4 |
-- +--------+-------+-----------+------+
-- 1 row in set (0.00 sec)

$> SELECT * FROM cats WHERE breed='Maine Coon';
-- +--------+------------+------------+------+
-- | cat_id | name       | breed      | age  |
-- +--------+------------+------------+------+
-- |      2 | Cindy      | Maine Coon |   10 |
-- |      3 | Dumbledore | Maine Coon |   11 |
-- +--------+------------+------------+------+
-- 2 rows in set (0.00 sec)

$> UPDATE cats SET age=12 WHERE breed='Maine Coon';
-- Query OK, 2 rows affected (0.01 sec)
-- Rows matched: 2  Changed: 2  Warnings: 0

SELECT * FROM cats WHERE breed='Maine Coon';
-- +--------+------------+------------+------+
-- | cat_id | name       | breed      | age  |
-- +--------+------------+------------+------+
-- |      2 | Cindy      | Maine Coon |   12 |
-- |      3 | Dumbledore | Maine Coon |   12 |
-- +--------+------------+------------+------+
```


## DELETE

DELETE entries in a table using the `DELETE` keyword. As with UPDATE, make sure you SELECT the data first to ensure you're targeting the right entries.

Syntax:

`DELETE FROM table_name WHERE [some condition];`

For example:

```sql
SELECT * FROM cats;
-- +--------+----------------+------------+------+
-- | cat_id | name           | breed      | age  |
-- +--------+----------------+------------+------+
-- |      1 | Ringo          | Shorthair  |    4 |
-- |      2 | Cindy          | Maine Coon |   12 |
-- |      3 | Dumbledore     | Maine Coon |   12 |
-- |      4 | Egg            | Persian    |    4 |
-- |      5 | Misty          | Tabby      |   13 |
-- |      6 | George Michael | Ragdoll    |    9 |
-- |      7 | Jack           | Sphynx     |    7 |
-- +--------+----------------+------------+------+

SELECT * FROM cats WHERE name='egg';
-- +--------+------+---------+------+
-- | cat_id | name | breed   | age  |
-- +--------+------+---------+------+
-- |      4 | Egg  | Persian |    4 |
-- +--------+------+---------+------+

DELETE FROM cats WHERE name='egg';
-- Query OK, 1 row affected (0.01 sec)

SELECT * FROM cats WHERE name='egg';                                                                    
-- Empty set (0.00 sec)

SELECT * FROM cats;
-- +--------+----------------+------------+------+
-- | cat_id | name           | breed      | age  |
-- +--------+----------------+------------+------+
-- |      1 | Ringo          | Shorthair  |    4 |
-- |      2 | Cindy          | Maine Coon |   12 |
-- |      3 | Dumbledore     | Maine Coon |   12 |
-- |      5 | Misty          | Tabby      |   13 |
-- |      6 | George Michael | Ragdoll    |    9 |
-- |      7 | Jack           | Sphynx     |    7 |
-- +--------+----------------+------------+------+
```

*IMPORTANT:* Notice how the auto-incremented cat_id column behaves when a line is deleted. All cat_ids remain the same as before, there just becomes a gap in the numbers.

BE CAREFUL, if you don't use a `WHERE` condition, you may delete all entries in the table!

`DELETE FROM cats;` will delete **all** entries into `cats`.

```sql
$> DELETE FROM cats;
Query OK, 4 rows affected (0.00 sec)

$> SELECT * FROM cats;                                                                                     
Empty set (0.00 sec)
```
