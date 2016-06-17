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
import HotelSignin from './hotelSignin';
import Register from './register';

let _navigator;

class HotelAndroid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchData: {
        location : '',
        checkinText : '체크인 날짜 선택',
        checkoutText : '체크아웃 날짜 선택',
        roomNumber: 1
      },
      bidData: {
        hotel_Rate : 3,
        hotel_SubArea : '강남',
        bidding_Price : 35000
      },
      signinData: {
        client_email : ''
      }

    };

    this.searchStateChanged = this.searchStateChanged.bind(this);
    this.bidStateChanged = this.bidStateChanged.bind(this);
    this.signinStateChanged = this.signinStateChanged.bind(this);
    this.navigatorRenderScene = this.navigatorRenderScene.bind(this);

  }

  searchStateChanged(location, checkinText, checkoutText, roomNumber) {
    searchData = {
      location : location,
      checkinText : checkinText,
      checkoutText : checkoutText,
      roomNumber: roomNumber
    }
    this.setState({
      searchData : searchData
    });
  }

  bidStateChanged(hotel_Rate, hotel_SubArea, bidding_Price) {
    bidData = {
      hotel_Rate : hotel_Rate,
      hotel_SubArea : hotel_SubArea,
      bidding_Price : bidding_Price
    }
    this.setState({
      bidData: bidData
    });
  }

  signinStateChanged(client_email) {
    signinData ={
      client_email : client_email
    }

    this.setState({
      signinData : signinData
    });
  }

  navigatorRenderScene(route, navigator) {
    _navigator = navigator;
    switch (route.id) {
      case 'search':
        return (<HotelSearch navigator={navigator} onChange={this.searchStateChanged}/>);
      case 'bid':
        return (<HotelBid navigator={navigator} onChange={this.bidStateChanged}/>);
      case 'signin':
        return (<HotelSignin navigator={navigator} onChange={this.signinStateChanged}/>);
      case 'register':
        return (<Register navigator={navigator}/>);
      case 'bidInfo':
        return (<GetLatestBidInfo navigator={navigator} searchData={this.state.searchData} bidData={this.state.bidData} signinData={this.state.signinData}/>);
      case 'thanks':
        return (<ThanksALot navigator={navigator}/>);
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
