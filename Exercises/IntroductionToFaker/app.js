var faker = require('faker');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  // TODO: create user that can interact with db
  database: 'join_us'
})

connection.query('SELECT 1 + 1 AS SOLUTION', function (error, results, fields) {
  if (error) {
    console.log('DB Error:', error);
  }

  console.log('result: ', results)
})

connection.end();

function generateAddress() {
  console.log(faker.address.streetAddress());
  console.log(faker.address.city());
  console.log(faker.address.state());
}
