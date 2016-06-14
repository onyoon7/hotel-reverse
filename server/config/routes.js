/*-------------------------------------------------------------------
  <routes.js>
    - define all the routes to the server  
 *-------------------------------------------------------------------*/


// var linksController = require('../links/linkController.js');
// var userController = require('../users/userController.js');
// var helpers = require('./helpers.js'); // our custom middleware


/*
  1. user(customer)
    - signup
      * method: post
      * url: /user/signup
    - signin
      * method: post
      * url: /user/signin
    - request contract
      * method: put
      * url: /user/contract/:userid (or :email or phone)
    - retrieve contract(all)
      * method: get
      * url: /user/:userid (or :email or :phone)
    - retrieve contract(specific)
      * method: post
      * url: /user/contract/:userid/:contractid
    - cancel contract
      * method: delete
      * url: /user/contract/:userid/:contractid
    - feedback
      * method: post
      * url: /user/feedback
    - update user information
      * method: post
      * url: /user/info/:userid
  2. user(hotel manager)
    - signup
      * method: post
      * url: /manager/signup
    - signin
      * method: post
      * url: /manager/signin
    - retrieve bidding information (not yet contracted)
      * method: get
      * url: /manager/bidinfo
    - retrieve bids (from YYYYMMDD to YYYYMMDD, contracted)
      * method: post
      * url: /manager/bidinfo/:yyyymmdd/:yyyymmdd
    - bid (try to bid)
      * method: post
      * url: /manager/bid
    - update hotel(including hotel manager) information
      * method: post
      * url: /manager/hotel
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
    - retrieve pending bid
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
module.exports = function (app, express) {

  // user(customer)
  app.post('/user/signup', userController.signUp);
  app.post('/user/signin', userController.signIn);

  app.put('/user/contract/:userid', userController.makeContract);
  app.get('/user/contract/:userid', userController.getAllcontracts);
  app.post('/user/contract/:userid/:contractid', userController.getContract);
  app.delete('/user/contract/:userid/:contractid', userController.cancelContract);
  
  app.post('/user/feedback/:userid/:contractid', userController.makeFeedback)

  app.post('/user/info/:userid', userController.updateInfo);


  // user(hotel manager)
  app.post('/manager/signup', managerController.singUp);
  app.post('/manager/signin', managerController.signIn);

  // startDate: yyyymmdd, endDate: yyyymmdd
  app.get('/manager/bidinfo', managerController.bidInfo);
  app.post('/manager/bidinfo/:startDate/:endDate', managerController.bidInfoInterval);

  app.post('/manager/bid', managerController.bid);
  app.post('/manager/hotel', managerController.update);
  
  
  // user(admin)
  app.get('/admin', adminController.home);
  // app.post('/admin/signin', adminController.singIn);
  
  // don't need I think, app.delete('/admin/:userid', adminController.deleteUser);
  app.delete('/admin/:hotelid', adminController.deleteHotel);
  
  // startDate: yyyymmdd, endDate: yyyymmdd
  app.get('/admin/pendingbid', adminController.pendingBid);
  app.post('/admin/bidinfo/:startDate/:endDate', adminController.contractedBid);

  app.get('/admin/hotels', adminController.getHotels);
  app.post('/admin/hotels/:hotelid', adminController.getHotel);
  app.get('/admin/hotels/region', adminController.getHotelsByRegion);

  app.get('/admin/users', adminController.getUsers);
  app.post('admin/users/:userid', adminController.getUser);

  app.post('/admin/info', adminController.updateAdmin);

};