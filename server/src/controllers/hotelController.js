let db = require('../db');

export default {
  signUp: function(req, res) {
    var hotel_ID = req.body.hotel_ID;
    var hotel_PW = req.body.hotel_PW;
    var hotel_Name = req.body.hotel_Name;
    var hotel_Location = req.body.hotel_Location;
    var hotel_Rate = req.body.hotel_Rate;
    var mgr_Name = req.body.mgr_Name;

    var query1 = 'INSERT INTO Hotel SET ';
    var query2 = 'hotel_ID=?, hotel_PW=?, hotel_Name=?, hotel_Location=?, hotel_Rate=?, mgr_Name=?';
    var data = [hotel_ID, hotel_PW, hotel_Name, hotel_Location, hotel_Rate, mgr_Name];
    var query = query1 + query2;

    db.connection.query(query, data, function(error, results, fields) {
      if (error) {
        console.log('error code: ' + error.code +
                    ', faild to insert new hotel');
      } else {
        console.log('query: ' + query);
        console.log('successfully inserted');
        res.send(results);
      }
    });
  },

  signIn: function(req, res) {
    // encryption? later...
    var id = req.body.Hotel_ID;
    var pwd = req.body.Hotel_PW;

    var query = 'SELECT Hotel_ID, Hotel_PW from Hotel';

    db.connection.query(query, function(error, results, fields) {

      if (error) {
        console.log('error code: ' + error.code +
                    ' ,failed to retrieve user informaton');
      } else {
        console.log('query: ' + query);
        console.log(results);

        if (results.length === 0) {
          res.send('Wrong ID or Password!');
        } else {
          res.send('Successfully loged in');
        }
      }
    });
  },

  bidInfo: function(req, res) {
    var hotel_ID = req.params.hotel_ID;
    var subArea_Name;


    var firstQ = 'SELECT subArea_Name FROM Hotel WHERE hotel_ID=' + hotel_ID;

    db.connection.query(query, function(error, results, fields) {
      if (error) {
        console.log('error code: ' + error.code +
                    ', failed to retreive bid information');
      } else {
        console.log('query: ' + query);
        console.log(results);

        subArea_Name = results[0];

        var secondQ = 'SELECT * FROM deal WHERE bid_Transaction=0 AND subArea_Name=' + subArea_Name;

        db.connection.query(query, function(error, results, fields) {

          if (error) {
            console.log('error code: ' + error.code +
                        ', failed to retreive bid information');
          } else {
            console.log('query: ' + query);
            console.log(results);

            res.send(results);
          }
        });
      }
    });
  },

  bidInfoInterval: function(req, res) {
    var hotel_ID = req.params.hotel_ID;
    var startDate = req.params.startDate;
    var endDate = req.params.endDate;

    var query1 = 'SELECT * FROM Deal where hotel_ID=' + hotel_ID + ' AND ';
    var query2 = 'bid_Transaction=1 AND ';
    var query3 = '(bid_StartTime > ' + startDate + ' AND ';
    var query4 = 'bid_EndTime < ' + endDate + ')';

    var query = query1 + query2 + query3 + query4;

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

  bid: function(req, res) {
    // 1. 해당 건이 이미 계약이 되었는지 확인
    //    계약이 되었으면 '이미 계약이 체결되었습니다' 보내주고 리턴
    // 2. 해당 건에 대한 계약 체결
    //    다른 테이블을 업데이트해야 할 일은?
  },


  update: function(req, res) {
    var hotel_ID = req.params.hotel_ID;

    var hotel_PW = req.body.hotel_PW;
    var hotel_Name = req.body.hotel_Name;
    var hotel_Location = req.body.hotel_Location;
    var hotel_Rate = req.body.hotel_Rate;
    var mgr_Name = req.body.mgr_Name;

    var query_header = 'UPDATE Hotel SET ';
    var query1 = 'hotel_PW=' + hotel_PW + ', ';
    var query2 = 'hotel_Name=' + hotel_Name + ', ';
    var query3 = 'hotel_Location=' + hotel_Location + ', ';
    var query4 = 'hotel_Rate=' + hotel_Rate + ', ';
    var query5 = 'mgr_Name=' + mgr_Name + ' ';
    var query_trailer = 'WHERE hotel_ID=' + hotel_ID;

    var query = query_header + query1 + query2 + query3 + query4 + query5 + query_trailer;

    db.connection.query(query, function(error, results, fields) {
      if (error) {
        console.log('error code: ' + error.code +
                    ', failed to update hotel information');
      } else {
        console.log('query: ' + query);
        console.log(results);
        res.send(results);
      }
    });
  }
};


