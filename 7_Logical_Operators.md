# Logical Operators in MySQL


## Comparison Operators
[See documentation for more info](https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#operator_equal)

(Continuing with the example of the book shop database)

### Equals and Not Equals

- `=` is used to assert two values are equal.
- `!=` or `<>` are user to assert two values are *not* equal.

```SQL
SELECT title FROM books WHERE released_year = 2017;

SELECT title FROM books WHERE released_year != 2017;

SELECT title, author_lname FROM books;

SELECT title, author_lname FROM books WHERE author_lname = 'Harris';

SELECT title, author_lname FROM books WHERE author_lname != 'Harris';
```

### Like and Not Like

Recap on [Like Operator](https://github.com/edgarfinn/Learning-MySQL/blob/master/4_Refining_Selections.md#like)

```SQL
SELECT title FROM books WHERE title LIKE 'W%';
-- +-----------------------------------------------------+
-- | title                                               |
-- +-----------------------------------------------------+
-- | What We Talk About When We Talk About Love: Stories |
-- | Where I'm Calling From: Selected Stories            |
-- | White Noise                                         |
-- +-----------------------------------------------------+
-- 3 rows in set (0.01 sec)
```
`NOT LIKE` works exactly the same in opposite.

```SQL
SELECT title FROM books WHERE title NOT LIKE 'W%';
-- +-------------------------------------------+
-- | title                                     |
-- +-------------------------------------------+
-- | The Namesake                              |
-- | Norse Mythology                           |
-- | American Gods                             |
-- | Interpreter of Maladies                   |
-- | A Hologram for the King: A Novel          |
-- | The Circle                                |
-- | The Amazing Adventures of Kavalier & Clay |
-- | Just Kids                                 |
-- | A Heartbreaking Work of Staggering Genius |
-- | Coraline                                  |
-- | Cannery Row                               |
-- | Oblivion: Stories                         |
-- | Consider the Lobster                      |
-- | 10% Happier                               |
-- | fake_book                                 |
-- | Lincoln In The Bardo                      |
-- +-------------------------------------------+
-- 16 rows in set (0.00 sec)
```

### Greater than, greater than or equal to, less than, and less than or equal to.

- Greater than: `>`
- Greater than or equal to`>=`
- Less than `<`
- Less than or equal to `<=`

```SQL
SELECT title, stock_quantity FROM books WHERE stock_quantity >= 100;
-- +-------------------------------------------+----------------+
-- | title                                     | stock_quantity |
-- +-------------------------------------------+----------------+
-- | A Hologram for the King: A Novel          |            154 |
-- | A Heartbreaking Work of Staggering Genius |            104 |
-- | Coraline                                  |            100 |
-- | Oblivion: Stories                         |            172 |
-- | fake_book                                 |            287 |
-- | Lincoln In The Bardo                      |           1000 |
-- +-------------------------------------------+----------------+
-- 6 rows in set (0.00 sec)

SELECT title, stock_quantity FROM books WHERE stock_quantity <= 100;
-- +-----------------------------------------------------+----------------+
-- | title                                               | stock_quantity |
-- +-----------------------------------------------------+----------------+
-- | The Namesake                                        |             32 |
-- | Norse Mythology                                     |             43 |
-- | American Gods                                       |             12 |
-- | Interpreter of Maladies                             |             97 |
-- | The Circle                                          |             26 |
-- | The Amazing Adventures of Kavalier & Clay           |             68 |
-- | Just Kids                                           |             55 |
-- | Coraline                                            |            100 |
-- | What We Talk About When We Talk About Love: Stories |             23 |
-- | Where I'm Calling From: Selected Stories            |             12 |
-- | White Noise                                         |             49 |
-- | Cannery Row                                         |             95 |
-- | Consider the Lobster                                |             92 |
-- | 10% Happier                                         |             29 |
-- +-----------------------------------------------------+----------------+
-- 14 rows in set (0.00 sec)
```

Booleans are represented with `0` (false) and `1` (true)

```SQL
SELECT 99 > 1;
-- +--------+
-- | 99 > 1 |
-- +--------+
-- |      1 |
-- +--------+

-- 99 is greater than 1, so the response is "true" (or 1)
```

### Logical And `&&`

You can combine query constraints into one query using `&&` to chain them together.

```SQL
SELECT field FROM table WHERE some_condition && another_condition
```
or
```SQL
SELECT field FROM table WHERE some_condition AND another_condition
```

- Consider the below query in which you wish to select any books written by Eggers.

```SQL
SELECT title, author_lname, released_year FROM books WHERE author_lname='Eggers';
-- +-------------------------------------------+--------------+---------------+
-- | title                                     | author_lname | released_year |
-- +-------------------------------------------+--------------+---------------+
-- | A Hologram for the King: A Novel          | Eggers       |          2012 |
-- | The Circle                                | Eggers       |          2013 |
-- | A Heartbreaking Work of Staggering Genius | Eggers       |          2001 |
-- +-------------------------------------------+--------------+---------------+
-- 3 rows in set (0.00 sec)

```
Notice that the released_years of the results range from 2001 to 2013. If you wanted to select all books written by Eggers **that were also** released after 2010 you could use the logical operator to specify released year:

```SQL
SELECT title, author_lname, released_year FROM books WHERE author_lname='Eggers' && released_year > 2010;
-- +----------------------------------+--------------+---------------+
-- | title                            | author_lname | released_year |
-- +----------------------------------+--------------+---------------+
-- | A Hologram for the King: A Novel | Eggers       |          2012 |
-- | The Circle                       | Eggers       |          2013 |
-- +----------------------------------+--------------+---------------+
-- 2 rows in set (0.00 sec)
```

```SQL
SELECT * FROM books WHERE author_lname='Eggers' AND released_year > 2010 && title LIKE '%novel%';
-- +---------+----------------------------------+--------------+--------------+---------------+----------------+-------+
-- | book_id | title                            | author_fname | author_lname | released_year | stock_quantity | pages |
-- +---------+----------------------------------+--------------+--------------+---------------+----------------+-------+
-- |       5 | A Hologram for the King: A Novel | Dave         | Eggers       |          2012 |            154 |   352 |
-- +---------+----------------------------------+--------------+--------------+---------------+----------------+-------+
-- 1 row in set (0.00 sec)
```

### Logical OR operator

Similarly to `AND`, Logical `OR` operator allows you to broaden the scope of a query by adding extra acceptable constraints.


```SQL
SELECT field FROM table WHERE one_condition OR another_condition;
```
or

```SQL
SELECT field FROM table WHERE one_condition || another_condition;
```

```SQL
SELECT
  title,
  author_lname,
  released_year
FROM books
WHERE author_lname='Eggers' || released_year > 2010;
-- +-------------------------------------------+--------------+---------------+
-- | title                                     | author_lname | released_year |
-- +-------------------------------------------+--------------+---------------+
-- | Norse Mythology                           | Gaiman       |          2016 |
-- | A Hologram for the King: A Novel          | Eggers       |          2012 |
-- | The Circle                                | Eggers       |          2013 |
-- | A Heartbreaking Work of Staggering Genius | Eggers       |          2001 |
-- | 10% Happier                               | Harris       |          2014 |
-- | Lincoln In The Bardo                      | Saunders     |          2017 |
-- +-------------------------------------------+--------------+---------------+
-- 6 rows in set (0.00 sec)
```

As you can see the results are broader because acceptable results can have Eggers as the author's last name **or** the released year could be after 2010.

### `BETWEEN`

Allows you to set a range of values between which you with to target:

SELECT field FROM table WHERE field BETWEEN one_value AND another_value;

```SQL
SELECT title, released_year FROM books WHERE released_year BETWEEN 2004 AND 2015;
-- +----------------------------------+---------------+
-- | title                            | released_year |
-- +----------------------------------+---------------+
-- | A Hologram for the King: A Novel |          2012 |
-- | The Circle                       |          2013 |
-- | Just Kids                        |          2010 |
-- | Oblivion: Stories                |          2004 |
-- | Consider the Lobster             |          2005 |
-- | 10% Happier                      |          2014 |
-- +----------------------------------+---------------+
-- 6 rows in set (0.00 sec)
```

Essentially does the same as:

```SQL
SELECT title, released_year FROM books WHERE released_year >= 2004 && released_year <= 2015;
-- +----------------------------------+---------------+
-- | title                            | released_year |
-- +----------------------------------+---------------+
-- | A Hologram for the King: A Novel |          2012 |
-- | The Circle                       |          2013 |
-- | Just Kids                        |          2010 |
-- | Oblivion: Stories                |          2004 |
-- | Consider the Lobster             |          2005 |
-- | 10% Happier                      |          2014 |
-- +----------------------------------+---------------+
-- 6 rows in set (0.00 sec)
```

### `NOT BETWEEN`

Conversely, `NOT BETWEEN` will return all entries that fall **outside** of a given range:

```SQL
SELECT title, released_year FROM books WHERE released_year NOT BETWEEN 2004 AND 2015;
-- +-----------------------------------------------------+---------------+
-- | title                                               | released_year |
-- +-----------------------------------------------------+---------------+
-- | The Namesake                                        |          2003 |
-- | Norse Mythology                                     |          2016 |
-- | American Gods                                       |          2001 |
-- | Interpreter of Maladies                             |          1996 |
-- | The Amazing Adventures of Kavalier & Clay           |          2000 |
-- | A Heartbreaking Work of Staggering Genius           |          2001 |
-- | Coraline                                            |          2003 |
-- | What We Talk About When We Talk About Love: Stories |          1981 |
-- | Where I'm Calling From: Selected Stories            |          1989 |
-- | White Noise                                         |          1985 |
-- | Cannery Row                                         |          1945 |
-- | fake_book                                           |          2001 |
-- | Lincoln In The Bardo                                |          2017 |
-- +-----------------------------------------------------+---------------+
-- 13 rows in set (0.00 sec)
```

#### A note from mysql documentation:

> For best results when using BETWEEN with date or time values, use [CAST()](https://dev.mysql.com/doc/refman/8.0/en/cast-functions.html#function_cast) to explicitly convert the values to the desired data type. Examples: If you compare a DATETIME to two DATE values, convert the DATE values to DATETIME values. If you use a string constant such as '2001-1-1' in a comparison to a DATE, cast the string to a DATE.

So rather than:

```SQL
SELECT name, birthdt FROM people WHERE birthdt BETWEEN '1980-01-01' AND '2000-01-01';
```

....which should work, its safer to convert both of those date strings to `DATETIME` values, to ensure MySQL evaluates them appropriately:

```SQL
SELECT
    name,
    birthdt
FROM people
WHERE
    birthdt BETWEEN CAST('1980-01-01' AS DATETIME)
    AND CAST('2000-01-01' AS DATETIME);
```

### `IN`

Checks if a value matches any of a list of values:

`SELECT field FROM table WHERE field IN ('one value', 'another value', 'and another value')`

```SQL
SELECT title, author_lname FROM books WHERE author_lname IN ('Carver', 'Lahiri', 'Smith');
-- +-----------------------------------------------------+--------------+
-- | title                                               | author_lname |
-- +-----------------------------------------------------+--------------+
-- | The Namesake                                        | Lahiri       |
-- | Interpreter of Maladies                             | Lahiri       |
-- | Just Kids                                           | Smith        |
-- | What We Talk About When We Talk About Love: Stories | Carver       |
-- | Where I'm Calling From: Selected Stories            | Carver       |
-- +-----------------------------------------------------+--------------+
-- 5 rows in set (0.01 sec)
```

```SQL
SELECT title, released_year FROM books WHERE released_year IN (2017, 1985);                        
-- +----------------------+---------------+
-- | title                | released_year |
-- +----------------------+---------------+
-- | White Noise          |          1985 |
-- | Lincoln In The Bardo |          2017 |
-- +----------------------+---------------+
-- 2 rows in set (0.00 sec)
```

### `NOT IN`
Alternatively you can exclude rows from a query using `NOT IN`:
```SQL
SELECT title, author_lname FROM books WHERE author_lname NOT IN ('Carver', 'Lahiri', 'Smith');
-- +-------------------------------------------+----------------+
-- | title                                     | author_lname   |
-- +-------------------------------------------+----------------+
-- | Norse Mythology                           | Gaiman         |
-- | American Gods                             | Gaiman         |
-- | A Hologram for the King: A Novel          | Eggers         |
-- | The Circle                                | Eggers         |
-- | The Amazing Adventures of Kavalier & Clay | Chabon         |
-- | A Heartbreaking Work of Staggering Genius | Eggers         |
-- | Coraline                                  | Gaiman         |
-- | White Noise                               | DeLillo        |
-- | Cannery Row                               | Steinbeck      |
-- | Oblivion: Stories                         | Foster Wallace |
-- | Consider the Lobster                      | Foster Wallace |
-- | 10% Happier                               | Harris         |
-- | fake_book                                 | Harris         |
-- | Lincoln In The Bardo                      | Saunders       |
-- +-------------------------------------------+----------------+
-- 14 rows in set (0.00 sec)
```
```SQL
SELECT title, released_year FROM books WHERE released_year NOT IN (2017, 1985);
-- +-----------------------------------------------------+---------------+
-- | title                                               | released_year |
-- +-----------------------------------------------------+---------------+
-- | The Namesake                                        |          2003 |
-- | Norse Mythology                                     |          2016 |
-- | American Gods                                       |          2001 |
-- | Interpreter of Maladies                             |          1996 |
-- | A Hologram for the King: A Novel                    |          2012 |
-- | The Circle                                          |          2013 |
-- | The Amazing Adventures of Kavalier & Clay           |          2000 |
-- | Just Kids                                           |          2010 |
-- | A Heartbreaking Work of Staggering Genius           |          2001 |
-- | Coraline                                            |          2003 |
-- | What We Talk About When We Talk About Love: Stories |          1981 |
-- | Where I'm Calling From: Selected Stories            |          1989 |
-- | Cannery Row                                         |          1945 |
-- | Oblivion: Stories                                   |          2004 |
-- | Consider the Lobster                                |          2005 |
-- | 10% Happier                                         |          2014 |
-- | fake_book                                           |          2001 |
-- +-----------------------------------------------------+---------------+
-- 17 rows in set (0.00 sec)
```

### Modulo (`%`)

The Modulo operator returns the remainder of the division of one number by another.
for example:
```SQL
5 % 2
-- would return 1, because 2 fits in 5 twice with a remainder of 1.
```

As such you can use the modulo operator to identify odd or even numbers:

Find books released on an odd-numbered year:
```SQL
SELECT title, released_year FROM books WHERE released_year % 2 != 0;
-- +-----------------------------------------------------+---------------+
-- | title                                               | released_year |
-- +-----------------------------------------------------+---------------+
-- | The Namesake                                        |          2003 |
-- | American Gods                                       |          2001 |
-- | The Circle                                          |          2013 |
-- | A Heartbreaking Work of Staggering Genius           |          2001 |
-- | Coraline                                            |          2003 |
-- | What We Talk About When We Talk About Love: Stories |          1981 |
-- | Where I'm Calling From: Selected Stories            |          1989 |
-- | White Noise                                         |          1985 |
-- | Cannery Row                                         |          1945 |
-- | Consider the Lobster                                |          2005 |
-- | fake_book                                           |          2001 |
-- | Lincoln In The Bardo                                |          2017 |
-- +-----------------------------------------------------+---------------+
-- 12 rows in set (0.00 sec)
```

Or find books released on an even-numbered year:
```SQL
SELECT title, released_year FROM books WHERE released_year % 2 = 0;
-- +-------------------------------------------+---------------+
-- | title                                     | released_year |
-- +-------------------------------------------+---------------+
-- | Norse Mythology                           |          2016 |
-- | Interpreter of Maladies                   |          1996 |
-- | A Hologram for the King: A Novel          |          2012 |
-- | The Amazing Adventures of Kavalier & Clay |          2000 |
-- | Just Kids                                 |          2010 |
-- | Oblivion: Stories                         |          2004 |
-- | 10% Happier                               |          2014 |
-- +-------------------------------------------+---------------+
-- 7 rows in set (0.00 sec)
```

### `CASE`

Returns a new specified value when a certain case is met, and optionally assign that specified value to an identifier:

```SQL
SELECT field
  CASE
    WHEN condition_a THEN condition_a_value
    WHEN condition_b THEN condition_b_value
    ELSE a_final_catchall_value
  END AS value_identifier

FROM table;
```

For example:

```SQL
SELECT title, stock_quantity,
    CASE
        WHEN stock_quantity BETWEEN 0 AND 50 THEN '*'
        WHEN stock_quantity BETWEEN 51 AND 100 THEN '**'
        ELSE '***'
    END AS STOCK
FROM books;
-- +-----------------------------------------------------+----------------+-------+
-- | title                                               | stock_quantity | STOCK |
-- +-----------------------------------------------------+----------------+-------+
-- | The Namesake                                        |             32 | *     |
-- | Norse Mythology                                     |             43 | *     |
-- | American Gods                                       |             12 | *     |
-- | Interpreter of Maladies                             |             97 | **    |
-- | A Hologram for the King: A Novel                    |            154 | ***   |
-- | The Circle                                          |             26 | *     |
-- | The Amazing Adventures of Kavalier & Clay           |             68 | **    |
-- | Just Kids                                           |             55 | **    |
-- | A Heartbreaking Work of Staggering Genius           |            104 | ***   |
-- | Coraline                                            |            100 | **    |
-- | What We Talk About When We Talk About Love: Stories |             23 | *     |
-- | Where I'm Calling From: Selected Stories            |             12 | *     |
-- | White Noise                                         |             49 | *     |
-- | Cannery Row                                         |             95 | **    |
-- | Oblivion: Stories                                   |            172 | ***   |
-- | Consider the Lobster                                |             92 | **    |
-- | 10% Happier                                         |             29 | *     |
-- | fake_book                                           |            287 | ***   |
-- | Lincoln In The Bardo                                |           1000 | ***   |
-- +-----------------------------------------------------+----------------+-------+
-- 19 rows in set (0.00 sec)
```
