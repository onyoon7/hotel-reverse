import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  AsyncStorage,
} from 'react-native';

import Button from 'react-native-button';
import axios from 'axios';
import config from './config';

class MyPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bids: [],
    }

    this.onValueChange = this.onValueChange.bind(this);
    this.getMyBids = this.getMyBids.bind(this);
  }

  onValueChange(key: string, value: string) {
    const newState = {};
    newState[key] = value;
    this.setState(newState);
  }

  _convertDate(date) {
    let dd = date.getDate()
    let mm = date.getMonth() + 1;
    let y = date.getFullYear();

    return `${y}-${mm}-${dd}`;
  }


  async getMyBids() {
    let email = await AsyncStorage.getItem('client_Email');

    axios({
      url: config.serverUrl + '/client/bid/' + email,
      method: 'post'
    }).then((response) => {
      // booking_Num, client_Index, hotel_ID, checkIn_Date, checkOut_Date,
      // mainArea_Name, subArea_Name, bid_Price, bid_StartTime, bid_EndTime,
      // bid_Transaction, imp_uid
      let bidArray = response.data.map((val) => {
        let arr = [];
        for (let key in val) {
          if (key !== 'client_Index' && key !== 'booking_Num'
            && key !== 'bid_StartTime' && key !== 'bid_EndTime'
            && key !== 'bid_Transaction' && key !== 'imp_uid') {
            if (key === 'checkIn_Date' || key === 'checkOut_Date'
              || key === 'bid_StartTime' || key === 'bid_EndTime') {
              arr.push(this._convertDate(new Date(val[key])));
            } else {
              arr.push(val[key]);
            }
          }
        }
        return arr;
      });

      console.log(bidArray);

      let bids = bidArray.map((row, i) => {
        let text = row.map((val, i) => {
          return (<Text key={i} style={styles.text}>{val}</Text>);
        });
        //let joined = row.join(' | ');
        //let text = (<Text key={i} style={styles.text}>{joined}</Text>);
        return (<View key={i} style={styles.centeredRow}>{text}</View>);
      });

      this.onValueChange('bids', bids);
    }).catch((error) => {
      console.log('client bid: ', error);
    });
  }

  componentWillMount() {
    let name = ['호텔명', '체크인 날짜', '체크아웃 날짜', '지역', '구/동', '가격'];
    this.name = name.join(' | ');
    this.getMyBids();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Text style={styles.title}>
          결제 내역
        </Text>

        <View style={[{marginBottom: 15}, styles.centeredRow]}>
          <Text style={styles.name}>{this.name}</Text>
        </View>
        {this.state.bids}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centeredRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
    margin: 10,
    marginTop: 30,
    marginBottom: 40,
  },
  name: {
    fontSize: 17,
    color: 'green',
    margin: 5,
  },
  text: {
    fontSize: 17,
    color: 'black',
    marginRight: 10,
  },
});

export default MyPage;
