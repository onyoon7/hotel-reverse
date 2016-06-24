import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  DatePickerAndroid,
  TouchableWithoutFeedback,
  Picker,
  Navigator,
} from 'react-native';

const Item = Picker.Item;
import Button from 'react-native-button';
import axios from 'axios';



/*----------------------------------------------------------------
  Structure
  Header: Your Wish List
  Body: Bidding Info
  Footer: <Are you sure?> <No, I'm not sure!> buttons
 ----------------------------------------------------------------*/
class GetLatestBidInfo extends Component {
  constructor(props) {
    super(props);
  }

  _convertDate(date) {
    var newDate;
    var d = date.split("/");
    var y = d.splice(-1)[0];

    d.splice(0, 0, y);
    newDate = d.join("-");

    return newDate;
  }

  _handlePress(where, bidInfo, client_Email) {

    switch (where) {
      case 'thanks':
        axios({
          url: 'http://192.168.1.4:4444/client/bid/' + client_Email,
          method: 'put',
          data: {
            checkIn_Date: bidInfo.checkIn_Date,
            checkOut_Date: bidInfo.checkOut_Date,
            mainArea_Name: bidInfo.mainArea_Name,
            subArea_Name: bidInfo.subArea_Name,
            bid_Price: bidInfo.bid_Price
          }
        }).then(function(response) {
          console.log(response);
        }).catch(function(error) {
          console.log(error);
        });

        this.props.navigator.push({id: 'thanks'});
        break;
      case 'search':
        this.props.navigator.push({id: 'search'});
        // back to bid page
        break;
    }
  }

  render() {
    const bidInfo = {
      // checkIn_Date: this.props.searchData.checkIn_Date,
      // checkOut_Date: this.props.searchData.checkOut_Date,
      checkIn_Date: this._convertDate(this.props.searchData.checkIn_Date),
      checkOut_Date: this._convertDate(this.props.searchData.checkOut_Date),
      mainArea_Name: this.props.searchData.mainArea_Name,
      subArea_Name: this.props.bidData.subArea_Name,
      bid_Price: +this.props.bidData.bid_Price,
    };

    const client_Email = this.props.bidData.client_Email;

    console.log(this.props.searchData);
    console.log(this.props.searchData.checkIn_Date);
    console.log(this.props.bidData);


    return (

      <View style={{flex: 1}}>
        <Text style={styles.appName}>
          Your Wish List
        </Text>

        <View style={styles.smallRowContainer}>
          <Text>
            {'-  '} 고객 이메일: {client_Email}
          </Text>
        </View>

        <View style={styles.smallRowContainer}>
          <Text>
            {'-  '} 희망 지역: {bidInfo.mainArea_Name + '  ' + bidInfo.subArea_Name}
          </Text>
        </View>

        <View style={styles.smallRowContainer}>
          <Text>
            {'-  '} 체크인 날짜: {' ' + bidInfo.checkIn_Date}
          </Text>
        </View>

        <View style={styles.smallRowContainer}>
          <Text>
            {'-  '} 체크아웃 날짜: {' ' + bidInfo.checkOut_Date}
          </Text>
        </View>

        <View style={styles.smallRowContainer}>
          <Text>
            {'-  '} 희망 가격: {' ' + bidInfo.bid_Price}
          </Text>
        </View>

        <View style={styles.rowContainer}>
          <Button style={styles.searchBtnText}
            containerStyle={styles.searchBtn}
            onPress={() => this._handlePress('thanks', bidInfo, client_Email)}>
            I'm SURE!
          </Button>
        </View>

        <View style={styles.rowContainer}>
          <Button style={styles.searchBtnText}
            containerStyle={styles.searchBtn}
            onPress={() => this._handlePress('search', bidInfo, client_Email)}>
            I'm not SURE!
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
  smallRowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: 30,
    marginTop: 2,
    marginBottom: 2
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
  list: {
    flex: 1,
    padding: 30,
    backgroundColor: 'rgb(39, 174, 96)'
  },
  row: {
    margin: 8,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 20,
    color: 'white'
  }
});

export default GetLatestBidInfo;
