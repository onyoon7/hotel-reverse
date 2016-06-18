var mysql = require('mysql');

/*--------------------------------------------------------------------
  1. Create a MySQL database connection and export it
  - host: localhost
  - user: root
  - password: (root password of individual installation,
               in my case: lion0787)
  - database: hotel-reverse (let's determine database name)

  2. Then connect to 'hotel-reverse' database
 --------------------------------------------------------------------*/

module.exports.connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'lion0787',
  database: 'hotelreverse'
});



module.exports.connection.connect(function(err) {
  if (err) {
    console.log('error connecting...');
    return;
  }

  console.log('successfully connected to database...');
});
