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
import helpers from '../config/helpers';

export default (app, express) => {

  app.use('/client/auth', helpers.jwtCheck);
  app.use('/client', clientController(express));
  app.use('/hotel', hotelController(express));
  app.use('/admin', adminController(express));
};
