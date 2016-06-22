import db from '../db';

export default {
  signUp: function(req, res) {

    db.Hotel.create({
      hotel_ID: req.body.hotel_ID,
      hotel_PW: req.body.hotel_PW,
      hotel_Name: req.body.hotel_Name,
      hotel_Address: req.body.hotel_Address,
      mainArea_Name: req.body.mainArea_Name,
      subArea_Name: req.body.subArea_Name,
      hotel_Rate: req.body.hotel_Rate,
      mgr_Name: req.body.mgr_Name   
    })
    .then(function(hotel) {
      console.log(hotel.dataValues);
      res.send('successfully registered');
    })
    .catch(function(error) {
      console.log("fail to register to the DB:", error);
      res.send(error);
    })
  },

  signIn: function(req, res) {

    db.Hotel.findAll({ where: { 
      hotel_ID: req.body.hotel_ID,
      hotel_PW: req.body.hotel_PW
    }})
    .then(function(hotel) {
      console.log('successfully loged in');
      console.log(hotel[0].dataValues);
      res.send(hotel[0].dataValues);
    })
    .catch(function(error) {
      console.log("cannot log in:", error);
      res.send(error);
    })    

  },

  bidInfo: function(req, res) {

    db.Hotel.findOne({ where: { hotel_ID: req.params.hotel_ID } })
      .then(function(hotel) {
        console.log(hotel.dataValues.subArea_Name);
        return hotel.dataValues.subArea_Name;
      })
      .then(function(subArea_Name) {
        return db.Deal.findAll({
          where: {
            subArea_Name: subArea_Name,
            bid_Transaction: false
          }
        })
      })
      .then(function(deals) {
        var results = [];
        for (var i = 0; i < deals.length; i++) {
          console.log(deals[i].dataValues);
          results.push(deals[i].dataValues);
        }
        res.send(results);
      })
      .catch(function(error) {
        console.log("cannot retrieve bid information: ", error);
        res.send(error);
      })

    // var hotel_ID = req.params.hotel_ID;
    // var subArea_Name;

    // var firstQ = 'SELECT subArea_Name FROM Hotel WHERE hotel_ID=?';
    // var firstData = [hotel_ID];

    // db.connection.query(firstQ, firstData, function(error, results, fields) {
    //   if (error) {
    //     console.log('error code: ' + error.code +
    //                 ', failed to retreive bid information');
    //     res.send('no pending bids...')
    //     return;
    //   } else {
    //     console.log('query: ' + firstQ, firstData);
    //     console.log(results);

    //     subArea_Name = results[0].subArea_Name;

    //     var secondQ = 'SELECT * FROM deal WHERE bid_Transaction=0 AND subArea_Name=?';
    //     var secondData = [subArea_Name];

    //     db.connection.query(secondQ, secondData, function(error, results, fields) {

    //       if (error) {
    //         console.log('error code: ' + error.code +
    //                     ', failed to retreive bid information');
    //         res.send('no pending bids...')
    //         return;
    //       } else {
    //         console.log('query: ' + secondQ, secondData);
    //         console.log(results);
    //         if (results.length === 0) {
    //           res.send('no pening bid...')
    //         }
    //         res.send(results);
    //       }
    //     });
    //   }
    // });
  },

  contractedBids: function(req, res) {

    db.Deal.findAll({
      where: { 
        hotel_ID: req.params.hotel_ID,
        bid_Transaction: true 
      }
    })
    .then(function(deals) {
      console.log('>>>> deals');
      var results = [];
      for (var i = 0; i < deals.length; i++) {
        console.log(deals[i].dataValues);
        results.push(deals[i].dataValues);
      }
      res.send(results);      
    })
    .catch(function(error) {
      console.log("cannot get contract information: ", error);
      res.send(error);
    })

    // var hotel_ID = req.params.hotel_ID;

    // var query = 'SELECT * FROM Deal where hotel_ID=?';
    // var data = [hotel_ID];

    // db.connection.query(query, data, function(error, results, fields) {
    //   if (error) {
    //     console.log("error code: " + error.code +
    //                 " ,fail to get contracted bid info");
    //     res.send('no contracted bids');
    //     return;
    //   } else {
    //     console.log('query: ' + query);
    //     console.log(results);
    //     res.send(results);
    //   }
    // });
  },

  bid: function(req, res) {
    // first check whether this bid is already captured
    db.Deal.findOne({ booking_Num: req.params.booking_Num })
    .then(function(deal) {
      if (deal.dataValues.bid_Transaction === true) {
        res.send("this deal already captured");
        return;
      } else {
        db.Deal.update({
          hotel_ID: req.params.hotel_ID,
          bid_Transaction: true
        })
      }
    })
    .catch(function(error) {
      console.log("cannot update deal DB: ", error);
      res.send(error);
    })
  },


  updateInfo: function(req, res) {

    db.Hotel.update({
      hotel_PW: req.body.hotel_PW,
      hotel_Name: req.body.hotel_Name,
      hotel_Address: req.body.hotel_Address,
      mainArea_Name: req.body.mainArea_Name,
      subArea_Name: req.body.subArea_Name,
      hotel_Rate: req.body.hotel_Rate,
      mgr_Name: req.body.mgr_Name
    }, {
      where: {
        hotel_ID: req.params.hotel_ID
      }
    })
    .then(function(results) {
      console.log("#of updated rows: ", results[0]);
      res.send("successfully updated");
    })
    .catch(function(error) {
      console.log("cannot update user information:", error);
      res.send(error);
    })

  }
};


