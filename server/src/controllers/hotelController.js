import db from '../db';

export default {
  signUp: (req, res) => {

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
    .then((hotel) => {
      console.log(hotel.dataValues);
      res.status(201).send({
        success: true
      });
    })
    .catch((error) => {
      console.log("fail to register to the DB:", error);
      res.send(error);
    })
  },

  signIn: (req, res) => {

    db.Hotel.findAll({ where: {
      hotel_ID: req.body.hotel_ID,
      hotel_PW: req.body.hotel_PW
    }})
    .then((hotel) => {
      console.log('successfully loged in');
      console.log(hotel[0].dataValues);
      res.send(hotel[0].dataValues);
    })
    .catch((error) => {
      console.log("cannot log in:", error);
      res.send(error);
    })

  },

  bidsInfo: (req, res) => {

    db.Hotel.findOne({ 
        where: { 
          hotel_ID: req.params.hotel_ID 
        } 
      })
      .then((hotel) => {
        console.log(hotel.dataValues.subArea_Name);
        return hotel.dataValues.subArea_Name;
      })
      .then((subArea_Name) => {
        return db.Deal.findAll({
          where: {
            subArea_Name: subArea_Name,
            bid_Transaction: false
          }
        })
      })
      .then((deals) => {
        var results = [];
        for (var i = 0; i < deals.length; i++) {
          console.log(deals[i].dataValues);
          results.push(deals[i].dataValues);
        }
        res.send(results);
      })
      .catch((error) => {
        console.log("cannot retrieve bids information: ", error);
        res.send(error);
      })
  },

  bidInfo: (req, res) => {

    db.Hotel.findOne({
      where: {
        hotel_ID: req.params.hotel_ID
      }
    })
    .then((hotel) => {
      console.log("subArea_Name is: ", hotel.dataValues.subArea_Name);
      return hotel.dataValues.subArea_Name;
    })
    .then((subArea_Name) => {
      return db.Deal.findOne({
        where: {
          subArea_Name: subArea_Name,
          booking_Num: req.params.booking_Num,
          bid_Transaction: false
        }
      })
    })
    .then((deal) => {
      console.log("deal.dataValues is: ", deal.dataValues);
      res.send(deal.dataValues);
    })
    .catch((error) => {
      console.log("cannot retrieve bid information: ", error);
      res.send(error);
    })
  },

  contractedBids: (req, res) => {

    db.Deal.findAll({
      where: {
        hotel_ID: req.params.hotel_ID,
        bid_Transaction: true
      }
    })
    .then((deals) => {
      console.log('>>>> deals');
      var results = [];
      for (var i = 0; i < deals.length; i++) {
        console.log(deals[i].dataValues);
        results.push(deals[i].dataValues);
      }
      res.send(results);
    })
    .catch((error) => {
      console.log("cannot get contract bids information: ", error);
      res.send(error);
    })

  },

  contractedBid: (req, res) => {

    db.Deal.findOne({
      where: {
        hotel_ID: req.params.hotel_ID,
        booking_Num: req.params.booking_Num,
        bid_Transaction: true
      }
    })
    .then((deal) => {
      console.log('>>> deal');
      console.log(deal.dataValues);
      res.send(deal.dataValues);
    })
    .catch((error) => {
      console.log("cannot get contracted bid information: ", error);
      res.send(error);
    })
  },


  bid: (req, res) => {
    // first check whether this bid is already captured
    db.Deal.findOne({ 
      where: { 
        booking_Num: req.params.booking_Num 
      } 
    })
    .then((deal) => {
      if (deal.dataValues.bid_Transaction === 0) {
        return db.Deal.update({
          hotel_ID: req.params.hotel_ID,
          bid_Transaction: true
        }, {
          where: {
            booking_Num: req.params.booking_Num
          }
        })
      } else {
        return "this deal alreay captured";
      }
    })
    .then((result) => {
      console.log('bid result: ', result);
      res.send(result);
    })
    .catch((error) => {
      console.log("cannot update deal DB: ", error);
      res.send(error);
    })
  },


  updateInfo: (req, res) => {

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
    .then((results) => {
      console.log("#of updated rows: ", results[0]);
      res.send("successfully updated");
    })
    .catch((error) => {
      console.log("cannot update user information:", error);
      res.send(error);
    })

  }
};


