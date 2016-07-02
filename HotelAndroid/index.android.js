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
import ToolbarAndroid from 'ToolbarAndroid';

import SplashPage from './splash';
import TutorialPage from './tutorial';
import HotelSearch from './hotelSearch';
import HotelBid from './hotelBid';
import GetLatestBidInfo from './getLatestBidInfo';
import ThanksALot from './thanksALot';
import HotelSignin from './hotelSignin';
import Register from './register';
import MyPage from './myPage';

let _navigator;
let _toolBar;

class HotelAndroid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flag : false,
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

    this.flagStateChanged = this.flagStateChanged.bind(this);
    this.searchStateChanged = this.searchStateChanged.bind(this);
    this.bidStateChanged = this.bidStateChanged.bind(this);
    this.navigatorRenderScene = this.navigatorRenderScene.bind(this);
    this.openDrawer = this.openDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.renderMenuItem = this.renderMenuItem.bind(this);
  }

  flagStateChanged(flag) {
    this.setState({
      flag : flag,
    })
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

  async _signOut() {
    try {
      await AsyncStorage.removeItem('id_token')
    } catch(error) {
      console.log('signout error : ', error);
    }
  }

  navigatorRenderScene(route, navigator) {
    _navigator = navigator;
    switch (route.id) {
      case 'splash':
        return (<SplashPage navigator={navigator} />);
      case 'search':
        return (<HotelSearch navigator={navigator} onChange={this.searchStateChanged} onFlagChange={this.flagStateChanged} />);
      case 'bid':
        return (<HotelBid navigator={navigator} onChange={this.bidStateChanged} searchData={this.state.searchData}/>);
      case 'signin':
        return (<HotelSignin navigator={navigator} onChange={this.signinStateChanged} naviView={this.changeNaviView()}/>);
      case 'register':
        return (<Register navigator={navigator}/>);
      case 'bidInfo':
        return (<GetLatestBidInfo navigator={navigator} searchData={this.state.searchData} bidData={this.state.bidData} />);
      case 'thanks':
        return (<ThanksALot navigator={navigator}/>);
      case 'tutorial':
        return (<TutorialPage navigator={navigator}/>);
      case 'mypage':
        return (<MyPage navigator={navigator} />);
    }
  }

  openDrawer() {
    this._drawer.openDrawer();
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

  async changeNaviView() {
    let token = await AsyncStorage.getItem('id_token');
    if(token) {
      this.setState({navigationView : (
        <View style={styles.navView}>
          <Button
            containerStyle={styles.drawerBtn}
            style={styles.drawerBtnText}
            onPress={() => {this.renderMenuItem('mypage')}}>결제 내역</Button>
          <Button
            containerStyle={styles.drawerBtn}
            style={styles.drawerBtnText}
            onPress={() => {this._signOut();this.changeNaviView();}}>로그아웃</Button>
        </View>
      )})
    } else {
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
  }

  componentWillMount() {
    this.changeNaviView();
  }

  render() {
    if (this.state.flag) {
          _toolBar = <ToolbarAndroid
            navIcon={require('./assets/img/ic_menu_white_24dp.png')}
            onIconClicked={() => this.openDrawer() }
            style={styles.toolbar}
            title="Hotel Reverse"
            titleColor='white' />
        }
    return (
      <DrawerLayoutAndroid
        ref={(ref) => this._drawer = ref}
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => this.state.navigationView}>
        {_toolBar}
        <View style={{borderColor: 'grey', borderWidth: 0.8}}></View>
        <Navigator
          initialRoute={{id: 'splash'}}
          renderScene={this.navigatorRenderScene}
          configureScene={() => Navigator.SceneConfigs.FadeAndroid}/>
      </DrawerLayoutAndroid>
    );
  }
}

BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator.getCurrentRoutes().length === 2) {
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
  toolbar: {
    backgroundColor: 'green',
    height: 56,
  },
});
