var faker = require('faker');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'join_us'
})

// SELECTING DATA ==========
// connection.connect();
// connection.query('SELECT COUNT(*) AS total FROM users', function(error, results, fields) {
//    if (error) throw error;
//    console.log('Results: ', results[0].total);
// });
// connection.end();

// ADDING DATA DYNAMICALLY ==========
// var person = {
//   email: faker.internet.email(),
//   created_at: faker.date.past()
// };
// connection.connect();
// connection.query('INSERT INTO users SET ?', person, function(error, results, fields) {
//   if (error) throw error;
//   console.log('Results:', results);
// })
// connection.end();


// INSERTING LOTS OF DATA ==========
var data = [];
for (var i = 0; i < 500; i++) {
  data.push([
    faker.internet.email(),
    faker.date.past()
  ])
};
var q = 'INSERT INTO users (email, created_at) VALUES ?';

connection.connect();
connection.query(q, [data], function(error, result, fields) {
  if (error) throw error;
  console.log('Result', result);
});
connection.end();
