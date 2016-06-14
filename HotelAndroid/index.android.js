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
  TouchableNativeFeedback,
  Picker,
} from 'react-native';
const Item = Picker.Item;
import Button from 'react-native-button';

class HotelAndroid extends Component {
  state = {
    location: '',
    checkinDate: new Date(),
    checkinText: '체크인 날짜 선택',
    checkoutDate: new Date(),
    checkoutText: '체크아웃 날짜 선택',
    roomNumber: 1,
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

  onValueChange(key: string, value: string) {
    const newState = {};
    newState[key] = value;
    this.setState(newState);
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

        <View>
          <View style={styles.rowContainer}>
            <Text style={styles.label}>지역</Text>
            <Picker style={{width: 100}}
              selectedValue={this.state.location}
              onValueChange={this.onValueChange.bind(this, 'location')}
              mode="dropdown">
              <Item label="서울" value="seoul" />
              <Item label="제주" value="jeju" />
            </Picker>
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
        </View>

        <View style={styles.rowContainer}>
          <Button style={styles.searchBtnText}
            containerStyle={styles.searchBtn}
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
    color: 'black',
  },
  searchBtn: {
    width: 150,
    padding:10,
    height: 30,
    overflow: 'hidden',
    borderColor: 'black',
    borderWidth: 2,
    borderStyle: 'solid',
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBtnText: {
    fontSize: 15,
    color: 'white',
  },
});

AppRegistry.registerComponent('HotelAndroid', () => HotelAndroid);
