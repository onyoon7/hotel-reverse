import db from '../db';
import path from 'path';

////////////////////////////////////////////////////////////////////////
// hotel
//
// function         method    url
// ----------------------------------------------------------------------
// signup           post      /hotel/signup
// signin           post      /hotel/signin
// pending bids     post      /hotel/bid/:hotel_ID
// settled bids     post      /hotel/bid/:hotel_ID/:start_Date/:end_Date
//                            Date format -> yyyy-mm-dd
// bid              put       /hotel/:booking_Num
// update hotel     post      /hotel/update/:hotel_ID
//
////////////////////////////////////////////////////////////////////////


export default (express) => {
  let router = express.Router();

  router.get('/', (req, res) => {
    res.status(200).sendFile('index.html', { root: path.join(__dirname, '../../manager/') });
  });

  router.post('/signup', (req, res) => {
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
      res.status(500).send(error);
    })
  });

  router.post('/signin', (req, res) => {
    db.Hotel.findAll({ where: {
      hotel_ID: req.body.hotel_ID,
      hotel_PW: req.body.hotel_PW
    }})
    .then((hotel) => {
      console.log('successfully loged in');
      console.log(hotel[0].dataValues);
      res.status(200).send(hotel[0].dataValues);
    })
    .catch((error) => {
      console.log("cannot log in:", error);
      res.status(404).send(error);
    })
  });

  router.get('/bid/:hotel_ID', (req, res) => {
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
      let results = [];
      for (let i = 0; i < deals.length; i++) {
        console.log(deals[i].dataValues);
        results.push(deals[i].dataValues);
      }
      res.status(200).send(results);
    })
    .catch((error) => {
      console.log("cannot retrieve bids information: ", error);
      res.status(500).send(error);
    })
  });

  router.get('/bid/:hotel_ID/:booking_Num', (req, res) => {
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
      res.status(200).send(deal.dataValues);
    })
    .catch((error) => {
      console.log("cannot retrieve bid information: ", error);
      res.status(500).send(error);
    })
  });

  router.get('/contracted/:hotel_ID', (req, res) => {
    db.Deal.findAll({
      where: {
        hotel_ID: req.params.hotel_ID,
        bid_Transaction: true
      }
    })
    .then((deals) => {
      console.log('>>>> deals');
      let results = [];
      for (let i = 0; i < deals.length; i++) {
        console.log(deals[i].dataValues);
        results.push(deals[i].dataValues);
      }
      res.status(200).send(results);
    })
    .catch((error) => {
      console.log("cannot get contract bids information: ", error);
      res.status(500).send(error);
    })
  });

  router.get('/contracted/:hotel_ID/:booking_Num', (req, res) => {
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
      res.status(200).send(deal.dataValues);
    })
    .catch((error) => {
      console.log("cannot get contracted bid information: ", error);
      res.status(500).send(error);
    })
  });

  router.put('/bid/:hotel_ID/:booking_Num', (req, res) => {
    // first check whether this bid is already captured
    db.Deal.findOne({
      where: {
        booking_Num: req.params.booking_Num
      }
    })
    .then((deal) => {
      if (deal.dataValues.bid_Transaction === false) {
        return db.Deal.update({
          hotel_ID: req.params.hotel_ID,
          bid_Transaction: true
        }, {
          where: {
            booking_Num: req.params.booking_Num
          }
        })
      } else {
        return "captured deal";
      }
    })
    .then((result) => {
      console.log('bid result: ', result);
      res.status(200).send(result);
    })
    .catch((error) => {
      console.log("cannot update deal DB: ", error);
      res.status(500).send(error);
    })
  });

  router.post('/update/:hotel_ID', (req, res) => {
    db.Hotel.findOne({
      where: {
        hotel_ID: req.params.hotel_ID
      }
    })
    .then((hotel) => {
      return hotel.dataValues;
    })
    .then((hotel) => {
      var data = {};
      var body = req.body;

      body.hotel_PW === undefined ? 
        data.hotel_PW = hotel.hotel_PW : 
        data.hotel_PW = body.hotel_PW; 

      body.hotel_Name === undefined ?
        data.hotel_Name = hotel.hotel_Name :
        data.hotel_Name = body.hotel_Name;

      body.hotel_Address === undefined ?
        data.hotel_Address = hotel.hotel_Address :
        data.hotel_Address = body.hotel_Address;

      body.mainArea_Name === undefined ?
        data.mainArea_Name = hotel.mainArea_Name :
        data.mainArea_Name = body.mainArea_Name;

      body.subArea_Name === undefined ?
        data.subArea_Name = hotel.subArea_Name :
        data.subArea_Name = body.subArea_Name;  

      body.hotel_Rate === undefined ?
        data.hotel_Rate = +hotel.hotel_Rate :
        data.hotel_Rate = +body.hotel_Rate;

      body.mgr_Name === undefined ?
        data.mgr_Name = hotel.mgr_Name :
        data.mgr_Name = body.mgr_Name;

      return data;
    })
    .then((data) => {

      return db.Hotel.update({
        hotel_PW: data.hotel_PW,
        hotel_Name: data.hotel_Name,
        hotel_Address: data.hotel_Address,
        mainArea_Name: data.mainArea_Name,
        subArea_Name: data.subArea_Name,
        hotel_Rate: data.hotel_Rate,
        mgr_Name: data.mgr_Name
      }, {
        where: {
          hotel_ID: req.params.hotel_ID
        }
      })      
    })
    .then((result) => {
      console.log("#of updated rows: ", result);
      res.status(200).send("successfully updated");
    })
    .catch((error) => {
      console.log("cannot update user information:", error);
      res.status(500).send(error);
    })
  });

  return router;
};
