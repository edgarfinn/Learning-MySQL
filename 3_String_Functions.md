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
CONCAT(x, y, z);
SELECT CONCAT(column_name, ' ', another_column_name) FROM table_name;

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
-- +-----------------------------------------+
-- | CONCAT(author_fname, ' ', author_lname) |
-- +-----------------------------------------+
```

The header can be customised again using the `AS` keyword:

```SQL
SELECT CONCAT(author_fname, ' ', author_lname) AS 'full name' FROM books;                               
-- +----------------------+
-- | full name            |
-- +----------------------+
-- | Jhumpa Lahiri        |
-- | Neil Gaiman          |
-- | Neil Gaiman          |
-- | Jhumpa Lahiri        |
-- | Dave Eggers          |
-- | Dave Eggers          |
-- | Michael Chabon       |
-- | Patti Smith          |
-- | Dave Eggers          |
-- | Neil Gaiman          |
-- | Raymond Carver       |
-- | Raymond Carver       |
-- | Don DeLillo          |
-- | John Steinbeck       |
-- | David Foster Wallace |
-- | David Foster Wallace |
-- +----------------------+
```

CONCAT_WS (concatenate with separator)

Syntax:
```SQL
CONCAT(separator, X, Y, Z);
-- XseparatorYseparatorZ

SELECT CONCAT_WS(' - ', title, author_fname, author_lname) FROM books;
-- +------------------------------------------------------------------------+
-- | CONCAT_WS(' - ', title, author_fname, author_lname)                    |
-- +------------------------------------------------------------------------+
-- | The Namesake - Jhumpa - Lahiri                                         |
-- | Norse Mythology - Neil - Gaiman                                        |
-- | American Gods - Neil - Gaiman                                          |
-- | Interpreter of Maladies - Jhumpa - Lahiri                              |
-- | A Hologram for the King: A Novel - Dave - Eggers                       |
-- | The Circle - Dave - Eggers                                             |
-- | The Amazing Adventures of Kavalier & Clay - Michael - Chabon           |
-- | Just Kids - Patti - Smith                                              |
-- | A Heartbreaking Work of Staggering Genius - Dave - Eggers              |
-- | Coraline - Neil - Gaiman                                               |
-- | What We Talk About When We Talk About Love: Stories - Raymond - Carver |
-- | Where Im Calling From: Selected Stories - Raymond - Carver             |
-- | White Noise - Don - DeLillo                                            |
-- | Cannery Row - John - Steinbeck                                         |
-- | Oblivion: Stories - David - Foster Wallace                             |
-- | Consider the Lobster - David - Foster Wallace                          |
-- +------------------------------------------------------------------------+
```

### SUBSTRING
Returns part of a string. Which part depends on the arguments passed in:

- `SELECT SUBSTRING(column_name, startIndex, endIndex) FROM table_name;`
  - returns characters from `column_name` between `startIndex` and `endIndex`.

OR

- `SELECT SUBSTRING(column_name, startIndex) FROM table_name;`
  - returns characters from `column_name` between `startIndex` the end of the full string.

If only `startIndex` is passed (not `endIndex`), and `startIndex` is a negative number, the characters selected are counted from the end of the string.

```SQL
SELECT SUBSTRING(title, 1,8) FROM books;
-- +-----------------------+
-- | SUBSTRING(title, 1,8) |
-- +-----------------------+
-- | The Name              |
-- | Norse My              |
-- | American              |
-- | Interpre              |
-- | A Hologr              |
-- | The Circ              |
-- | The Amaz              |
-- | Just Kid              |
-- | A Heartb              |
-- | Coraline              |
-- | What We               |
-- | Where Im              |
-- | White No              |
-- | Cannery               |
-- | Oblivion              |
-- | Consider              |
-- +-----------------------+

SELECT SUBSTRING(title, 8) FROM books;
-- +----------------------------------------------+
-- | SUBSTRING(title, 8)                          |
-- +----------------------------------------------+
-- | esake                                        |
-- | ythology                                     |
-- | n Gods                                       |
-- | eter of Maladies                             |
-- | ram for the King: A Novel                    |
-- | cle                                          |
-- | zing Adventures of Kavalier & Clay           |
-- | ds                                           |
-- | breaking Work of Staggering Genius           |
-- | e                                            |
-- |  Talk About When We Talk About Love: Stories |
-- | Im Calling From: Selected Stories            |
-- | oise                                         |
-- |  Row                                         |
-- | n: Stories                                   |
-- | r the Lobster                                |
-- +----------------------------------------------+

SELECT SUBSTRING(title, -8) FROM books;
-- +----------------------+
-- | SUBSTRING(title, -8) |
-- +----------------------+
-- | Namesake             |
-- | ythology             |
-- | can Gods             |
-- | Maladies             |
-- |  A Novel             |
-- | e Circle             |
-- | r & Clay             |
-- | ust Kids             |
-- | g Genius             |
-- | Coraline             |
-- |  Stories             |
-- |  Stories             |
-- | te Noise             |
-- | nery Row             |
-- |  Stories             |
-- |  Lobster             |
-- +----------------------+
```

#### Combining string functions:

Its possible to combine functions. When functions are combined, the inner-most function is evaluated first, and passed to its parent back up to the outer-most function.

```SQL
SELECT CONCAT ( SUBSTRING('Hello World', 1, 7 ), '...') AS my_output;
-- +------------+
-- | my_output  |
-- +------------+
-- | Hello W... |
-- +------------+

SELECT CONCAT ( SUBSTRING(title, 1, 10), '...' ) AS subtitle FROM books;
-- +---------------+
-- | subtitle      |
-- +---------------+
-- | The Namesa... |
-- | Norse Myth... |
-- | American G... |
-- | Interprete... |
-- | A Hologram... |
-- | The Circle... |
-- | The Amazin... |
-- | Just Kids...  |
-- | A Heartbre... |
-- | Coraline...   |
-- | What We Ta... |
-- | Where Im  ... |
-- | White Nois... |
-- | Cannery Ro... |
-- | Oblivion: ... |
-- | Consider t... |
-- +---------------+
```

### REPLACE

`REPLACE(string | columnName, search_for, replace_with)`

NOTE: REPLACE is case sensitive

Example:
```SQL
SELECT REPLACE('Hello world', 'world', 'universe');
-- +---------------------------------------------+
-- | REPLACE('Hello world', 'world', 'universe') |
-- +---------------------------------------------+
-- | Hello universe                              |
-- +---------------------------------------------+

SELECT REPLACE(title, 'The', 'Das') FROM books;
-- +-----------------------------------------------------+
-- | REPLACE(title, 'The', 'Das')                        |
-- +-----------------------------------------------------+
-- | Das Namesake                                        |
-- | Norse Mythology                                     |
-- | American Gods                                       |
-- | Interpreter of Maladies                             |
-- | A Hologram for the King: A Novel                    |
-- | Das Circle                                          |
-- | Das Amazing Adventures of Kavalier & Clay           |
-- | Just Kids                                           |
-- | A Heartbreaking Work of Staggering Genius           |
-- | Coraline                                            |
-- | What We Talk About When We Talk About Love: Stories |
-- | Where Im Calling From: Selected Stories             |
-- | White Noise                                         |
-- | Cannery Row                                         |
-- | Oblivion: Stories                                   |
-- | Consider the Lobster                                |
-- +-----------------------------------------------------+
```
