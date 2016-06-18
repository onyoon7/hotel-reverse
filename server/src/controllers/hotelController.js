let db = require('../db');

export default {
  signUp: function(req, res) {
    var hotel_ID = req.body.hotel_ID;
    var hotel_PW = req.body.hotel_PW;
    var hotel_Name = req.body.hotel_Name;
    var hotel_Address = req.body.hotel_Address;
    var mainArea_Name = req.body.mainArea_Name;
    var subArea_Name = req.body.subArea_Name;
    var hotel_Rate = req.body.hotel_Rate;
    var mgr_Name = req.body.mgr_Name;

    var query1 = 'INSERT INTO Hotel SET ';
    var query2 = 'hotel_ID=?, hotel_PW=?, hotel_Name=?, hotel_Address=?, mainArea_Name=?, subArea_Name=?, hotel_Rate=?, mgr_Name=?';
    var data = [hotel_ID, hotel_PW, hotel_Name, hotel_Address, mainArea_Name, subArea_Name, hotel_Rate, mgr_Name];

    var query = query1 + query2;

    db.connection.query(query, data, function(error, results, fields) {
      if (error) {
        console.log('error code: ' + error.code +
                    ', faild to insert new hotel');
        res.send('something went wrong..., try again');
      } else {
        console.log('query: ' + query);
        console.log('successfully inserted');
        res.send(results);
      }
    });
  },

  signIn: function(req, res) {
    // encryption? later...
    var hotel_ID = req.body.hotel_ID;
    var hotel_PW = req.body.hotel_PW;

    console.log('hotel_ID: ' + hotel_ID);

    var query = 'SELECT * from Hotel where hotel_ID=? AND hotel_PW=?';
    var data = [hotel_ID, hotel_PW];

    db.connection.query(query, data, function(error, results, fields) {


      if (error) {
        console.log('error code: ' + error.code +
                    ' ,failed to retrieve user informaton');
        res.send('something went wrong... sorry');
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

    var firstQ = 'SELECT subArea_Name FROM Hotel WHERE hotel_ID=?';
    var firstData = [hotel_ID];

    db.connection.query(firstQ, firstData, function(error, results, fields) {
      if (error) {
        console.log('error code: ' + error.code +
                    ', failed to retreive bid information');
        res.send('no pending bids...')
        return;
      } else {
        console.log('query: ' + firstQ, firstData);
        console.log(results);

        subArea_Name = results[0].subArea_Name;

        var secondQ = 'SELECT * FROM deal WHERE bid_Transaction=0 AND subArea_Name=?';
        var secondData = [subArea_Name];

        db.connection.query(secondQ, secondData, function(error, results, fields) {

          if (error) {
            console.log('error code: ' + error.code +
                        ', failed to retreive bid information');
            res.send('no pending bids...')
            return;
          } else {
            console.log('query: ' + secondQ, secondData);
            console.log(results);
            if (results.length === 0) {
              res.send('no pening bid...')
            }
            res.send(results);
          }
        });
      }
    });
  },

  contractedBids: function(req, res) {
    var hotel_ID = req.params.hotel_ID;

    var query = 'SELECT * FROM Deal where hotel_ID=?';
    var data = [hotel_ID];

    db.connection.query(query, data, function(error, results, fields) {
      if (error) {
        console.log("error code: " + error.code +
                    " ,fail to get contracted bid info");
        res.send('no contracted bids');
        return;
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


  updateInfo: function(req, res) {d
    var hotel_ID = req.params.hotel_ID;

    var hotel_PW = req.body.hotel_PW;
    var hotel_Name = req.body.hotel_Name;
    var hotel_Address = req.body.hotel_Address;
    var mainArea_Name = req.body.mainArea_Name;
    var subArea_Name = req.body.subArea_Name;
    var hotel_Rate = req.body.hotel_Rate;
    var mgr_Name = req.body.mgr_Name;

    var query1 = 'UPDATE Hotel SET ';
    var query2 = 'hotel_PW=?, hotel_Name=?, hotel_Address=?, mainArea_Name=?, subArea_Name=?, hotel_Rate=?, mgr_Name=? ';
    var query3 = 'WHERE hotel_ID=?';
    var data = [hotel_PW, hotel_Name, hotel_Address, mainArea_Name, subArea_Name, hotel_Rate, mgr_Name, hotel_ID];

    var query = query1 + query2 + query3;

    db.connection.query(query, data, function(error, results, fields) {
      if (error) {
        console.log('error code: ' + error.code +
                    ', failed to update hotel information');
        res.send('failed to update hotel information');
        return;
      } else {
        console.log('query: ' + query, data);
        console.log(results);
        res.send(results);
      }
    });
  }
};


