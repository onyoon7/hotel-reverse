import db from '../db';
import path from 'path';

export default {
  getHome: (req, res) => {
    res.status(200).sendFile('index.html', { root: path.join(__dirname, '../../admin/') });
  },

  // find all the bids to be settled
  pendingBids: function(req, res) {

    db.Deal.findAll({ 
      where: { 
        bid_Transaction: false 
      } 
    })
    .then(function(deals) {
      let results = [];
      for(let i = 0; i < deals.length; i++) {
        results.push(deals[i].dataValues);
        console.log(deals[i].dataValues);
      }
      res.status(200).send(results);
    })
    .catch(function(error) {
      console.log("fail to get pending bid transactions", error);
      res.status(404).send(error);
    })
  },


  // find the specific bit to be settled
  pendingBid: function(req, res) {

    db.Deal.findOne({
      where: {
        booking_Num: req.params.booking_Num
      }
    })
    .then(function(deal) {
      console.log(deal.dataValues);
      res.status(200).send(deal.dataValues);
    })
    .catch(function(error) {
      console.log("fail to get pending bid transaction", error);
      res.status(404).send(error);
    })
  },


  // find all the settled bids
  contractedBids: function(req, res) {

    db.Deal.findAll({
      where: {
        bid_Transaction: true
      }
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
      console.log("cannot retrieve bid information: ", error);
      res.status(404).send(error);
    })
  },


  // find the specific settled bid
  contractedBid: function(req, res) {

    db.Deal.findOne({
      where: {
        booking_Num: req.params.booking_Num
      }
    })
    .then(function(deal) {
      console.log(deal.dataValues);
      res.status(200).send(deal.dataValues);
    })
    .catch(function(error) {
      console.log("cannot retrieve bid information: ", error);
      res.status(404).send(error);
    })
  },


  // find all the hotels registered
  getHotels: function(req, res) {

    db.Hotel.findAll()
    .then((hotels) => {
      let results = [];
      for (let i = 0; i < hotels.length; i++) {
        results.push(hotels[i].dataValues);
        console.log(hotels[i].dataValues);
      }
      res.status(200).send(results);
    })
    .catch((error) => {
      console.log("fail to retrieve hotel information:", error);
      res.status(404).send(error);
    })
  },


  // find the specific hotel
  getHotel: function(req, res) {
    
    db.Hotel.findOne({ 
      where: { 
        hotel_ID: req.params.hotel_ID 
      }
    })
    .then(function(hotel) {
      console.log('getHotel: ' + req.params.hotel_ID);
      console.log(hotel.dataValues);
      res.status(200).send(hotel.dataValues);
    })
    .catch((error) => {
      console.log("fail to retrieve hotel information: ",
                  req.params.hotel_ID, error);
      res.status(404).send(error);
    })
  },


  // find all the hotels in specified region
  getHotelsByRegion: (req, res) => {

    db.Hotel.findAll({
      where: { 
        subArea_Name: req.params.subArea_Name 
      }
    })
    .then(function(hotels) {
      let results = [];
      for (let i = 0; i < hotels.length; i++) {
        console.log(hotels[i].dataValues);
        results.push(hotels[i].dataValues);
      }
      res.status(200).send(results);
    })
    .catch(function(error) {
      console.log("fail to retrieve hotel information(region): ", error);
      res.status(404).send(error);
    })
  },


  // find all the clients
  getClients: (req, res) => {

    db.Client.findAll()
    .then(function(clients) {
      let results = [];
      for (let i = 0; i < clients.length; i++) {
        console.log(clients[i].dataValues);
        results.push(clients[i].dataValues);
      }
      res.status(200).send(results);
    })
    .catch(function(error) {
      console.log("cannot retrieve clients information:", error);
      res.status(404).send(error);
    })
  },


  // find the specific client
  getClient: function(req, res) {

    db.Client.findOne({ 
      where: { 
        client_Email: req.params.client_Email 
      } 
    })
    .then(function(result) {
      console.log(result.dataValues);
      res.status(200).send(result.dataValues);
    })
    .catch(function(error) {
      console.log("cannot retrieve client information:", error);
      res.status(404).send(error);
    })
  },


  // delete the specified hotel
  deleteHotel: function(req, res) {
    
    db.Hotel.destroy({ 
      where: { 
        hotel_ID: req.params.hotel_ID 
      } 
    })
    .then(function(result) {
      console.log('result is :' + result);
      res.status(200).send('successfully deleted');
    })
    .catch(function(error) {
      console.log("fail to delete ", 
                  req.params.hotel_ID, " :", error);
      res.status(500).send(error);
    })
  },


  // delete the specified client
  deleteClient: function(req, res) {

    db.Client.destroy({ 
      where: {
        client_Email: req.params.client_Email 
      }
    })
    .then(function(result) {
      console.log('result is : ' + result);
      res.status(200).send(result);
    })
    .catch(function(error) {
      console.log("fail to delete ", 
                  req.params.client_Email, " :", error);
      res.status(500).send(error);
    })
  }
};
