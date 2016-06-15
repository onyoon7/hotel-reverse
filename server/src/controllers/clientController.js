let db = require('../db');

export default {
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
        });
      }
    });
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

        // to avoid async problem
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
        });
      }
    });
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


        var query1 = 'INSERT INTO deal SET ';
        var query2 = 'client_Index=?, checkIn_Date=?, checkOut_Date=?, mainArea_Name=?, subArea_Name=?, ';
        var query3 = 'bid_Price=?, bid_StartTime=?, bid_EndTime=?, bid_Transaction=?';
        var query4 = [client_Index, checkIn_Date, checkOut_Date, mainArea_Name, subArea_Name, bid_Price, bid_StartTime, bid_EndTime, bid_Transaction];

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
    });
  }
};
