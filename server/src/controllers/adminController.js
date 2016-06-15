let db = require('../db');

export default {
  home: function(req, res) {
    res.sendFile(__dirname + '../public/admin.html');
  },

  // admin도 signin할 것인가?

  pendingBid: function(req, res) {
    var query = 'SELECT * FROM Deal where bid_Transaction=0';
    db.connection.query(query, function(error, results, fields) {
      if(error) {
        console.log("error code: " + error.code +
                    " ,fail to get pending bid transaction");
      } else {
        console.log('query: ' + query);
        console.log(results);
        res.send(results);
      }
    });
  },

  contractedBid: function(req, res) {
    var startDate = req.params.startDate;
    var endDate = req.params.endDate;

    var query1 = 'SELECT * FROM Deal where bid_Transaction=1 AND';
    var query2 = '(bid_StartTime > ' + startDate + ' AND ';
    var query3 = 'bid_EndTime < ' + endDate + ')';

    var query = query1 + query2 + query3;

    db.connection.query(query, function(error, results, fields) {
      if (error) {
        console.log("error code: " + error.code +
                    " ,fail to get contracted bid info");
      } else {
        console.log('query: ' + query);
        console.log(results);
        res.send(results);
      }
    });
  },

  getHotels: function(req, res) {
    var query = 'SELECT * from Hotel';

    db.connection.query(query, function(error, results, fields) {
      if (error) {
        console.log("error code: " + error.code +
                    " ,fail to get Hotel information");
      } else {
        console.log('query: ' + query);
        console.log(results);
        res.send(results);
      }
    });
  },

  getHotel: function(req, res) {
    var hotelId = req.params.hotel_ID;
    var query = 'SELECT * from Hotel where hotel_ID=' + hotel_ID;

    db.connection.query(query, function(error, results, fields) {
      if (error) {
        console.log("error code: " + error.code +
                    ", fail to get Hotel Information(" + hotel_ID + ")");
      } else {
        console.log('query: ' + query);
        console.log(results);
        res.send(results);
      }
    });
  },

  getHotelsByRegion: function(req, res) {
    var subArea_Name = req.params.subArea_Name;
    var query = 'SELECT * from Hotel where subArea_Name=' + subArea_Name;

    db.connection.query(query, function(error, results, fields) {
      if (error) {
        console.log("error code: " + error.code +
                    ", fail to get Hotel information(" + subArea_Name + ")");
      } else {
        console.log('query: ' + query);
        console.log(results);
        res.send(results);
      }
    });
  },

  deleteHotel: function(req, res) {
    var hotel_ID = req.params.hotel_ID;
    var query = 'DELETE FROM Hotel WHERE hotel_ID=' + hotel_ID;

    db.connection.query(query, function(error, results, fields) {
      if (error) {
        console.log('error code: ' + error.code +
                    ', failed to delete hotel(' + hotel_ID + ')');
      } else {
        console.log('query: ' + query);
        console.log('successfully deleted');
      }
    });
  },

  getClients: function(req, res) {
    var guery = 'SELECT * FROM Client';

    db.connection.query(query, function(error, results, fields) {
      if (error) {
        console.log('error code: ' + error.code +
                    ', failed to get clients info');
      } else {
        console.log('query: ' + query);
        console.log(results);
        res.send(results);
      }
    });
  },

  getClient: function(req, res) {
    var client_Email = req.params.client_Email;
    var query = 'SELECT * FROM Client where client_Email=' + client_Email;

    db.connection.query(query, function(error, results, fields) {
      if (error) {
        console.log('error code: ' + error.code +
                    ', failed to get client info');
      } else {
        console.log('query: ' + query);
        console.log(results);
        res.send(results);
      }
    });
  }
};
