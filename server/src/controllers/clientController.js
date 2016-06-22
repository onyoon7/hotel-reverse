import db from '../db';
import moment from 'moment';
import helpers from '../config/helpers';

export default {
  signUp: (req, res) => {

    db.Client.create({
      client_ID: req.body.client_ID,
      client_PW: req.body.client_PW,
      client_Name: req.body.client_Name,
      client_Email: req.body.client_Email,
      billingInfo: req.body.billingInfo,
      member: 1
    })
    .then((client) => {
      console.log('client signup: ', client.dataValues);
      res.status(201).send({
        id_token: helpers.createToken(client.dataValues),
      });
    })
    .catch((error) => {
      console.log("fail to register to the DB:", error);
      res.status(400).send("fail to register");
    })
  },

  signIn: (req, res) => {

    db.Client.findAll({ where: {
      client_ID: req.body.client_ID,
      client_PW: req.body.client_PW
    }})
    .then((client) => {
      console.log('successfully loged in');
      console.log(client[0].dataValues);
      res.status(200).send({
        id_token: helpers.createToken(client[0].dataValues),
      });
    })
    .catch((error) => {
      console.log("cannot log in:", error);
      res.send(error);
    })

  },

  getAllContracts: (req, res) => {

    db.Client.findOne({ client_Email: req.params.client_Email })
    .then((client) => {
      console.log(client.dataValues.client_Index);
      return client.dataValues.client_Index;
    })
    .then((client_Index) => {
      return db.Deal.findAll({
        where: {
          client_Index: client_Index,
          bid_Transaction: true
        }
      })
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
      console.log("cannot get contract information: ", error);
      res.send(error);
    })

  },

  getContract: (req, res) => {

    db.Client.findOne({ client_Email: req.params.client_Email })
    .then((client) => {
      console.log(client.dataValues.client_Index);
      return client.dataValues.client_Index;
    })
    .then((client_Index) => {
      return db.Deal.findAll({
        where: {
          client_Index: client_Index,
          bid_Transaction: true,
          booking_Num: req.params.booking_Num
        }
      })
    })
    .then((deal) => {
      console.log(deal[0].dataValues);
      res.send(deal[0].dataValues);
    })
    .catch((error) => {
      console.log("cannot get contract information:", error);
      res.send(error);
    })

  },

  makeContract: (req, res) => {

    db.Client.findOne({ client_Email: req.params.client_Email })
    .then((client) => {
      console.log(client.dataValues.client_Index);
      return client.dataValues.client_Index;
    })
    .then((client_Index) => {
      var now = new Date();
      var tomorrow = moment(now).add(1, 'day');

      function makeTime(date) {
        var yyyymmdd = date.toISOString().split('T')[0];
        var second = date.toISOString().split('T')[1];
        var hhmmss = second.split('.')[0];

        return yyyymmdd + ' ' + hhmmss;
      }

      return db.Deal.create({
        client_Index: client_Index,
        checkIn_Date: req.body.checkIn_Date,
        checkOut_Date: req.body.checkOut_Date,
        mainArea_Name: req.body.mainArea_Name,
        subArea_Name: req.body.subArea_Name,
        bid_Price: req.body.bid_Price,
        bid_StartTime: makeTime(now),
        bid_EndTime: makeTime(tomorrow),
        bid_Transaction: false
      })
    })
    .then((bid) =>{
      console.log('>>>> bid');
      console.log(bid.dataValues);
      res.send(bid.dataValues);
    })
    .catch((error) => {
      console.log("fail to make contract: ", error);
      res.send(error);
    })

  },

  cancelContract: (req, res) => {
    // cancel policies needed
  },

  // currently dummy function,
  // later we need to update DB schema to incorporate 'like' into our app
  makeFeedback: (req, res) => {
  },

  updateInfo: (req, res) => {

    db.Client.update({
      client_PW: req.body.client_PW,
      client_Name: req.body.client_Name,
      billingInfo: req.body.billingInfo
    }, {
      where: {
        client_Email: req.params.client_Email
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
