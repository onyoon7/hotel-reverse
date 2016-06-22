let db = require('../db');

export default {
  bid: function(req, res) {
    let client_Index = req.body.client_Index;
    let checkIn_Date = req.body.checkIn_Date;
    let checkOut_Date = req.body.checkOut_Date;
    let mainArea_Name = req.body.mainArea_Name;
    let subArea_Name = req.body.subArea_Name;
    let bid_Price = req.body.bid_Price;

    let query1 = 'INSERT INTO deal SET ';
    let query2 = 'client_Index=?, checkIn_Date=?, checkOut_Date=?, mainArea_Name=?, subArea_Name=?, bid_Price=?, bid_StartTime=?, bid_EndTime=?';

    let today = new Date();
    let tomorrow = new Date(today.setDate(today.getDate() + 1));
    let data = [client_Index, checkIn_Date, checkOut_Date, mainArea_Name, subArea_Name, bid_Price, today, tomorrow];
    let query = query1 + query2;

    db.connection.query(query, data, (error, results, fields) => {
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
