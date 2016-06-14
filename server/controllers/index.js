/*
  <controllers>
  
 */

var db = require('../db');

var userController = {
  singUp: function(req, res) {
    var client_ID = req.body.client_ID;
    var client_PW = req.body.client_PW;
    var client_Name = req.body.client_Name;
    var client_Email = req.body.client_Email;
    var billingInfo = req.body.billingInfo;
    var member = 1;

    var query1 = 'INSERT INTO Client ';
    var query2 = '(client_ID, client_PW, client_Name, client_Email, billingInfo, member) ';
    var query3 = 'VALUES (' + client_ID + ', ' + client_PW + ', ' + 
                              client_Name + ', ' + client_Email + ', ' + 
                              billingInfo + ', ' + member + ')';
    var query = query1 + query2 + query3;

    db.connection.query(query, function(error, results, fields) {
      if (error) {
        console.log('error code: ' + error.code +
                    ', faild to insert new user');
      } else {
        console.log('query: ' + query);
        console.log('successfully inserted');
        res.send(results);
      }
    })    
  },

  signIn: function(req, res) {
    var id = req.body.Client_ID;
    var pwd = req.body.Client_PW;

    var query = 'SELECT Client_ID, Client_PW from Client';

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
    })    
  },


  getAllContracts: function(req, res) {
    var client_Email = req.body.client_Email;
    var client_Index;

    var firstQ = "SELECT client_Index FROM Client where client_Email=" + client_Email;
    db.connection.query(firstQ, function(error, results, fields) {
      if (error) {
        console.log('error code: ' + error.code + 
                    ', failed to retreive client_Index from Client');
      } else {
        console.log('query: ' + query);
        console.log(results);

        client_Index = results[0];
      }
    })

    var secondQ = "SELECT * FROM deal WHERE client_Index=" + client_Index;
    db.connection.query(secondQ, function(error, results, fields) {
      if (error) {
        console.log('error code: ' + error.code +
                    ', failed to retreive all deals');
      } else {
        console.log('query: ' + query);
        console.log(results);
        res.send(results);
      }
    })

  },


  getContract: function(req, res) {
    var client_Email = req.body.client_Email;
    var booking_Num = req.body.booking_Num;
    var client_Index;

    var firstQ = "SELECT client_Index FROM Client where client_Email=" + client_Email;
    db.connection.query(firstQ, function(error, results, fields) {
      if (error) {
        console.log('error code: ' + error.code + 
                    ', failed to retreive client_Index from Client');
      } else {
        console.log('query: ' + query);
        console.log(results);

        client_Index = results[0];
      }
    })

    var secondQ = "SELECT * FROM deal WHERE client_Index=" + client_Index +
                  "AND booking_Num=" + booking_Num;
    db.connection.query(secondQ, function(error, results, fields) {
      if (error) {
        console.log('error code: ' + error.code +
                    ', failed to retreive all deals');
      } else {
        console.log('query: ' + query);
        console.log(results);
        res.send(results);
      }
    })

  },


  makeContract: function(req, res) {
    var client_Email = req.body.client_Email;
    var client_Index;

    var checkIn_Date = req.body.checkIn_Date;
    var checkOut_Date = req.body.checkOut_Date;
    var mainArea_Name = req.body.mainArea_Name;
    var subArea_Name = req.body.subArea_Name;

    var bid_Price = req.body.bid_Price;
    var bid_StartTime = req.body.bid_StartTime;
    var bid_EndTime = req.body.bid_EndTime;
    var bid_Transaction = 1;

    var firstQ = 'SELECT client_Index from Client WHERE client_Email=' + client_Email;
    db.connection.query(firstQ, function(error, results, fields) {
      if (error) {
        console.log('error code: ' + error.code);
      } else {
        console.log('query: ' + query);
        client_Index = results[0];
        console.log('query result: ' + client_Index);
      }
    });

    var query1 = 'INSERT INTO deal ';
    var query2 = '(client_Index, checkIn_Date, checkOut_Date, mainArea_Name, subArea_Name, ';
    var query3 = 'bid_Price, bid_StartTime, bid_EndTime, bid_Transaction) ';
    var query4 = 'VALUES (' + bid_Price + ', ' + bid_StartTime + ', ' + bid_EndTime + ', ' + bid_Transaction +')';

    var secondQ = query1 + query2 + query3 + query4;
    db.connection.query(secondQ, function(error, results, fields) {
      if (error) {
        console.log('error code: ' + error.code);
      } else {
        console.log('query: ' + query);
        console.log(results);
        // give back the inserted result
        res.send(results);
      }
    })
  },


  cancelContract: function(req, res) {
    // cancel policies needed
  }, 

  // currently dummy function,
  // later we need to update DB schema to incorporate 'like' into our app
  makeFeedback: function(req, res) {

  },

  updateInfo: function(req, res) {
    var client_ID = req.body.client_ID;
    var client_PW = req.body.client_PW;
    var client_Name = req.body.client_Name;
    var client_Email = req.body.client_Email;
    var billingInfo = req.body.billingInfo;
    var member = req.body.member;

    var query_header = 'UPDATE Client SET ';
    var query1 = 'client_PW=' + client_PW + ', ';
    var query2 = 'client_Name=' + client_Name + ', ';
    var query3 = 'client_Email=' + client_Email + ', ';
    var query4 = 'billingInfo=' + billingInfo + ', ';
    var query5 = 'member=' + member + ' ';
    var query_trailer = 'WHERE Client_ID=' + Client_ID;

    var query = query_header + query1 + query2 + query3 + query4 + query5 + query_trailer;

    db.connection.query(query, function(error, results, fields) {
      if (error) {
        console.log('error code: ' + error.code +
                    ', failed to update client information');
      } else {
        console.log('query: ' + query);
        console.log(results);
        res.send(results);
      }
    })    
  }

};


var managerController = {
  signUp: function(req, res) {
    var hotel_ID = req.body.hotel_ID;
    var hotel_PW = req.body.hotel_PW;
    var hotel_Name = req.body.hotel_Name;
    var hotel_Location = req.body.hotel_Location;
    var hotel_Rate = req.body.hotel_Rate;
    var mgr_Name = req.body.mgr_Name;

    var query1 = 'INSERT INTO Hotel ';
    var query2 = '(hotel_ID, hotel_PW, hotel_Name, hotel_Location, hotel_Rate, mgr_Name) ';
    var query3 = 'VALUES (' + hotel_ID + ', ' + hotel_PW + ', ' + 
                              hotel_Name + ', ' + hotel_Location + ', ' + 
                              hotel_Rate + ', ' + mgr_Name + ')';
    var query = query1 + query2 + query3;

    db.connection.query(query, function(error, results, fields) {
      if (error) {
        console.log('error code: ' + error.code +
                    ', faild to insert new hotel');
      } else {
        console.log('query: ' + query);
        console.log('successfully inserted');
        res.send(results);
      }
    })
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
    })
  },

  bidInfo: function(req, res) {
    var subArea_Name = req.body.subArea_Name;

    var query = 'SELECT * FROM deal WHERE bid_Transaction=0 AND subArea_Name=' + subArea_Name;

    db.connection.query(query, function(error, results, fields) {

      if (error) {
        console.log('error code: ' + error.code +
                    ', failed to retreive bid information');
      } else {
        console.log('query: ' + query);
        console.log(results);

        res.send(results);
      }
    })
  },

  bidInfoInterval: function(req, res) {
    var hotel_ID = req.body.hotel_ID;
    var startDate = req.body.startDate;
    var endDate = req.body.endDate;
    
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
    })

  },

  bid: function(req, res) {
    // 1. 해당 건이 이미 계약이 되었는지 확인
    //    계약이 되었으면 '이미 계약이 체결되었습니다' 보내주고 리턴
    // 2. 해당 건에 대한 계약 체결
    //    다른 테이블을 업데이트해야 할 일은?
        
  },


  update: function(req, res) {
    var hotel_ID = req.body.hotel_ID;
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
    })
  }


};


var adminController = {

  home: function(req, res) {
    res.sendFile(__dirname + '../public/admin.html');
  },
  
  // admin도 signin할 것인가?
  // signIn: function(req, res) {
  //   // encryption? later...
  //   // don't we need admin authentication?
  //   var id = req.body.Client_ID;
  //   var pwd = req.body.Client_PW;

  //   var query = 'SELECT cliend_ID, client_PW from Client';

  //   db.connection.query(query, function(error, results, fields) {

  //     if (error) {
  //       console.log('error code: ' + error.code +
  //                   ' ,failed to retrieve user informaton');
  //     } else {
  //       console.log('query: ' + query);
  //       console.log(results);

  //       if (results.length === 0) {
  //         res.send('Wrong ID or Password!');
  //       } else {
  //         res.send('Successfully loged in');
  //       }
  //     }
  //   })
  // },

  pendingBid: function(req, res) {
    var query = 'SELECT * FROM Deal where bid_Transaction=0';
    db.connection.query(query, function(error, results, fields) {
      
      if(error) { 
        console.log("error code: " + error.code + 
                    " ,fail to get pending bid transaction")
      } else {
        console.log('query: ' + query);
        console.log(results);
        res.send(results);

      }
    
    })
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
    })
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
    })
  },

  getHotelsByRegion: function(req, res) {
    var region = req.params.region;
    var query = 'SELECT * from Hotel where subArea_Name=' + region;

    db.connection.query(query, function(error, results, fields) {
      if (error) {
        console.log("error code: " + error.code +
                    ", fail to get Hotel information(" + region + ")");
      } else {
        console.log('query: ' + query);
        console.log(results);
        res.send(results);
      }
    })
  },

  getHotel: function(req, res) {
    var hotelId = req.params.hotelId;
    var query = 'SELECT * from Hotel where hotel_ID=' + hotelId;

    db.connection.query(query, function(error, results, fields) {
      if (error) {
        console.log("error code: " + error.code +
                    ", fail to get Hotel Information(" + hotelId + ")");
      } else {
        console.log('query: ' + query);
        console.log(results);
        res.send(results);
      }
    })
  },

  deleteHotel: function(req, res) {
    var hotelId = req.params.hotelId;
    var query = 'DELETE FROM Hotel WHERE hotel_ID=' + hotelId;

    db.connection.query(query, function(error, results, fields) {
      if (error) {
        console.log('error code: ' + error.code +
                    ', failed to delete hotel(' + hotelId + ')');
      } else {
        console.log('query: ' + query);
        console.log('successfully deleted');
      }
    })
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
    })
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
    })
  },

  // updateAdmin: function(req, res) {

  // }

};

  // app.get('/admin', adminController.home);
  // app.post('/admin/signin', adminController.singIn);
  
  // app.delete('/admin/:userId', adminController.deleteUser);
  // app.delete('/admin/:hotelId', adminController.deleteHotel);
  
  // app.get('/admin/pendingbid', adminController.pendingBid);
  // app.post('/admin/bidinfo/:startDate/:endDate', adminController.contractedBid);

  // app.get('/admin/hotels', adminController.getHotels);
  // app.post('/admin/hotels/:hotelid', adminController.getHotel);
  // app.get('/admin/hotels/:region', adminController.getHotelsByRegion);

  // app.get('/admin/clients', adminController.getClients);
  // app.post('admin/clients/:client_Email', adminController.getClient);

  // app.post('/admin/info', adminController.updateAdmin);