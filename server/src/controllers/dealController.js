let db = require('../db');

export default {
  bid: function(req, res) {
    var client_Index = req.body.client_Index;
    var checkIn_Date = req.body.checkIn_Date;
    var checkOut_Date = req.body.checkOut_Date;
    var mainArea_Name = req.body.mainArea_Name;
    var subArea_Name = req.body.subArea_Name;
    var bid_Price = req.body.bid_Price;

    var query1 = 'INSERT INTO deal SET ';
    var query2 = 'client_Index=?, checkIn_Date=?, checkOut_Date=?, mainArea_Name=?, subArea_Name=?, bid_Price=?, bid_StartTime=?, bid_EndTime=?';

    let today = new Date();
    let tomorrow = new Date(today.setDate(today.getDate() + 1));
    var data = [client_Index, checkIn_Date, checkOut_Date, mainArea_Name, subArea_Name, bid_Price, today, tomorrow];
    var query = query1 + query2;

    db.connection.query(query, data, function(error, results, fields) {
      if (error) {
        console.log('error: ', error, 'faild to insert new deal');
      } else {
        console.log('query: ', query, data);
        console.log('bid successfully inserted');
        res.send(results);
      }
    });
  }
};
