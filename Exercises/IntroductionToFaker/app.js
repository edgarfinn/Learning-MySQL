var faker = require('faker');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'join_us'
})
connection.connect();
connection.query('SELECT 1 + 1 AS solution', function(error, results, fields) {
   if (error) throw error;
   console.log('The solution is: ', results[0].solution);
});
connection.end();

function generateAddress() {
  console.log(faker.address.streetAddress());
  console.log(faker.address.city());
  console.log(faker.address.state());
}
