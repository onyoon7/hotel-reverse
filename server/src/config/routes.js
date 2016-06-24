/*-------------------------------------------------------------------
  <routes.js>
    - define all the routes to the server
 *-------------------------------------------------------------------*/

/*
  1. client
    - signup
    - signin
    - bid
    - retrieve contract(all)
    - retrieve contract(specific)
    - cancel contract
    - feedback
    - update user information
  2. hotel
    - signup
    - signin
    - retrieve pending bids
    - retrieve settled bids
    - bid (try to bid)
    - update hotel(including hotel manager) information
  3. user(admin)
    - pending bid
    - settled bid
    - retrieve hotels
    - retrieve hotel
    - retrieve hotels (sub area)
    - retrieve clients
    - retrieve client
    - delete user
    - delete hotel
 */

import clientController from '../controllers/clientController';
import hotelController from '../controllers/hotelController';
import adminController from '../controllers/adminController';
import dealController from '../controllers/dealController';
import helpers from '../config/helpers';

import Client from '../db';
import Deal from '../db';
import Hotel from '../db';

export default (app, express) => {

  app.post('/deal/bid', dealController.bid);

  //////////////////////////////////////////////////////////////////////////
  // client
  //
  // function        method    url
  // ----------------------------------------------------------------------
  // signup          post,     /client/signup
  // signin          post,     /client/signin
  // bid             put       /client/bid/:client_Email (or id)
  // bid(all)        post      /client/bid/:client_Email (or :email or :phone)
  // bid(specific)   post      /user/bid/:client_Email/:booking_Num
  // cancel bid      delete    /client/bid/:client_Email/:booking_Num
  // feedback        post      /client/feedback/:client_Email/:booking_Num
  // update client   post      /client/info/:client_Email
  //
  ////////////////////////////////////////////////////////////////////////

  app.post('/client/signup', clientController.signUp);  // checked
  app.post('/client/signin', clientController.signIn);  // checked

  app.use('/client/auth', helpers.jwtCheck);
  app.get('/client/auth/check', (req, res) => {
    res.send(req.user.client_Email);
  });

  app.put('/client/bid/:client_Email', clientController.makeContract);

  app.post('/client/bid/:client_Email', clientController.getAllContracts); // checked
  app.post('/client/bid/:client_Email/:booking_Num', clientController.getContract); // checked

  //app.delete('/client/bid/:client_Email/:booking_Num', clientController.cancelContract);
  //app.post('/client/feedback/:client_Email/:booking_Num', clientController.makeFeedback);

  app.post('/client/info/:client_Email', clientController.updateInfo); // checked

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

  app.post('/hotel/signup', hotelController.signUp);  // checked
  app.post('/hotel/signin', hotelController.signIn);  // checked

  app.get('/hotel/bid/:hotel_ID', hotelController.bidInfo); // checked
  app.get('/hotel/contracted/:hotel_ID', hotelController.contractedBids); // checked

  app.put('/hotel/bid/:hotel_ID/:booking_Num', hotelController.bid); // checked
  app.post('/hotel/update/:hotel_ID', hotelController.updateInfo); // checked

  ////////////////////////////////////////////////////////////////////////
  // admin
  //
  // function         method    url
  // ----------------------------------------------------------------------
  // pending bid      get       /admin/pendigbid
  // settled bid      get       /admin/bidinfo
  // hotels           get       /admin/hotels
  // hotel            get       /admin/hotels/:hotel_ID
  // hotels(area)     get       /admin/hotels/:subArea_Name
  //
  // clients(info)    get       /admin/clients
  // client(info)     get       /admin/clients/:client_Email
  //
  // delete(hotel)    delete    /admin/:hotel_ID
  // delete(client)   delete    /admin/:client_ID
  //
  ////////////////////////////////////////////////////////////////////////

  app.get('/admin/pendingbid', adminController.pendingBid); // checked
  app.get('/admin/bidinfo', adminController.contractedBid); // checked

  app.get('/admin/hotels', adminController.getHotels);      // checked
  app.get('/admin/hotels/:hotel_ID', adminController.getHotel); // checked
  app.get('/admin/hotelarea/:subArea_Name', adminController.getHotelsByRegion); // checked

  app.get('/admin/clients', adminController.getClients);  // checked
  app.get('/admin/clients/:client_Email', adminController.getClient); // checked

  app.delete('/admin/client/:client_Email', adminController.deleteClient);  // checked
  app.delete('/admin/hotel/:hotel_ID', adminController.deleteHotel);  // checked

};
