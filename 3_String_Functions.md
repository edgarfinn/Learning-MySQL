### Running SQL files.
You can tell the command line to execute sql from a `xxxx.sql` file by running:

`$> source file_name.sql;`

Source needs to be passed the filepath of the file relative to the location from which source is being executed.

eg:

`$> source inserts/myinsert_.sql;` to run the `myinsert.sql` file from just outside of the `inserts` directory.

# String Functions

[String functions](https://dev.mysql.com/doc/refman/8.0/en/string-functions.html) allow you to manipulate string values as they're being retrieved from the tables.

A few examples (there are loads that you may never need to know about):

### CONCAT
Concatenates several string values together.

Syntax:
```SQL
CONCAT(x,y,z)
SELECT CONCAT(column_name, ' ', another_column_name) FROM table;

SELECT CONCAT(author_fname, ' ', author_lname) FROM books;
-- +-----------------------------------------+
-- | CONCAT(author_fname, ' ', author_lname) |
-- +-----------------------------------------+
-- | Jhumpa Lahiri                           |
-- | Neil Gaiman                             |
-- | Neil Gaiman                             |
-- | Jhumpa Lahiri                           |
-- | Dave Eggers                             |
-- | Dave Eggers                             |
-- | Michael Chabon                          |
-- | Patti Smith                             |
-- | Dave Eggers                             |
-- | Neil Gaiman                             |
-- | Raymond Carver                          |
-- | Raymond Carver                          |
-- | Don DeLillo                             |
-- | John Steinbeck                          |
-- | David Foster Wallace                    |
-- | David Foster Wallace                    |
-- +-----------------------------------------+

```
Notice that the header isnt particularly user-friendly
```SQL
+-----------------------------------------+
| CONCAT(author_fname, ' ', author_lname) |
+-----------------------------------------+
```
