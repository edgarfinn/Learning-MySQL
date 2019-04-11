# Refining `SELECT`ions

### `DISTINCT`

Removes any duplicates from `SELECT` results.

```SQL
-- you may get duplicates of the same value from some SELECTs
SELECT author_lname FROM books;
-- +----------------+
-- | author_lname   |
-- +----------------+
-- | Lahiri         |
-- | Gaiman         |
-- | Gaiman         |
-- | Lahiri         |
-- | Eggers         |
-- | Eggers         |
-- | Chabon         |
-- | Smith          |
-- | Eggers         |
-- | Gaiman         |
-- | Carver         |
-- | Carver         |
-- | DeLillo        |
-- | Steinbeck      |
-- | Foster Wallace |
-- | Foster Wallace |
-- | Harris         |
-- | Harris         |
-- | Saunders       |
-- +----------------+

-- Whereas DISTINCT will only return one of each duplicate:
SELECT DISTINCT author_lname FROM books;
-- +----------------+
-- | author_lname   |
-- +----------------+
-- | Lahiri         |
-- | Gaiman         |
-- | Eggers         |
-- | Chabon         |
-- | Smith          |
-- | Carver         |
-- | DeLillo        |
-- | Steinbeck      |
-- | Foster Wallace |
-- | Harris         |
-- | Saunders       |
-- +----------------+

SELECT COUNT(released_year) FROM books;                                                                
-- +----------------------+
-- | COUNT(released_year) |
-- +----------------------+
-- |                   19 |
-- +----------------------+

SELECT COUNT(DISTINCT released_year) FROM books;                                                        
-- +-------------------------------+
-- | COUNT(DISTINCT released_year) |
-- +-------------------------------+
-- |                            16 |
-- +-------------------------------+
```

#### A more advanced way of using distinct:

You may want to apply the unique filter across rows, rather than values.

Consider the below table, which contains:
  - some duplicates of the same author (eg: Neil Gaiman, Raymond Carver etc...)
  BUT ALSO
  - *duplicate* surnames, across **multiple** authors (eg Dan Harris and Freida Harris share the same surname)

```SQL
SELECT author_fname, author_lname FROM books;
-- +--------------+----------------+
-- | author_fname | author_lname   |
-- +--------------+----------------+
-- | Jhumpa       | Lahiri         |
-- | Neil         | Gaiman         |
-- | Neil         | Gaiman         |
-- | Jhumpa       | Lahiri         |
-- | Dave         | Eggers         |
-- | Dave         | Eggers         |
-- | Michael      | Chabon         |
-- | Patti        | Smith          |
-- | Dave         | Eggers         |
-- | Neil         | Gaiman         |
-- | Raymond      | Carver         |
-- | Raymond      | Carver         |
-- | Don          | DeLillo        |
-- | John         | Steinbeck      |
-- | David        | Foster Wallace |
-- | David        | Foster Wallace |
-- | Dan          | Harris         |
-- | Freida       | Harris         |
-- | George       | Saunders       |
-- +--------------+----------------+
```

There are 12 different authors in this table, but only 11 different surnames, as two authors share the same surname. But just running `DISTINCT` on the `author_lname` column will filter out authors that share a surname, returning only 11 results.

```SQL
SELECT DISTINCT author_lname FROM books;
-- +----------------+
-- | author_lname   |
-- +----------------+
-- | Lahiri         |
-- | Gaiman         |
-- | Eggers         |
-- | Chabon         |
-- | Smith          |
-- | Carver         |
-- | DeLillo        |
-- | Steinbeck      |
-- | Foster Wallace |
-- | Harris         |
-- | Saunders       |
-- +----------------+
-- 11 rows in set (0.00 sec)
```

SOLUTION:

```SQL
-- SELECT DISTINCT author_fname, author_lname FROM books;
-- +--------------+----------------+
-- | author_fname | author_lname   |
-- +--------------+----------------+
-- | Jhumpa       | Lahiri         |
-- | Neil         | Gaiman         |
-- | Dave         | Eggers         |
-- | Michael      | Chabon         |
-- | Patti        | Smith          |
-- | Raymond      | Carver         |
-- | Don          | DeLillo        |
-- | John         | Steinbeck      |
-- | David        | Foster Wallace |
-- | Dan          | Harris         |
-- | Freida       | Harris         |
-- | George       | Saunders       |
-- +--------------+----------------+
-- 12 rows in set (0.00 sec)
```

Notice there are now 12 results, as there are 12 distinct authors, even though two share a surname.

### `ORDER BY`

Orders results by the specified value (ie column_name)

NB: Works equally for letters and nummbers

Syntax:

`SELECT column_name[s] FROM table_name ORDER BY column_name;`

`SELECT column_name[s] FROM table_name ORDER BY column_name DESC;`

`SELECT column_name[s] FROM table_name ORDER BY column_name ASC;`

The column used in `ORDER BY` doesnt have to be present in the `SELECT` query:

`SELECT column_a FROM table_name ORDER BY column_b`;

```SQL
SELECT title FROM books;
-- +-----------------------------------------------------+
-- | title                                               |
-- +-----------------------------------------------------+
-- | The Namesake                                        |
-- | Norse Mythology                                     |
-- | American Gods                                       |
-- | Interpreter of Maladies                             |
-- | A Hologram for the King: A Novel                    |
-- | The Circle                                          |
-- | The Amazing Adventures of Kavalier & Clay           |
-- | Just Kids                                           |
-- | A Heartbreaking Work of Staggering Genius           |
-- | Coraline                                            |
-- | What We Talk About When We Talk About Love: Stories |
-- | Where Im Calling From: Selected Stories             |
-- | White Noise                                         |
-- | Cannery Row                                         |
-- | Oblivion: Stories                                   |
-- | Consider the Lobster                                |
-- | 10% Happier                                         |
-- | fake_book                                           |
-- | Lincoln In The Bardo                                |
-- +-----------------------------------------------------+

SELECT title FROM books ORDER BY title;
-- +-----------------------------------------------------+
-- | title                                               |
-- +-----------------------------------------------------+
-- | 10% Happier                                         |
-- | A Heartbreaking Work of Staggering Genius           |
-- | A Hologram for the King: A Novel                    |
-- | American Gods                                       |
-- | Cannery Row                                         |
-- | Consider the Lobster                                |
-- | Coraline                                            |
-- | fake_book                                           |
-- | Interpreter of Maladies                             |
-- | Just Kids                                           |
-- | Lincoln In The Bardo                                |
-- | Norse Mythology                                     |
-- | Oblivion: Stories                                   |
-- | The Amazing Adventures of Kavalier & Clay           |
-- | The Circle                                          |
-- | The Namesake                                        |
-- | What We Talk About When We Talk About Love: Stories |
-- | Where Im Calling From: Selected Stories             |
-- | White Noise                                         |
-- +-----------------------------------------------------+

SELECT title FROM books ORDER BY title DESC;
-- +-----------------------------------------------------+
-- | title                                               |
-- +-----------------------------------------------------+
-- | White Noise                                         |
-- | Where Im Calling From: Selected Stories             |
-- | What We Talk About When We Talk About Love: Stories |
-- | The Namesake                                        |
-- | The Circle                                          |
-- | The Amazing Adventures of Kavalier & Clay           |
-- | Oblivion: Stories                                   |
-- | Norse Mythology                                     |
-- | Lincoln In The Bardo                                |
-- | Just Kids                                           |
-- | Interpreter of Maladies                             |
-- | fake_book                                           |
-- | Coraline                                            |
-- | Consider the Lobster                                |
-- | Cannery Row                                         |
-- | American Gods                                       |
-- | A Hologram for the King: A Novel                    |
-- | A Heartbreaking Work of Staggering Genius           |
-- | 10% Happier                                         |
-- +-----------------------------------------------------+

SELECT title FROM books ORDER BY author_lname;
-- +-----------------------------------------------------+
-- | title                                               |
-- +-----------------------------------------------------+
-- | Where Im Calling From: Selected Stories             |
-- | What We Talk About When We Talk About Love: Stories |
-- | The Amazing Adventures of Kavalier & Clay           |
-- | White Noise                                         |
-- | A Hologram for the King: A Novel                    |
-- | The Circle                                          |
-- | A Heartbreaking Work of Staggering Genius           |
-- | Oblivion: Stories                                   |
-- | Consider the Lobster                                |
-- | Coraline                                            |
-- | American Gods                                       |
-- | Norse Mythology                                     |
-- | fake_book                                           |
-- | 10% Happier                                         |
-- | The Namesake                                        |
-- | Interpreter of Maladies                             |
-- | Lincoln In The Bardo                                |
-- | Just Kids                                           |
-- | Cannery Row                                         |
-- +-----------------------------------------------------+
-- 19 rows in set (0.00 sec)
```

You can also specify which `SELECT`ed column you want to `ODRER BY`, by specifying the column's index in the `SELECT`ion:

```SQL
SELECT title, released_year, pages FROM books ORDER BY 2;
-- +-----------------------------------------------------+---------------+-------+
-- | title                                               | released_year | pages |
-- +-----------------------------------------------------+---------------+-------+
-- | Cannery Row                                         |          1945 |   181 |
-- | What We Talk About When We Talk About Love: Stories |          1981 |   176 |
-- | White Noise                                         |          1985 |   320 |
-- | Where Im Calling From: Selected Stories             |          1989 |   526 |
-- | Interpreter of Maladies                             |          1996 |   198 |
-- | The Amazing Adventures of Kavalier & Clay           |          2000 |   634 |
-- | American Gods                                       |          2001 |   465 |
-- | fake_book                                           |          2001 |   428 |
-- | A Heartbreaking Work of Staggering Genius           |          2001 |   437 |
-- | The Namesake                                        |          2003 |   291 |
-- | Coraline                                            |          2003 |   208 |
-- | Oblivion: Stories                                   |          2004 |   329 |
-- | Consider the Lobster                                |          2005 |   343 |
-- | Just Kids                                           |          2010 |   304 |
-- | A Hologram for the King: A Novel                    |          2012 |   352 |
-- | The Circle                                          |          2013 |   504 |
-- | 10% Happier                                         |          2014 |   256 |
-- | Norse Mythology                                     |          2016 |   304 |
-- | Lincoln In The Bardo                                |          2017 |   367 |
-- +-----------------------------------------------------+---------------+-------+

SELECT title, released_year, pages FROM books ORDER BY 3;
-- +-----------------------------------------------------+---------------+-------+
-- | title                                               | released_year | pages |
-- +-----------------------------------------------------+---------------+-------+
-- | What We Talk About When We Talk About Love: Stories |          1981 |   176 |
-- | Cannery Row                                         |          1945 |   181 |
-- | Interpreter of Maladies                             |          1996 |   198 |
-- | Coraline                                            |          2003 |   208 |
-- | 10% Happier                                         |          2014 |   256 |
-- | The Namesake                                        |          2003 |   291 |
-- | Just Kids                                           |          2010 |   304 |
-- | Norse Mythology                                     |          2016 |   304 |
-- | White Noise                                         |          1985 |   320 |
-- | Oblivion: Stories                                   |          2004 |   329 |
-- | Consider the Lobster                                |          2005 |   343 |
-- | A Hologram for the King: A Novel                    |          2012 |   352 |
-- | Lincoln In The Bardo                                |          2017 |   367 |
-- | fake_book                                           |          2001 |   428 |
-- | A Heartbreaking Work of Staggering Genius           |          2001 |   437 |
-- | American Gods                                       |          2001 |   465 |
-- | The Circle                                          |          2013 |   504 |
-- | Where Im Calling From: Selected Stories             |          1989 |   526 |
-- | The Amazing Adventures of Kavalier & Clay           |          2000 |   634 |
-- +-----------------------------------------------------+---------------+-------+
```

You can also `ORDER BY` multiple columns:

`SELECT column_a, column_b, column_c FROM table_name ORDER BY column_b, column_c;`

```SQL
SELECT title, released_year, pages FROM books ORDER BY released_year, pages;
-- +-----------------------------------------------------+---------------+-------+
-- | title                                               | released_year | pages |
-- +-----------------------------------------------------+---------------+-------+
-- | Cannery Row                                         |          1945 |   181 |
-- | What We Talk About When We Talk About Love: Stories |          1981 |   176 |
-- | White Noise                                         |          1985 |   320 |
-- | Where Im Calling From: Selected Stories             |          1989 |   526 |
-- | Interpreter of Maladies                             |          1996 |   198 |
-- | The Amazing Adventures of Kavalier & Clay           |          2000 |   634 |
-- | fake_book                                           |          2001 |   428 |
-- | A Heartbreaking Work of Staggering Genius           |          2001 |   437 |
-- | American Gods                                       |          2001 |   465 |
-- | Coraline                                            |          2003 |   208 |
-- | The Namesake                                        |          2003 |   291 |
-- | Oblivion: Stories                                   |          2004 |   329 |
-- | Consider the Lobster                                |          2005 |   343 |
-- | Just Kids                                           |          2010 |   304 |
-- | A Hologram for the King: A Novel                    |          2012 |   352 |
-- | The Circle                                          |          2013 |   504 |
-- | 10% Happier                                         |          2014 |   256 |
-- | Norse Mythology                                     |          2016 |   304 |
-- | Lincoln In The Bardo                                |          2017 |   367 |
-- +-----------------------------------------------------+---------------+-------+
```

### `LIMIT`
Restricts the number of results returned.

```SQL
SELECT column FROM table LIMIT nResults;
-- where nResults = the number of results you want

SELECT column FROM table LIMIT nFrom, nResults;
-- where nFrom = the index of the results list from which you want the limit to start
```

Example:
```SQL
SELECT title FROM books LIMIT 7;
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
-- +-------------------------------------------+

SELECT title FROM books LIMIT 2, 7;
-- +-------------------------------------------+
-- | title                                     |
-- +-------------------------------------------+
-- | American Gods                             |
-- | Interpreter of Maladies                   |
-- | A Hologram for the King: A Novel          |
-- | The Circle                                |
-- | The Amazing Adventures of Kavalier & Clay |
-- | Just Kids                                 |
-- | A Heartbreaking Work of Staggering Genius |
-- +-------------------------------------------+
```

`LIMIT` is usually most effective when combined with other refinements such as `ORDER BY`.

For example, to get the 5 most recent books:

```SQL
SELECT title, released_year FROM books ORDER BY released_year DESC;
-- +-----------------------------------------------------+---------------+
-- | title                                               | released_year |
-- +-----------------------------------------------------+---------------+
-- | Lincoln In The Bardo                                |          2017 |
-- | Norse Mythology                                     |          2016 |
-- | 10% Happier                                         |          2014 |
-- | The Circle                                          |          2013 |
-- | A Hologram for the King: A Novel                    |          2012 |
-- | Just Kids                                           |          2010 |
-- | Consider the Lobster                                |          2005 |
-- | Oblivion: Stories                                   |          2004 |
-- | Coraline                                            |          2003 |
-- | The Namesake                                        |          2003 |
-- | fake_book                                           |          2001 |
-- | American Gods                                       |          2001 |
-- | A Heartbreaking Work of Staggering Genius           |          2001 |
-- | The Amazing Adventures of Kavalier & Clay           |          2000 |
-- | Interpreter of Maladies                             |          1996 |
-- | Where Im Calling From: Selected Stories             |          1989 |
-- | White Noise                                         |          1985 |
-- | What We Talk About When We Talk About Love: Stories |          1981 |
-- | Cannery Row                                         |          1945 |
-- +-----------------------------------------------------+---------------+
-- 19 rows in set (0.01 sec)

SELECT title, released_year FROM books ORDER BY released_year DESC LIMIT 5;
-- +----------------------------------+---------------+
-- | title                            | released_year |
-- +----------------------------------+---------------+
-- | Lincoln In The Bardo             |          2017 |
-- | Norse Mythology                  |          2016 |
-- | 10% Happier                      |          2014 |
-- | The Circle                       |          2013 |
-- | A Hologram for the King: A Novel |          2012 |
-- +----------------------------------+---------------+
```

Or to just get the 2nd and 3rd most recent books:

```sql
SELECT title, released_year FROM books ORDER BY released_year DESC LIMIT 1, 2;
-- +-----------------+---------------+
-- | title           | released_year |
-- +-----------------+---------------+
-- | Norse Mythology |          2016 |
-- | 10% Happier     |          2014 |
-- +-----------------+---------------+
```

If you want to list results from some results position to the end of the list, MySQL's official advice is to just provide a random long number (!?) :scream:

```SQL
SELECT title, released_year FROM books ORDER BY released_year DESC LIMIT 8, 9685645456;
-- +-----------------------------------------------------+---------------+
-- | title                                               | released_year |
-- +-----------------------------------------------------+---------------+
-- | Coraline                                            |          2003 |
-- | The Namesake                                        |          2003 |
-- | fake_book                                           |          2001 |
-- | American Gods                                       |          2001 |
-- | A Heartbreaking Work of Staggering Genius           |          2001 |
-- | The Amazing Adventures of Kavalier & Clay           |          2000 |
-- | Interpreter of Maladies                             |          1996 |
-- | Where Im Calling From: Selected Stories             |          1989 |
-- | White Noise                                         |          1985 |
-- | What We Talk About When We Talk About Love: Stories |          1981 |
-- | Cannery Row                                         |          1945 |
-- +-----------------------------------------------------+---------------+
```

### `LIKE`

`LIKE` allows you to implement wildcards in a search, using `%` or `_` (underscore) to denote the wildcard(s).

- `%` allows any number of characters within that wildcard.

- `_` will allow only 1 character within that wildcard.

Syntax:

`SELECT column FROM table WHERE column LIKE '% grepValue %';`

Example:

```SQL
SELECT title FROM books WHERE title LIKE '%the%';
-- +-------------------------------------------+
-- | title                                     |
-- +-------------------------------------------+
-- | The Namesake                              |
-- | A Hologram for the King: A Novel          |
-- | The Circle                                |
-- | The Amazing Adventures of Kavalier & Clay |
-- | Consider the Lobster                      |
-- | Lincoln In The Bardo                      |
-- +-------------------------------------------+
```

Note that if you put wildcard symbols on both ends of the search value, the search will permit results with text on either side of the search value.

For example, if you wanted to search an author was either dave or dan (or something starting with "da"):

```SQL
SELECT title, author_fname, author_lname FROM books WHERE author_fname LIKE '%da%';
-- +-------------------------------------------+--------------+----------------+
-- | title                                     | author_fname | author_lname   |
-- +-------------------------------------------+--------------+----------------+
-- | A Hologram for the King: A Novel          | Dave         | Eggers         |
-- | The Circle                                | Dave         | Eggers         |
-- | A Heartbreaking Work of Staggering Genius | Dave         | Eggers         |
-- | Oblivion: Stories                         | David        | Foster Wallace |
-- | Consider the Lobster                      | David        | Foster Wallace |
-- | 10% Happier                               | Dan          | Harris         |
-- | fake_book                                 | Freida       | Harris         |
-- +-------------------------------------------+--------------+----------------+
-- 7 rows in set (0.00 sec)
```

Notice `Freida Harris` appears in the above result, so by removing the first `%`, you can refine the result to only authors who's names **begin** with 'da'.

```SQL
SELECT title, author_fname, author_lname FROM books WHERE author_fname LIKE 'da%';
-- +-------------------------------------------+--------------+----------------+
-- | title                                     | author_fname | author_lname   |
-- +-------------------------------------------+--------------+----------------+
-- | A Hologram for the King: A Novel          | Dave         | Eggers         |
-- | The Circle                                | Dave         | Eggers         |
-- | A Heartbreaking Work of Staggering Genius | Dave         | Eggers         |
-- | Oblivion: Stories                         | David        | Foster Wallace |
-- | Consider the Lobster                      | David        | Foster Wallace |
-- | 10% Happier                               | Dan          | Harris         |
-- +-------------------------------------------+--------------+----------------+
```

```SQL
SELECT title, author_fname, author_lname FROM books WHERE author_fname LIKE 'da_';
-- +-------------+--------------+--------------+
-- | title       | author_fname | author_lname |
-- +-------------+--------------+--------------+
-- | 10% Happier | Dan          | Harris       |
-- +-------------+--------------+--------------+

SELECT title, author_fname, author_lname FROM books WHERE author_fname LIKE 'da__';
-- +-------------------------------------------+--------------+--------------+
-- | title                                     | author_fname | author_lname |
-- +-------------------------------------------+--------------+--------------+
-- | A Hologram for the King: A Novel          | Dave         | Eggers       |
-- | The Circle                                | Dave         | Eggers       |
-- | A Heartbreaking Work of Staggering Genius | Dave         | Eggers       |
-- +-------------------------------------------+--------------+--------------+
```

You can search values containing % signs and _ underscores by escaping them with a backslash like so:

```SQL
SELECT title FROM books WHERE title LIKE '%\%%'
-- +-------------+
-- | title       |
-- +-------------+
-- | 10% Happier |
-- +-------------+

SELECT title FROM books WHERE title LIKE '%\_%';
-- +-----------+
-- | title     |
-- +-----------+
-- | fake_book |
-- +-----------+
```
