import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  AsyncStorage,
  RecyclerViewBackedScrollView,
} from 'react-native';

import axios from 'axios';
import config from './config';

class MyPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows([]),
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
      let bidArray = [];
      response.data.forEach((val) => {
        for (let key in val) {
          if (key === 'checkIn_Date' || key === 'checkOut_Date'
            || key === 'bid_StartTime' || key === 'bid_EndTime') {
            bidArray.push(key + ': ' + this._convertDate(new Date(val[key])));
          } else if (key === 'hotel_ID') {
            bidArray.push(`호텔명: ${val[key]}`);
          } else if (key === 'mainArea_Name') {
            bidArray.push(`지역: ${val[key]}`);
          } else if (key === 'subArea_Name') {
            bidArray[bidArray.length-1] = bidArray[bidArray.length-1].concat(`, ${val[key]}`);
          } else if (key === 'bid_Price') {
            bidArray.push(`가격: ${val[key]}`);
          }
        }
      });

      console.log(bidArray);

      let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.onValueChange('dataSource', ds.cloneWithRows(bidArray));
    }).catch((error) => {
      console.log('client bid: ', error);
    });
  }

  componentWillMount() {
    //let name = ['호텔명', '체크인 날짜', '체크아웃 날짜', '지역', '가격'];
    //this.name = name.join(' | ');
    this.getMyBids();
  }

  _renderSeperator(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={[{
          height: adjacentRowHighlighted ? 4 : 1,
          backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
        }, styles.separator]}
      />
    );
  }

  _renderRow(rowData: string, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
    return (
      <View>
        <View style={styles.centeredRow}>
          <Text style={styles.text}>
            {rowData}
          </Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Text style={styles.title}>
          결제 내역
        </Text>

        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
          renderSeparator={this._renderSeperator}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centeredRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginLeft: 30,
    marginRight: 30,
    padding: 15,
  },
  separator: {
    marginLeft: 30,
    marginRight: 30,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
    margin: 10,
    marginTop: 30,
    marginBottom: 40,
  },
  text: {
    fontSize: 17,
    color: 'black',
    marginRight: 10,
  },
});

export default MyPage;
