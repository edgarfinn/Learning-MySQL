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


// // INSERTING LOTS OF DATA ==========
// var data = [];
// for (var i = 0; i < 500; i++) {
//   data.push([
//     faker.internet.email(),
//     faker.date.past()
//   ])
// }
// var q = 'INSERT INTO users (email, created_at) VALUES ?';
//
// connection.connect();
// connection.query(q, [data], function(error, result, fields) {
//   if (error) throw error;
//   console.log('Result', result);
// });
// connection.end();

// SELECTING MORE DATA ==========
var q = 'SELECT DATE_FORMAT(MIN(created_at), "%M %D %Y") AS earliest_date FROM users';
// find how many signups happened each month, and order results by most signups
var q2 = 'SELECT MONTHNAME(created_at) as month, COUNT(*) as count FROM users GROUP BY month ORDER BY count DESC';
// find how many signups used gmail, yahoo, hotmail or other for their email address
var q3 = 'SELECT COUNT(*) AS yahoo_users FROM users WHERE email LIKE "%@yahoo.com"';

var q4 = 'SELECT CASE WHEN email LIKE "%@yahoo.com" THEN "yahoo" WHEN email LIKE "%@gmail.com" THEN "gmail" WHEN email LIKE "%@hotmail.com" THEN "hotmail" ELSE "other" END as provider, COUNT(*) AS total_users FROM users GROUP BY provider ORDER BY total_users DESC';

connection.connect();
connection.query(q4, function(error, result, fields) {
  if (error) throw error;
  console.log('Result', result);
});
connection.end();
