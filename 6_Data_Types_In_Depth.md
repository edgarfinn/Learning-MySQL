# Data Types

## Text

### `CHAR` and `VARCHAR`
(see [documentation](https://dev.mysql.com/doc/refman/8.0/en/char.html) for more detailed information)

Both `CHAR` and `VARCHAR` define fields for variable numbers of characters, and are implemented by passing in the maximum required number of characters anticipated for that field

- CHAR(50)
  - *(can be anything from 0 to 255)*
- VARCHAR(50)
  - *(can be anything from 0 to 65,535, subject to maximum row size shared among columns)*
    - see [#Limits on Table Column Count and Row Size](https://dev.mysql.com/doc/refman/8.0/en/column-count-limit.html)


- Whilst any number of characters **up to** the specified maximum can be entered with either `CHAR` or `VARCHAR`, `CHAR` will always ensure the value is the same size, and pad any remaining storage with spaces to the right of the value.

- For example an entry of `'ab'` into a `CHAR(3)` field will be stored as `'ab '` (with an added space on the end to bring it up to the character limit). As such, `CHAR` fields always take up the same amount of storage space.

  - When `SELECT`'ed, those padded spaces are removed unless specified otherwise. BEWARE - that deliberately trailing spaces will also be removed in this process!


- `CHAR` can be more performant for tables storing high volumes of entries of data of a fixed size.


## Numbers

### `INT`
whole numbers

### `DECIMAL`
numbers that can whole decimal points.

`DECIMAL(M, D)`

**M** is the maximum number of digits the number can be (including numbers after the decimal point). Can range from 1 to 65.

**D** is the number of digits to the right of the decimal point, which can range form 0 to 30, and must be no larger than **M**.
