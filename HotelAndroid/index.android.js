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
  DrawerLayoutAndroid,
  View,
  StyleSheet,
} from 'react-native';
import Button from 'react-native-button';

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
    this.closeDrawer = this.closeDrawer.bind(this);
    this.renderMenuItem = this.renderMenuItem.bind(this);
  }

  searchStateChanged(mainArea_Name, checkIn_Date, checkOut_Date, room_Number) {
    let searchData = {
      mainArea_Name : mainArea_Name,
      checkIn_Date : checkIn_Date,
      checkOut_Date : checkOut_Date,
      room_Number: room_Number
    };
    this.setState({
      searchData : searchData
    });
  }

  bidStateChanged(hotel_Rate, subArea_Name, bid_Price) {
    let bidData = {
      hotel_Rate : hotel_Rate,
      subArea_Name : subArea_Name,
      bid_Price : bid_Price
    };
    this.setState({
      bidData: bidData
    });
  }

  signinStateChanged(client_Email) {
    let signinData ={
      client_Email : client_Email
    };

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

  closeDrawer() {
    this._drawer.closeDrawer();
  }

  renderMenuItem(item) {
    if (_navigator.getCurrentRoutes()[_navigator.getCurrentRoutes().length-1].id !== 'signin') {
      _navigator.push({id: item});
    }
    this.closeDrawer();
  }

  render() {
    var navigationView = (
      <View style={styles.navView}>
        <Button
          containerStyle={styles.drawerBtn}
          style={styles.drawerBtnText}
          onPress={() => {this.renderMenuItem('register')}}>Register</Button>
        <Button
          containerStyle={styles.drawerBtn}
          style={styles.drawerBtnText}
          onPress={() => {this.renderMenuItem('signin')}}>Sign in</Button>
      </View>
    );

    return (
      <DrawerLayoutAndroid
        ref={(ref) => this._drawer = ref}
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => navigationView}>
        <Navigator
          initialRoute={{id: 'search'}}
          renderScene={this.navigatorRenderScene}/>
      </DrawerLayoutAndroid>
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

const styles = StyleSheet.create({
  navView: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  drawerBtn: {
    padding: 25,
    height: 30,
    overflow: 'hidden',
    borderColor: 'grey',
    borderWidth: 2,
    borderStyle: 'solid',
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawerBtnText: {
    fontSize: 25,
    color: 'black',
  },
});
