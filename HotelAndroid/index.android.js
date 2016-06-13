/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
} from 'react-native';
import Button from 'react-native-button';
/*const DropDown = require('react-native-dropdown');*/
//const {
  //Select,
  //Option,
  //OptionList,
  //updatePosition
//} = DropDown;

class HotelAndroid extends Component {
  static defaultProps = {
    ds: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
  }

  state = {
    dataSource: this.props.ds.cloneWithRows(['지역', '체크인', '체크아웃', '객실수', '투숙객']),
    location: ''
  }

/*  componentDidMount() {*/
    //updatePosition(this.refs['SELECT1']);
    //updatePosition(this.refs['OPTIONLIST']);
  //}

  //_getOptionList() {
    //return this.refs['OPTIONLIST'];
  //}

  //_location(area) {
    //this.setState({
      //...this.state,
      //location: area
    //});
  /*}*/

  _handlePress() {
    console.log('pressed!');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          HOTEL REVERSE
        </Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>
            <Text>{rowData}</Text>
          }
        />

        <Button
          style={{fontSize: 20, color: 'white'}}
          containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'green'}}
          onPress={() => this._handlePress()}>
          호텔 검색
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    color: '#000',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('HotelAndroid', () => HotelAndroid);
