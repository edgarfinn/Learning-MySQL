# Aggregate functions

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
