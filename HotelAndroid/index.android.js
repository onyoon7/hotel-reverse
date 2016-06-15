/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
} from 'react-native';

import HotelSearch from './hotelSearch';

class HotelAndroid extends Component {

  navigatorRenderScene(route, navigator) {
    _navigator = navigator;
    switch (route.id) {
      case 'search':
        return (<HotelSearch navigator={navigator}/>);
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

AppRegistry.registerComponent('HotelAndroid', () => HotelAndroid);
