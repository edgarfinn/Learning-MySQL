# Data Types

## Storing Text

### `CHAR` and `VARCHAR` (see [documentation](https://dev.mysql.com/doc/refman/8.0/en/char.html) for more detailed information)

Both `CHAR` and `VARCHAR` define fields for variable numbers of characters, and are implemented by passing in the maximum required number of characters anticipated for that field

- CHAR(50)
  - *(can be anything from 0 to 255)*
- VARCHAR(50)
  - *(can be anything from 0 to 65,535, subject to maximum row size shared among columns)*
    - see [#Limits on Table Column Count and Row Size](https://dev.mysql.com/doc/refman/8.0/en/column-count-limit.html)

Whilst any number of characters **up to** the specified maximum can be entered with either `CHAR` or `VARCHAR`, `CHAR` will always ensure the value is the same size, and pad any remaining storage with spaces to the right of the value. For example an entry of `'ab'` into a `CHAR(10)` field will be stored as `'ab        '` 
