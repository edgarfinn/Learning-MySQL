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

Syntax:
`SELECT column_name[s] FROM table_name ORDER BY column_name;`

NB: Works equally for letters and nummbers

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
```
