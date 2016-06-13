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
import DropDown, {
  Select,
  Option,
  OptionList,
} from 'react-native-selectme';

class HotelAndroid extends Component {
  static defaultProps = {
    ds: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
  }

  state = {
    dataSource: this.props.ds.cloneWithRows(['지역', '체크인', '체크아웃', '객실수', '투숙객']),
    location: ''
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

  _roomNumber(number) {
    this.setState({
      ...this.state,
      roomNumber: number
    });
  }

  _adult(number) {
    this.setState({
      ...this.state,
      adult: number
    });
  }

  _child(number) {
    this.setState({
      ...this.state,
      child: number
    });
  }

  _handlePress() {
    console.log('pressed!');
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
              defaultValue="지역을 선택해주세요"
              onSelect={this._location.bind(this)}>
              <Option>서울</Option>
              <Option>대전</Option>
              <Option>대구</Option>
              <Option>제주</Option>
            </Select>
          </View>

          <View style={styles.rowContainer}>
            <Text style={styles.label}>객실수</Text>
            <Select
              width={250}
              ref="SELECT2"
              optionListRef={this._getOptionList.bind(this)}
              defaultValue="객실수를 선택해주세요"
              onSelect={this._roomNumber.bind(this)}>
              <Option>1</Option>
              <Option>2</Option>
              <Option>3</Option>
            </Select>
          </View>

          <View style={styles.rowContainer}>
            <Text style={styles.label}>투숙객</Text>
            <Select
              width={50}
              ref="SELECT3"
              optionListRef={this._getOptionList.bind(this)}
              defaultValue="성인수를 선택해주세요"
              onSelect={this._adult.bind(this)}>
              <Option>1</Option>
              <Option>2</Option>
              <Option>3</Option>
            </Select>

            <Select
              width={50}
              ref="SELECT4"
              optionListRef={this._getOptionList.bind(this)}
              defaultValue="아동수를 선택해주세요"
              onSelect={this._child.bind(this)}>
              <Option>1</Option>
              <Option>2</Option>
              <Option>3</Option>
            </Select>
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
    width: 50,
    textAlign: 'left',
    margin: 10,
  },
  button: {
    fontSize: 20,
    color: 'white',
  }
});

AppRegistry.registerComponent('HotelAndroid', () => HotelAndroid);
