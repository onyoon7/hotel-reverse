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

  async onLoginPressed() {

  }






  _handlePress(where, bidInfo, client_Email) {
  
    switch (where) {
      case 'thanks':

        var formBody = [];

        for (var key in bidInfo) {
          var encodedKey = encodeURIComponent(key);
          var encodedValue = encodeURIComponent(bidInfo[key]);
        
          formBody.push(encodedKey + "=" + encodedValue);
        }
        console.log(client_Email);
        console.log('before join: >>>>> ', formBody);
        formBody = formBody.join("&");
        console.log('after join: >>>> ', formBody);

        let response = fetch('http://localhost:4444/client/bid/000a@gmail.com', {
          method: 'PUT',
          // headers: {
          //   'Accept': 'application/json',
          //   'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          // },
          // body: formBody
        })
        .then((response) => {
          //let res = response.text();
          if (response.status >= 200 && response.status < 300) {
            console.log('successfully inserted');
          } else {
            console.log('something went wrong', response);
          }
        });

        this.props.navigator.push({id: where});
        break;
      case 'search':
        this.props.navigator.push({id: where});
        // back to bid page
        break;
    }
     

    console.log('nav: ', this.props.navigator);
  }

  render() {
    const bidInfo = {
      checkIn_Date: '2016-07-24',
      checkOut_Date: '2016-07-27',      
      mainArea_Name: '제주도',
      subArea_Name: '서귀포시',
      bid_Price: 200000,
    };

    const client_Email = '000a@gmail.com';

    return (

      <View style={{flex: 1}}>
        <Text style={styles.appName}>
          Your Wish List
        </Text>

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