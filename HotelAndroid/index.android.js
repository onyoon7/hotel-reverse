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
import HotelSignin from './hotelSignin';
import Register from './register';


let _navigator;

class HotelAndroid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location : '',
      client_email : '',
      checkinText : '체크인 날짜 선택',
      checkoutText : '체크아웃 날짜 선택',
      roomNumber: 1,
      hotel_Rate : 3,
      hotel_SubArea : '강남',
      bidding_Price : 35000,
    };
    this.stateChagned = this.stateChagned.bind(this);
    this.navigatorRenderScene = this.navigatorRenderScene.bind(this);
  }

  searchStateChagned(location, checkinText, checkoutText, roomNumber) {
    this.setState({
      location : location,
      checkinText : checkinText,
      checkoutText : checkoutText,
      roomNumber: roomNumber,
    });
  }

  bidStateChagned(hotel_Rate, hotel_SubArea, bidding_Price) {
    this.setState({
      hotel_Rate : hotel_Rate,
      hotel_SubArea : hotel_SubArea,
      bidding_Price : bidding_Price
    });
  }

  signinStateChagned(client_email) {
    this.setState({
      client_email : client_email,
    });
  }

  navigatorRenderScene(route, navigator) {
    _navigator = navigator;
    switch (route.id) {
      case 'search':
        return (<HotelSearch navigator={navigator} onChange={this.searchStateChagned}/>);
      case 'bid':
        return (<HotelBid navigator={navigator} onChange={this.bidStateChagned}/>);
      case 'signin':
        return (<HotelSignin navigator={navigator} onChange={this.signinStateChagned}/>);
      case 'register':
        return (<Register navigator={navigator} location={this.state.location} {...route.passPorps}/>);
    }
  }

  render() {
    return (
      <Navigator
        initialRoute={{id: 'search'}}
        renderScene={this.navigatorRenderScene}/>
    );
  }
}

//https://facebook.github.io/react-native/docs/backandroid.html
BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator.getCurrentRoutes().length === 1) {
    return false;
  }

  _navigator.pop();
  return true;
});

AppRegistry.registerComponent('HotelAndroid', () => HotelAndroid);
