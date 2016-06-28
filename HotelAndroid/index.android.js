import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  BackAndroid,
  DrawerLayoutAndroid,
  View,
  StyleSheet,
  AsyncStorage,
} from 'react-native';
import Button from 'react-native-button';

import HotelSearch from './hotelSearch';
import HotelBid from './hotelBid';
import GetLatestBidInfo from './getLatestBidInfo';
import ThanksALot from './thanksALot';
import HotelSignin from './hotelSignin';
import Register from './register';
import axios from 'axios';

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
    };

    this.searchStateChanged = this.searchStateChanged.bind(this);
    this.bidStateChanged = this.bidStateChanged.bind(this);
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
      searchData : searchData,
    });
  }

  bidStateChanged(hotel_Rate, subArea_Name, bid_Price) {
    let bidData = {
      hotel_Rate : hotel_Rate,
      subArea_Name : subArea_Name,
      bid_Price : bid_Price,
    };
    this.setState({
      bidData: bidData,
    });
  }

  async checkToken() {
    var id_token = await AsyncStorage.getItem('id_token');
    this.setState({token : id_token})
  }

  async _signOut() {
    try {
      await AsyncStorage.removeItem('id_token')
    } catch(error) {
      console.log('signout error : ', error);
    }
    var id_token =  await AsyncStorage.getItem('id_token');
    console.log('After signout _ id_token : ',id_token)
  }

  navigatorRenderScene(route, navigator) {
    _navigator = navigator;
    switch (route.id) {
      case 'search':
        return (<HotelSearch navigator={navigator} onChange={this.searchStateChanged}/>);
      case 'bid':
        return (<HotelBid navigator={navigator} onChange={this.bidStateChanged} searchData={this.state.searchData}/>);
      case 'signin':
        return (<HotelSignin navigator={navigator} onChange={this.signinStateChanged} naviView={this.componentWillMount()}/>);
      case 'register':
        return (<Register navigator={navigator}/>);
      case 'bidInfo':
        return (<GetLatestBidInfo navigator={navigator} searchData={this.state.searchData} bidData={this.state.bidData} />);
      case 'thanks':
        return (<ThanksALot navigator={navigator}/>);
    }
  }

  closeDrawer() {
    this._drawer.closeDrawer();
  }

  renderMenuItem(item) {
    if (_navigator.getCurrentRoutes()[_navigator.getCurrentRoutes().length-1].id !== item) {
      _navigator.push({id: item});
    }
    this.closeDrawer();
  }

  _logout() {
    this.setState({navigationView : (
        <View style={styles.navView}>
          <Button
            containerStyle={styles.drawerBtn}
            style={styles.drawerBtnText}
            onPress={() => {this._signOut();this.componentWillMount();}}>로그아웃</Button>
        </View>
      )})
  }

  _login() {
    this.setState({navigationView : (
      <View style={styles.navView}>
        <Button
          containerStyle={styles.drawerBtn}
          style={styles.drawerBtnText}
          onPress={() => {this.renderMenuItem('register')}}>회원가입</Button>
        <Button
          containerStyle={styles.drawerBtn}
          style={styles.drawerBtnText}
          onPress={() => {this.renderMenuItem('signin')}}>로그인</Button>
      </View> )})
  }

  async componentWillMount() {
    let token = await AsyncStorage.getItem('id_token');
    if(token) {
      this._logout();
    } else {
      this._login();
    }
  }

  render() {
    // this.checkToken();
    // console.log(' <<< on redering >>>');
    // let navigationView
    // if(this.state.token) {
    //   navigationView = (
    //     <View style={styles.navView}>
    //       <Button
    //         containerStyle={styles.drawerBtn}
    //         style={styles.drawerBtnText}
    //         onPress={() => {this._signOut()}}>로그아웃</Button>
    //     </View>
    //   )
    // } else {
    //   navigationView = (
    //     <View style={styles.navView}>
    //       <Button
    //         containerStyle={styles.drawerBtn}
    //         style={styles.drawerBtnText}
    //         onPress={() => {this.renderMenuItem('register')}}>회원가입</Button>
    //       <Button
    //         containerStyle={styles.drawerBtn}
    //         style={styles.drawerBtnText}
    //         onPress={() => {this.renderMenuItem('signin')}}>로그인</Button>
    //     </View> )
    // }

    return (
      <DrawerLayoutAndroid
        ref={(ref) => this._drawer = ref}
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => this.state.navigationView}>
        <Navigator
          initialRoute={{id: 'search'}}
          renderScene={this.navigatorRenderScene}
          configureScene={(route, routeStack) => Navigator.SceneConfigs.FadeAndroid}/>
      </DrawerLayoutAndroid>
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
