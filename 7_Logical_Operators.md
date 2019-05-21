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
