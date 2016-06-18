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
    - retrieve settled bids (from YYYY-MM-DD to YYYY-MM-DD)
    - bid (try to bid)
    - update hotel(including hotel manager) information
  3. user(admin)
    - start page
      * method: get
      * url: /admin
    - signin
      * method: post
      * url: /admin/signin
    - delete user
      * method: delete
      * url: /admin/:userid
    - delete hotel
      * method: delete
      * url: /admin/:hotelid
    - pending bid
      * method: get
      * url: /admin/pendingbid
    - retrieve contracted bid
      * method: post
      * url: /admin/bidinfo/:yyyymmdd/:yyyymmdd
    - retrieve hotels
      * method: get
      * url: /admin/hotels
    - retrieve hotel
      * method: post
      * url: /admin/hotels/:hotel_id
    - retrieve hotels(region)
      * method: post
      * url: /admin/hotels/region
    - retrieve users
      * method: get
      * url: /admin/users
    - retrieve user
      * method: post
      * url: /admin/users/:userid
    - update admin
      * method: post
      * url: /admin/info
 */

import clientController from '../controllers/clientController';
import hotelController from '../controllers/hotelController';
import adminController from '../controllers/adminController';
import dealController from '../controllers/dealController';

export default function (app, express) {

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
  
  app.post('/client/signup', clientController.signUp);
  app.post('/client/signin', clientController.signIn);

  app.put('/client/bid/:client_Email', clientController.makeContract);

  app.post('/client/bid/:client_Email', clientController.getAllContracts);
  app.post('/client/bid/:client_Email/:booking_Num', clientController.getContract);

  //app.delete('/client/bid/:client_Email/:booking_Num', clientController.cancelContract);
  //app.post('/client/feedback/:client_Email/:booking_Num', clientController.makeFeedback);

  app.post('/client/info/:client_Email', clientController.updateInfo);

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
  
  app.post('/hotel/signup', hotelController.signUp);
  app.post('/hotel/signin', hotelController.signIn);

  //// startDate: yyyymmdd, endDate: yyyymmdd
  app.get('/hotel/bid/:hotel_ID', hotelController.bidInfo);
  app.get('/hotel/contracted/:hotel_ID', hotelController.contractedBids);

  //app.put('/hotel/:booking_Num', hotelController.bid);
  app.post('/hotel/update/:hotel_ID', hotelController.updateInfo);

  ////////////////////////////////////////////////////////////////////////
  // admin
  // 
  // function         method    url
  // ----------------------------------------------------------------------   
  // pending bid      get       /admin/pendigbid
  // settled bid      get       /admin/bidinfo/:start_Date/:end_Date
  //                            Date format -> yyyy-mm-dd
  // hotels           get       /admin/hotels
  // hotel            get       /admin/hotels/hotel_ID
  // hotels(area)     get       /admin/hotels/:subArea_Name
  // 
  // clients(info)    get       /admin/clients
  // client(info)     get       /admin/clients/:client_Email
  // 
  // delete(hotel)    delete    /admin/:hotel_ID
  // delete(client)   delete    /admin/:client_ID    
  // 
  ////////////////////////////////////////////////////////////////////////
 
  app.get('/admin/pendingbid', adminController.pendingBid);
  app.get('/admin/bidinfo/:startDate/:endDate', adminController.contractedBid);

  app.get('/admin/hotels', adminController.getHotels);
  app.get('/admin/hotels/:hotel_ID', adminController.getHotel);
  app.get('/admin/hotelarea/:subArea_Name', adminController.getHotelsByRegion);

  app.get('/admin/clients', adminController.getClients);
  app.get('/admin/clients/:client_Email', adminController.getClient);

  //app.delete('/admin/:client_Id', adminController.deleteUser);
  app.delete('/admin/:hotel_ID', adminController.deleteHotel);


};
