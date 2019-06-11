# Many To Many

Some examples where you might see Many To Many relationships:

- Books and authors
    - (books can have several authors, and authors can write several books)
- Students and classes
    - (students go to lots of different classes, and classes usually have multiple students)
- Events and attendees
    - (people on meetup.com might attend several events, and events have many people attending)
- TV Series and Reviewers

Many to many relationships between two entities generally occur when a third table joins them. For example with TV Series and Reviewers, its most likely you'd have a third table for the Reviews, which would link the reviewers to the series' they've reviewed.

![Primary Keys](./assets/m2mreviewsexample.png)

Here, the only table that necessarily needs to contain foreign keys is the Reviews table, because its the only table directly referencing the other tables.

Here's what the schema might look like:

```sql
CREATE TABLE reviewers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100)
);

CREATE TABLE series (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100),
    released_year YEAR(4),
    genre VARCHAR(100)
);

CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rating DECIMAL(2,1),
    series_id INT,
    reviewer_id INT,

    FOREIGN KEY (series_id) REFERENCES series(id),
    FOREIGN KEY (reviewer_id) REFERENCES reviewers(id)
);
```
