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
        mainArea_Name : '',
        checkIn_Date : '체크인 날짜 선택',
        checkOut_Date : '체크아웃 날짜 선택',
        room_Number: 1
      },
      bidData: {
        hotel_Rate : 3,
        subArea_Name : '강남',
        bid_Price : 35000
      },
      signinData: {
        client_Email : ''
      }

    };

    this.searchStateChanged = this.searchStateChanged.bind(this);
    this.bidStateChanged = this.bidStateChanged.bind(this);
    this.signinStateChanged = this.signinStateChanged.bind(this);
    this.navigatorRenderScene = this.navigatorRenderScene.bind(this);

  }

  searchStateChanged(mainArea_Name, checkIn_Date, checkOut_Date, room_Number) {
    searchData = {
      mainArea_Name : mainArea_Name,
      checkIn_Date : checkIn_Date,
      checkOut_Date : checkOut_Date,
      room_Number: room_Number
    }
    this.setState({
      searchData : searchData
    });
  }

  bidStateChanged(hotel_Rate, subArea_Name, bid_Price) {
    bidData = {
      hotel_Rate : hotel_Rate,
      subArea_Name : subArea_Name,
      bid_Price : bid_Price
    }
    this.setState({
      bidData: bidData
    });
  }

  signinStateChanged(client_Email) {
    signinData ={
      client_Email : client_Email
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
        return (<HotelBid navigator={navigator} onChange={this.bidStateChanged} searchData={this.state.searchData}/>);
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
