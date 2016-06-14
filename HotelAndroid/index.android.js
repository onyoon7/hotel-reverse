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
  DatePickerAndroid,
  TouchableWithoutFeedback,
} from 'react-native';
import Button from 'react-native-button';
import DropDown, {
  Select,
  Option,
  OptionList,
} from 'react-native-selectme';

class HotelAndroid extends Component {
  state = {
    location: '',
    checkinDate: new Date(),
    checkinText: '체크인 날짜 선택',
    checkoutDate: new Date(),
    checkoutText: '체크아웃 날짜 선택',
    roomNumber: 1,
  }

  _getOptionList() {
    return this.refs['OPTIONLIST'];
  }

  _location(area) {
    this.setState({
      ...this.state,
      location: area
    });
  }

  _incRoomNumber() {
    if (this.state.roomNumber < 9) {
      this.setState({
        ...this.state,
        roomNumber: this.state.roomNumber+1,
      });
    }
  }

  _decRoomNumber() {
    if (this.state.roomNumber > 1) {
      this.setState({
        ...this.state,
        roomNumber: this.state.roomNumber-1,
      });
    }
  }

  _handlePress() {
    console.log('pressed!');
  }

  async showPicker(stateKey, options) {
    try {
      var newState = {};
      const {action, year, month, day} = await DatePickerAndroid.open(options);
      if (action === DatePickerAndroid.dismissedAction) {
        //newState[stateKey + 'Text'] = 'dismissed';
      } else {
        var date = new Date(year, month, day);
        newState[stateKey + 'Text'] = date.toLocaleDateString();
        newState[stateKey + 'Date'] = date;
      }
      this.setState(newState);
    } catch ({code, message}) {
      console.warn(`Error in example '${stateKey}': `, message);
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Text style={styles.appName}>
          HOTEL REVERSE
        </Text>

        <View style={{flex: 1}}>
          <View style={styles.rowContainer}>
            <Text style={styles.label}>지역</Text>
            <Select
              width={250}
              ref="SELECT1"
              optionListRef={this._getOptionList.bind(this)}
              defaultValue="지역을 선택"
              onSelect={this._location.bind(this)}>
              <Option>서울</Option>
              <Option>대전</Option>
              <Option>대구</Option>
              <Option>제주</Option>
            </Select>
          </View>

          <View style={styles.rowContainer}>
            <Text style={styles.label}>체크인</Text>
            <TouchableWithoutFeedback
                onPress={this.showPicker.bind(this, 'checkin', {
                  date: this.state.checkinDate,
                  minDate: this.state.checkinDate,
                  maxDate: new Date().setDate(this.state.checkinDate.getDate() + 14),
                })}>
              <View>
                <Text style={styles.text}>{this.state.checkinText}</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>

          <View style={styles.rowContainer}>
            <Text style={styles.label}>체크아웃</Text>
            <TouchableWithoutFeedback
                onPress={this.showPicker.bind(this, 'checkout', {
                  date: this.state.checkoutDate,
                  minDate: this.state.checkinDate,
                  maxDate: new Date().setDate(this.state.checkinDate.getDate() + 7),
                })}>
              <View>
                <Text style={styles.text}>{this.state.checkoutText}</Text>
              </View>
            </TouchableWithoutFeedback>

          </View>

          <View style={styles.rowContainer}>
            <Text style={styles.label}>객실수</Text>
            <Button
              onPress={() => this._decRoomNumber()}>
              -&nbsp;
            </Button>
            <Text>{this.state.roomNumber}</Text>
            <Button
              onPress={() => this._incRoomNumber()}>
              &nbsp;+
            </Button>
          </View>

          <OptionList ref="OPTIONLIST"/>
        </View>

        <View style={{margin: 10}}>
          <Button style={styles.button}
            containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'green'}}
            onPress={() => this._handlePress()}>
            호텔 검색
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  appName: {
    fontSize: 20,
    textAlign: 'center',
    color: '#000',
    margin: 10,
  },
  label: {
    width: 60,
    textAlign: 'left',
    margin: 10,
  },
  button: {
    fontSize: 20,
    color: 'white',
  }
});

AppRegistry.registerComponent('HotelAndroid', () => HotelAndroid);
