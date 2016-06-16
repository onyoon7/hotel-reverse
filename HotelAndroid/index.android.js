/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  BackAndroid,
} from 'react-native';

import HotelSearch from './hotelSearch';
import HotelBid from './hotelBid';
import GetLatestBidInfo from './getLatestBidInfo';
import ThanksALot from './thanksALot';

let _navigator;

class HotelAndroid extends Component {

  navigatorRenderScene(route, navigator) {
    _navigator = navigator;
    switch (route.id) {
      case 'search':
        return (<HotelSearch navigator={navigator}/>);
      case 'bid':
        return (<HotelBid navigator={navigator}/>);
      case 'bidInfo':
        return (<GetLatestBidInfo navigator={navigator}/>);
      case 'thanks':
        return (<ThanksALot navigator={navigator}/>);
    }
  }

  render() {
    return (
      <Navigator
        initialRoute={{id: 'bidInfo'}}
        renderScene={this.navigatorRenderScene}/>
    );
  }
}

BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator.getCurrentRoutes().length === 1) {
    return false;
  }

  _navigator.pop();
  return true;
});

AppRegistry.registerComponent('HotelAndroid', () => HotelAndroid);
