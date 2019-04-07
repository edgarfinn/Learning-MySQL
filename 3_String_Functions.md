# String Functions

### Running SQL files.
You can tell the command line to execute sql from a `xxxx.sql` file by running:

`$> source file_name.sql;`

Source needs to be passed the filepath of the file relative to the location from which source is being executed.

eg:

`$> source inserts/myinsert_.sql;` to run the `myinsert.sql` file from just outside of the `inserts` directory.
