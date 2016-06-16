/*
  <controllers>

 */

let db = require('../db');

let api = {
  clientController: {
    signUp: function(req, res) {
      var client_ID = req.body.client_ID;
      var client_PW = req.body.client_PW;
      var client_Name = req.body.client_Name;
      var client_Email = req.body.client_Email;
      var billingInfo = req.body.billingInfo;
      var member = 1;

      var query1 = 'INSERT INTO Client SET ';
      var query2 = 'client_ID=?, client_PW=?, client_Name=?, client_Email=?, billingInfo=?, member=?';
      var data = [client_ID, client_PW, client_Name, client_Email, billingInfo, member];
      var query = query1 + query2;

      db.connection.query(query, data, function(error, results, fields) {
        if (error) {
          console.log('error code: ' + error.code +
                      ', faild to insert new user');
        } else {
          console.log('(signUp)new customer successfully registered');
          res.send(results);
        }
      });
    },

    signIn: function(req, res) {
      var id = req.body.client_ID;
      var pwd = req.body.client_PW;

      var query = 'SELECT * FROM Client WHERE client_ID=? AND client_PW=?';
      var data = [id, pwd];

      db.connection.query(query, data, function(error, results, fields) {

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

    getAllContracts: function(req, res) {

      var client_Email = req.params.client_Email;
      var client_Index;

      console.log('client_Email: ' + client_Email);

      var firstQ = "SELECT client_Index FROM Client where client_Email=?";
      var firstData = [client_Email];

      db.connection.query(firstQ, firstData, function(error, results, fields) {
        if (error) {
          console.log('error code: ' + error.code +
                      ', failed to retreive client_Index from Client');
        } else {

          console.log('query: ' + firstQ);
          console.log(results);

          client_Index = results[0];
          var secondQ = "SELECT * FROM deal WHERE client_Index=?";
          var secondData = [client_Index];
          db.connection.query(secondQ, secondData, function(error, results, fields) {
            if (error) {
              console.log('error code: ' + error.code +
                          ', failed to retreive all deals');
            } else {
              console.log('query: ' + secondQ);
              console.log(results);
              res.send(results);
            }
          });
        }
      });
    },

    getContract: function(req, res) {

      var client_Email = req.params.client_Email;
      var booking_Num = req.params.booking_Num;
      var client_Index;

      var firstQ = "SELECT client_Index FROM Client where client_Email=?";
      var firstData = [client_Email];

      db.connection.query(firstQ, firstData, function(error, results, fields) {
        if (error) {
          console.log('error code: ' + error.code +
                      ', failed to retreive client_Index from Client');
        } else {
          console.log('query: ' + firstQ);
          console.log(results);

          client_Index = results[0];

          // to avoid async problem
          var secondQ = "SELECT * FROM deal WHERE client_Index=? AND booking_Num=?";
          var secondData = [client_Index, booking_Num];
          db.connection.query(secondQ, secondData, function(error, results, fields) {
            if (error) {
              console.log('error code: ' + error.code +
                          ', failed to retreive all deals');
            } else {
              console.log('query: ' + secondQ);
              console.log(results);
              res.send(results);
            }
          });
        }
      });
    },

    makeContract: function(req, res) {

      console.log("Welcome to makeContract");
      
      var client_Email = req.params.client_Email;
      var client_Index;

      var checkIn_Date = req.body.checkIn_Date;
      var checkOut_Date = req.body.checkOut_Date;
      var mainArea_Name = req.body.mainArea_Name;
      var subArea_Name = req.body.subArea_Name;

      var bid_Price = req.body.bid_Price;
      // var bid_StartTime = req.body.bid_StartTime;
      // var bid_EndTime = req.body.bid_EndTime;
      var bid_Transaction = 1;

      var firstQ = 'SELECT client_Index from Client WHERE client_Email=?';
      var firstData = [client_Email];

      db.connection.query(firstQ, firstData, function(error, results, fields) {
        if (error) {
          console.log('error code: ' + error.code);
        } else {
          console.log('query: ' + firstQ, firstData);
          client_Index = results[0].client_Index;
          console.log('client_Index: ', client_Index);

          var query1 = 'INSERT INTO deal SET ';
          var query2 = 'client_Index=?, checkIn_Date=?, checkOut_Date=?, mainArea_Name=?, subArea_Name=?, ';
          var query3 = 'bid_Price=?, bid_StartTime=now(), bid_EndTime=now()+interval 1 day, bid_Transaction=?';
          var secondData = [client_Index, checkIn_Date, checkOut_Date, mainArea_Name, subArea_Name, bid_Price, bid_Transaction];

          var secondQ = query1 + query2 + query3;
          console.log(secondQ, secondData);

          db.connection.query(secondQ, secondData, function(error, results, fields) {
            if (error) {
              console.log('error code: ' + error.code);
            } else {
              console.log('query: ' + secondQ, secondData);
              console.log(results);
              // give back the inserted result
              res.send(results);
            }
          });
        }
      });
    },

    cancelContract: function(req, res) {
      // cancel policies needed
    },

    // currently dummy function,
    // later we need to update DB schema to incorporate 'like' into our app
    makeFeedback: function(req, res) {
    },

    updateInfo: function(req, res) {
      var client_Email = req.params.client_Email;

      var client_ID = req.body.client_ID;
      var client_PW = req.body.client_PW;
      var client_Name = req.body.client_Name;
      var billingInfo = req.body.billingInfo;
      var member = req.body.member;

      var query1 = 'UPDATE Client SET ';
      var query2 = 'client_PW=?, client_Name=?, client_Email=?, billingInfo=?, member=? WHERE client_ID=?';
      var data = [client_PW, client_Name, client_Email, billingInfo, member, client_ID];

      var query = query1 + query2;

      db.connection.query(query, data, function(error, results, fields) {
        if (error) {
          console.log('error code: ' + error.code +
                      ', failed to update client information');
        } else {

          console.log('query: ' + query, data);
          console.log(results);
          res.send(results);
        }
      });
    }
  },

  hotelController: {
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
        } else {
          console.log('query: ' + query, data);
          console.log(results);
          res.send(results);
        }
      });
    }
  },

  adminController: {
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
      var endDate = req.body.endDate;

      var startTime = startDate + ' 00:00:00';
      var endTime = endDate + ' 23:59:59';

      var query1 = 'SELECT * FROM Deal where bid_Transaction=1 AND ';
      var query2 = 'bid_StartTime>? AND bid_EndTime<?';
      var query = query1 + query2;
      var data = [startTime, endTime];

      db.connection.query(query, data, function(error, results, fields) {
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
      var hotel_ID = req.params.hotel_ID;
      var query = 'SELECT * from Hotel where hotel_ID=?';
      var data = [hotel_ID];

      db.connection.query(query, data, function(error, results, fields) {
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
      var query = 'SELECT * from Hotel where subArea_Name=?';
      var data = [subArea_Name];

      db.connection.query(query, data, function(error, results, fields) {
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
      var query = 'DELETE FROM Hotel WHERE hotel_ID=?';
      var data = [hotel_ID];

      db.connection.query(query, data, function(error, results, fields) {
        if (error) {
          console.log('error code: ' + error.code +
                      ', failed to delete hotel(' + hotel_ID + ')');
        } else {
          console.log('query: ' + query);
          var msg = 'successfully deleted(hotel_ID): ' + hotel_ID; 
          console.log(msg);
          res.send(msg);
        }
      });
    },

    getClients: function(req, res) {
      var query = 'SELECT * FROM Client';

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
      var query = 'SELECT * FROM Client where client_Email=?';
      var data = [client_Email];

      db.connection.query(query, data, function(error, results, fields) {
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
  }
};

module.exports = api;
