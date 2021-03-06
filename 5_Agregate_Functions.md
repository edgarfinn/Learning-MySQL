# Aggregate functions

Wikipedia definition:
> "In database management an aggregate function or aggregation function is a function where the values of multiple rows are grouped together to form a single summary value."

### `GROUP BY`

Summarises or aggregates identical data into single rows.

Notice below that there are multiple books released in years 2001 and 2003.

```SQL
SELECT released_year FROM books ORDER BY released_year;
-- +---------------+
-- | released_year |
-- +---------------+
-- |          1945 |
-- |          1981 |
-- |          1985 |
-- |          1989 |
-- |          1996 |
-- |          2000 |
-- |          2001 |
-- |          2001 |
-- |          2001 |
-- |          2003 |
-- |          2003 |
-- |          2004 |
-- |          2005 |
-- |          2010 |
-- |          2012 |
-- |          2013 |
-- |          2014 |
-- |          2016 |
-- |          2017 |
-- +---------------+
-- 19 rows in set (0.00 sec)
```

These `released_year` fields therefore make identical data that GROUP BY can group together (or "aggregate") and pass on to aggregate functions.

```SQL
SELECT released_year, COUNT(*) FROM books GROUP BY released_year;
-- +---------------+----------+
-- | released_year | COUNT(*) |
-- +---------------+----------+
-- |          1945 |        1 |
-- |          1981 |        1 |
-- |          1985 |        1 |
-- |          1989 |        1 |
-- |          1996 |        1 |
-- |          2000 |        1 |
-- |          2001 |        3 |
-- |          2003 |        2 |
-- |          2004 |        1 |
-- |          2005 |        1 |
-- |          2010 |        1 |
-- |          2012 |        1 |
-- |          2013 |        1 |
-- |          2014 |        1 |
-- |          2016 |        1 |
-- |          2017 |        1 |
-- +---------------+----------+
-- 16 rows in set (0.00 sec)

SELECT CONCAT('In ', released_year, ' ', COUNT(*), ' book(s) released') FROM books GROUP BY released_year;

-- +------------------------------------------------------------------+
-- | CONCAT('In ', released_year, ' ', COUNT(*), ' book(s) released') |
-- +------------------------------------------------------------------+
-- | In 1945 1 book(s) released                                       |
-- | In 1981 1 book(s) released                                       |
-- | In 1985 1 book(s) released                                       |
-- | In 1989 1 book(s) released                                       |
-- | In 1996 1 book(s) released                                       |
-- | In 2000 1 book(s) released                                       |
-- | In 2001 3 book(s) released                                       |
-- | In 2003 2 book(s) released                                       |
-- | In 2004 1 book(s) released                                       |
-- | In 2005 1 book(s) released                                       |
-- | In 2010 1 book(s) released                                       |
-- | In 2012 1 book(s) released                                       |
-- | In 2013 1 book(s) released                                       |
-- | In 2014 1 book(s) released                                       |
-- | In 2016 1 book(s) released                                       |
-- | In 2017 1 book(s) released                                       |
-- +------------------------------------------------------------------+
-- 16 rows in set (0.00 sec)
```
### Aggregate Functions
[Aggregate Functions](https://dev.mysql.com/doc/refman/8.0/en/group-by-functions.html) are able to perform logic on groups of data that have been aggregated by the `GROUP BY` clause.

### `MIN` and `MAX`

Identify minimum and maximum values in a set of values. It can be used directly on a table, or together with `GROUP BY`.

```SQL
SELECT MIN(released_year) FROM books;
-- +--------------------+
-- | MIN(released_year) |
-- +--------------------+
-- |               1945 |
-- +--------------------+
```

If you wanted to select a field that correlated to the MAX or MIN of a given field, chaining will result in a **incorrect** response:

The below syntax will just result with the lowest value in `one_field`, and the first-entry in the `another_field` column. The two will have no correlation.
- `SELECT MIN(one_field), another_field FROM table_name;`

For example, "The Namesake" is NOT the shortest book in the table, it is just the first one listed:
```SQL
-- INCORRECT:
SELECT MIN(pages), title FROM books;
-- +------------+--------------+
-- | MIN(pages) | title        |
-- +------------+--------------+
-- |        176 | The Namesake |
-- +------------+--------------+
-- 1 row in set (0.00 sec)
```

### Introduction to sub-queries.
One correct solution, would be to use a sub-query, whereby an inner query runs first, and passes the result to the outer query:

```SQL
SELECT title, pages FROM books where pages = (SELECT MIN(pages) from books);
-- +-----------------------------------------------------+-------+
-- | title                                               | pages |
-- +-----------------------------------------------------+-------+
-- | What We Talk About When We Talk About Love: Stories |   176 |
-- +-----------------------------------------------------+-------+
-- 1 row in set (0.01 sec)
```

The only problem with this query is **performance**, SQL is executing two queries, which - in a large table - could be slow.

A more efficient solution would be:
```SQL
SELECT title, pages FROM books ORDER BY pages ASC LIMIT 1;
-- +-----------------------------------------------------+-------+
-- | title                                               | pages |
-- +-----------------------------------------------------+-------+
-- | What We Talk About When We Talk About Love: Stories |   176 |
-- +-----------------------------------------------------+-------+
-- 1 row in set (0.00 sec)
```

Notice how even in a table of just 19 books, the execution time is 0.01 sec faster.

#### Using `MIN` and `MAX` with `GROUP BY`

#### Finding the most recent book released by a given author.

The relevant fields would be `title`, `author_fname`, `author_lname`, and `released_year`.

```SQL
SELECT title, author_fname, author_lname, released_year
FROM books
ORDER BY author_fname, author_lname, released_year DESC;
-- +-----------------------------------------------------+--------------+----------------+---------------+
-- | title                                               | author_fname | author_lname   | released_year |
-- +-----------------------------------------------------+--------------+----------------+---------------+
-- | 10% Happier                                         | Dan          | Harris         |          2014 |
-- | The Circle                                          | Dave         | Eggers         |          2013 |
-- | A Hologram for the King: A Novel                    | Dave         | Eggers         |          2012 |
-- | A Heartbreaking Work of Staggering Genius           | Dave         | Eggers         |          2001 |
-- | Consider the Lobster                                | David        | Foster Wallace |          2005 |
-- | Oblivion: Stories                                   | David        | Foster Wallace |          2004 |
-- | White Noise                                         | Don          | DeLillo        |          1985 |
-- | fake_book                                           | Freida       | Harris         |          2001 |
-- | Lincoln In The Bardo                                | George       | Saunders       |          2017 |
-- | The Namesake                                        | Jhumpa       | Lahiri         |          2003 |
-- | Interpreter of Maladies                             | Jhumpa       | Lahiri         |          1996 |
-- | Cannery Row                                         | John         | Steinbeck      |          1945 |
-- | The Amazing Adventures of Kavalier & Clay           | Michael      | Chabon         |          2000 |
-- | Norse Mythology                                     | Neil         | Gaiman         |          2016 |
-- | Coraline                                            | Neil         | Gaiman         |          2003 |
-- | American Gods                                       | Neil         | Gaiman         |          2001 |
-- | Just Kids                                           | Patti        | Smith          |          2010 |
-- | Where Im Calling From: Selected Stories             | Raymond      | Carver         |          1989 |
-- | What We Talk About When We Talk About Love: Stories | Raymond      | Carver         |          1981 |
-- +-----------------------------------------------------+--------------+----------------+---------------+
-- 19 rows in set (0.00 sec)
```

Using `GROUP BY`, you can group results into clusters of identical data (ie clusters of the different authors), and pass those results on to aggregate functions.

```SQL
SELECT title, author_fname, author_lname, MAX(released_year)
FROM books
GROUP BY author_lname, author_fname;
-- +-----------------------------------------------------+--------------+----------------+--------------------+
-- | title                                               | author_fname | author_lname   | MAX(released_year) |
-- +-----------------------------------------------------+--------------+----------------+--------------------+
-- | What We Talk About When We Talk About Love: Stories | Raymond      | Carver         |               1989 |
-- | The Amazing Adventures of Kavalier & Clay           | Michael      | Chabon         |               2000 |
-- | White Noise                                         | Don          | DeLillo        |               1985 |
-- | A Hologram for the King: A Novel                    | Dave         | Eggers         |               2013 |
-- | Oblivion: Stories                                   | David        | Foster Wallace |               2005 |
-- | Norse Mythology                                     | Neil         | Gaiman         |               2016 |
-- | 10% Happier                                         | Dan          | Harris         |               2014 |
-- | fake_book                                           | Freida       | Harris         |               2001 |
-- | The Namesake                                        | Jhumpa       | Lahiri         |               2003 |
-- | Lincoln In The Bardo                                | George       | Saunders       |               2017 |
-- | Just Kids                                           | Patti        | Smith          |               2010 |
-- | Cannery Row                                         | John         | Steinbeck      |               1945 |
-- +-----------------------------------------------------+--------------+----------------+--------------------+
-- 12 rows in set (0.00 sec)
```

#### Finding the longest book by an author.

Relevant information is `title`, `author_fname`, `author_lname` and `pages`.

```SQL
SELECT title, CONCAT(author_fname, ' ', author_lname) AS Name, pages FROM books;
-- +-----------------------------------------------------+----------------------+-------+
-- | title                                               | Name                 | pages |
-- +-----------------------------------------------------+----------------------+-------+
-- | The Namesake                                        | Jhumpa Lahiri        |   291 |
-- | Norse Mythology                                     | Neil Gaiman          |   304 |
-- | American Gods                                       | Neil Gaiman          |   465 |
-- | Interpreter of Maladies                             | Jhumpa Lahiri        |   198 |
-- | A Hologram for the King: A Novel                    | Dave Eggers          |   352 |
-- | The Circle                                          | Dave Eggers          |   504 |
-- | The Amazing Adventures of Kavalier & Clay           | Michael Chabon       |   634 |
-- | Just Kids                                           | Patti Smith          |   304 |
-- | A Heartbreaking Work of Staggering Genius           | Dave Eggers          |   437 |
-- | Coraline                                            | Neil Gaiman          |   208 |
-- | What We Talk About When We Talk About Love: Stories | Raymond Carver       |   176 |
-- | Where Im Calling From: Selected Stories             | Raymond Carver       |   526 |
-- | White Noise                                         | Don DeLillo          |   320 |
-- | Cannery Row                                         | John Steinbeck       |   181 |
-- | Oblivion: Stories                                   | David Foster Wallace |   329 |
-- | Consider the Lobster                                | David Foster Wallace |   343 |
-- | 10% Happier                                         | Dan Harris           |   256 |
-- | fake_book                                           | Freida Harris        |   428 |
-- | Lincoln In The Bardo                                | George Saunders      |   367 |
-- +-----------------------------------------------------+----------------------+-------+
-- 19 rows in set (0.00 sec)
```

By grouping author names, the `MAX` aggregate function will just return one result from each `GROUP BY` cluster:

```SQL
SELECT
  title,
  CONCAT(author_fname, ' ', author_lname) AS Author,
  MAX(pages) as 'Longest book'
FROM books
GROUP BY author_fname, author_lname;
-- +-----------------------------------------------------+----------------------+--------------+
-- | title                                               | Author               | Longest book |
-- +-----------------------------------------------------+----------------------+--------------+
-- | 10% Happier                                         | Dan Harris           |          256 |
-- | A Hologram for the King: A Novel                    | Dave Eggers          |          504 |
-- | Oblivion: Stories                                   | David Foster Wallace |          343 |
-- | White Noise                                         | Don DeLillo          |          320 |
-- | fake_book                                           | Freida Harris        |          428 |
-- | Lincoln In The Bardo                                | George Saunders      |          367 |
-- | The Namesake                                        | Jhumpa Lahiri        |          291 |
-- | Cannery Row                                         | John Steinbeck       |          181 |
-- | The Amazing Adventures of Kavalier & Clay           | Michael Chabon       |          634 |
-- | Norse Mythology                                     | Neil Gaiman          |          465 |
-- | Just Kids                                           | Patti Smith          |          304 |
-- | What We Talk About When We Talk About Love: Stories | Raymond Carver       |          526 |
-- +-----------------------------------------------------+----------------------+--------------+
-- 12 rows in set (0.00 sec)
```

### `SUM`
Returns a single value by adding together all values passed into it.

```SQL
SELECT SUM(1 + 3 + 5);
-- +----------------+
-- | SUM(1 + 3 + 5) |
-- +----------------+
-- |              9 |
-- +----------------+
-- 1 row in set (0.00 sec)
```

#### Finding the author who has written the most amount of pages in total.

```SQL
SELECT
  title,
  CONCAT(author_fname, author_lname) AS Author,
  SUM(pages) AS Pages
FROM books
GROUP BY author_fname, author_lname;
-- +-----------------------------------------------------+---------------------+-------+
-- | title                                               | Author              | Pages |
-- +-----------------------------------------------------+---------------------+-------+
-- | 10% Happier                                         | DanHarris           |   256 |
-- | A Hologram for the King: A Novel                    | DaveEggers          |  1293 |
-- | Oblivion: Stories                                   | DavidFoster Wallace |   672 |
-- | White Noise                                         | DonDeLillo          |   320 |
-- | fake_book                                           | FreidaHarris        |   428 |
-- | Lincoln In The Bardo                                | GeorgeSaunders      |   367 |
-- | The Namesake                                        | JhumpaLahiri        |   489 |
-- | Cannery Row                                         | JohnSteinbeck       |   181 |
-- | The Amazing Adventures of Kavalier & Clay           | MichaelChabon       |   634 |
-- | Norse Mythology                                     | NeilGaiman          |   977 |
-- | Just Kids                                           | PattiSmith          |   304 |
-- | What We Talk About When We Talk About Love: Stories | RaymondCarver       |   702 |
-- +-----------------------------------------------------+---------------------+-------+
-- 12 rows in set (0.00 sec)
```

Then in order to return just the author who has written the most pages, you can combine the above with either a sub-query, or an limited `ORDER BY` constraint:

```SQL
SELECT
  title,
  CONCAT(author_fname, author_lname) AS Author,
  SUM(pages) AS Pages
FROM books
GROUP BY author_fname, author_lname
ORDER BY Pages DESC LIMIT 1;
+----------------------------------+------------+-------+
| title                            | Author     | Pages |
+----------------------------------+------------+-------+
| A Hologram for the King: A Novel | DaveEggers |  1293 |
+----------------------------------+------------+-------+
1 row in set (0.00 sec)
```

### AVG

Returns the average value of a set of data, by adding the total values together, and dividing it by the number of values passed in.

#### Finding the average number of pages for the books in the table:

```SQL
SELECT AVG(pages) FROM books;
-- +------------+
-- | AVG(pages) |
-- +------------+
-- |   348.5789 |
-- +------------+
-- 1 row in set (0.00 sec)

-- By default the value returned has 4 decimal places.
```

Here, MySQL has added together the page counts of each book, and divided that total by the number of books.

To verify the result:

```SQL
SELECT SUM(pages) / COUNT(*) FROM books;
-- +-----------------------+
-- | SUM(pages) / COUNT(*) |
-- +-----------------------+
-- |              348.5789 |
-- +-----------------------+
-- 1 row in set (0.00 sec)
```

#### Calculate the **average** number of pages written by each author.
```SQL
SELECT author_fname, author_lname, AVG(pages) FROM books GROUP BY author_fname, author_lname;
-- +--------------+----------------+------------+
-- | author_fname | author_lname   | AVG(pages) |
-- +--------------+----------------+------------+
-- | Dan          | Harris         |   256.0000 |
-- | Dave         | Eggers         |   431.0000 |
-- | David        | Foster Wallace |   336.0000 |
-- | Don          | DeLillo        |   320.0000 |
-- | Freida       | Harris         |   428.0000 |
-- | George       | Saunders       |   367.0000 |
-- | Jhumpa       | Lahiri         |   244.5000 |
-- | John         | Steinbeck      |   181.0000 |
-- | Michael      | Chabon         |   634.0000 |
-- | Neil         | Gaiman         |   325.6667 |
-- | Patti        | Smith          |   304.0000 |
-- | Raymond      | Carver         |   351.0000 |
-- +--------------+----------------+------------+
-- 12 rows in set (0.00 sec)
```

### Some general examples:

#### Find the total number of books released each year.
```SQL
SELECT released_year, COUNT(*) FROM books GROUP BY released_year;
-- +---------------+----------+
-- | released_year | COUNT(*) |
-- +---------------+----------+
-- |          1945 |        1 |
-- |          1981 |        1 |
-- |          1985 |        1 |
-- |          1989 |        1 |
-- |          1996 |        1 |
-- |          2000 |        1 |
-- |          2001 |        3 |
-- |          2003 |        2 |
-- |          2004 |        1 |
-- |          2005 |        1 |
-- |          2010 |        1 |
-- |          2012 |        1 |
-- |          2013 |        1 |
-- |          2014 |        1 |
-- |          2016 |        1 |
-- |          2017 |        1 |
-- +---------------+----------+
-- 16 rows in set (0.00 sec)
```

#### Find the total number of books in stock
```SQL
SELECT SUM(stock_quantity) FROM books;
-- +---------------------+
-- | SUM(stock_quantity) |
-- +---------------------+
-- |                2450 |
-- +---------------------+
-- 1 row in set (0.00 sec)
```

#### Find the average released year for each author
```SQL
SELECT author_fname, author_lname, AVG(released_year)
FROM books
GROUP BY author_fname, author_lname;
-- +--------------+----------------+--------------------+
-- | author_fname | author_lname   | AVG(released_year) |
-- +--------------+----------------+--------------------+
-- | Dan          | Harris         |          2014.0000 |
-- | Dave         | Eggers         |          2008.6667 |
-- | David        | Foster Wallace |          2004.5000 |
-- | Don          | DeLillo        |          1985.0000 |
-- | Freida       | Harris         |          2001.0000 |
-- | George       | Saunders       |          2017.0000 |
-- | Jhumpa       | Lahiri         |          1999.5000 |
-- | John         | Steinbeck      |          1945.0000 |
-- | Michael      | Chabon         |          2000.0000 |
-- | Neil         | Gaiman         |          2006.6667 |
-- | Patti        | Smith          |          2010.0000 |
-- | Raymond      | Carver         |          1985.0000 |
-- +--------------+----------------+--------------------+
-- 12 rows in set (0.00 sec)
```
#### Find the full name of the author who wrote the longest book:

```SQL
-- LESS PERFORMANT METHOD BECAUSE OF TWO QUERIES
SELECT CONCAT(author_fname, ' ', author_lname) FROM books WHERE pages = (SELECT MAX(pages) FROM books);
-- +-----------------------------------------+
-- | CONCAT(author_fname, ' ', author_lname) |
-- +-----------------------------------------+
-- | Michael Chabon                          |
-- +-----------------------------------------+
-- 1 row in set (0.00 sec)

-- JUST ONE QUERY = QUICKER:
SELECT CONCAT_WS(' ', author_fname, author_lname) AS author, pages FROM books ORDER BY pages DESC LIMIT 1;  
-- +----------------+-------+
-- | author         | pages |
-- +----------------+-------+
-- | Michael Chabon |   634 |
-- +----------------+-------+
-- 1 row in set (0.00 sec)
```
#### Print columns: year, # books (number of books released), and avg pages (average number of pages per book for that year) in one query result:
```SQL
SELECT
  released_year AS year,
  COUNT(*) AS '# books',
  AVG(pages) AS 'avg pages'
FROM books
GROUP BY released_year;
-- +------+---------+-----------+
-- | year | # books | avg pages |
-- +------+---------+-----------+
-- | 1945 |       1 |  181.0000 |
-- | 1981 |       1 |  176.0000 |
-- | 1985 |       1 |  320.0000 |
-- | 1989 |       1 |  526.0000 |
-- | 1996 |       1 |  198.0000 |
-- | 2000 |       1 |  634.0000 |
-- | 2001 |       3 |  443.3333 |
-- | 2003 |       2 |  249.5000 |
-- | 2004 |       1 |  329.0000 |
-- | 2005 |       1 |  343.0000 |
-- | 2010 |       1 |  304.0000 |
-- | 2012 |       1 |  352.0000 |
-- | 2013 |       1 |  504.0000 |
-- | 2014 |       1 |  256.0000 |
-- | 2016 |       1 |  304.0000 |
-- | 2017 |       1 |  367.0000 |
-- +------+---------+-----------+
-- 16 rows in set (0.00 sec)
```
