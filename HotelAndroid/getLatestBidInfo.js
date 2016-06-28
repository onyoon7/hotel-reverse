import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TextInput,
  AsyncStorage,
  ToastAndroid,
} from 'react-native';

import Button from 'react-native-button';
import axios from 'axios';
import config from './config';

const IMP_KEY = '3372420065794528';
const IMP_SECRET = 'YwZIGQT4cEjESlJwSwrk4HadQE2QN4qLBpuhgnms2F7V1QrTmSdrAnEq2HhPLHBm76Enu0PwFXrGNTAa';
const MERCHANT_UID = 'nictest14m';

const validUnderlineColor = null; 
const invalidUnderlineColor = 'red';
/*----------------------------------------------------------------
  Structure
  Header: Your Wish List
  Body: Bidding Info
  Footer: <Are you sure?> <No, I'm not sure!> buttons
 ----------------------------------------------------------------*/
class GetLatestBidInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      card_number: '',
      expiry: '',
      birth: '',
      pwd_2digit: '',
      client_Email: '',
      underlineColor1: validUnderlineColor,
      underlineColor2: validUnderlineColor,
      underlineColor3: validUnderlineColor,
      underlineColor4: validUnderlineColor,
    }

    this.focusNextField = this.focusNextField.bind(this);
    this.promptConfirmMsg = this.promptConfirmMsg.bind(this);
    this.validateInput = this.validateInput.bind(this);
  }

  async _handlePress(where) {

    switch (where) {
    case 'thanks':
      let token;
      try {
        token = (await axios.post('https://api.iamport.kr/users/getToken', {
          'imp_key': IMP_KEY,
          'imp_secret': IMP_SECRET,
        })).data.response.access_token
      } catch (error) {
        console.error('token err: ', error);
      }

      let resp;
      try {
        resp = (await axios.post('https://api.iamport.kr/subscribe/payments/onetime?_token=' + token, {
          merchant_uid: MERCHANT_UID,
          amount: this.props.bidData.bid_Price,
          card_number: this.state.card_number,
          expiry: this.state.expiry,
          birth: this.state.birth,
          pwd_2digit: this.state.pwd_2digit,
        })).data.response;
      } catch (error) {
        console.error('payment err: ', error);
      }

      //console.log(this.bidInfo, this.state.client_Email, resp);
      axios({
        url: config.serverUrl + '/client/bid/' + this.state.client_Email,
        method: 'put',
        data: {
          checkIn_Date: this.props.searchData.checkIn_Date,
          checkOut_Date: this.props.searchData.checkOut_Date,
          mainArea_Name: this.props.searchData.mainArea_Name,
          subArea_Name: this.props.bidData.subArea_Name,
          bid_Price: this.props.bidData.bid_Price,
          imp_uid: resp.imp_uid,
        }
      }).then(function(response) {
        console.log(response);
        this.props.navigator.push({id: 'thanks'});
      }).catch(function(error) {
        console.log('client bid: ', error);
      });

      break;
    case 'search':
      this.props.navigator.push({id: 'search'});
      // back to bid page
      break;
    }
  }

  onValueChange(key: string, value: string) {
    const newState = {};
    newState[key] = value;
    this.setState(newState);
  }

  async componentWillMount() {
    var email = await AsyncStorage.getItem('client_Email');
    this.onValueChange('client_Email', email);
  }

  focusNextField(nextField) {
    this.refs[nextField].focus();
  }

  promptConfirmMsg() {
    if (!this.state.underlineColor1 && !this.state.underlineColor2 &&
      !this.state.underlineColor3 && !this.state.underlineColor4) {
      const alertMessage = '조심해라. 한번 체결되면 바로 돈 나간다!!!!'
      Alert.alert('check', alertMessage, [
          {text : 'Cancel', onPress: () => console.log('진행 취소')},
          {text : 'OK', onPress: () => this._handlePress('thanks')}
      ])
    } else {
      const msg = '정보를 입력해주세요';
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    }
  }

  validateInput(fieldIdx, maxLen, text) {
    if (maxLen > text.length) {
      this.onValueChange('underlineColor'+fieldIdx, invalidUnderlineColor);
    } else {
      this.onValueChange('underlineColor'+fieldIdx, validUnderlineColor);
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.rowContainer}>
          <Text style={styles.title}>
            Your Wish List
          </Text>
        </View>

        <View style={styles.rowContainer}>
          <Text style={styles.category}>
            고객 정보
          </Text>
        </View>

        <View style={styles.smallRowContainer}>
          <Text style={styles.label}>
            고객 이메일&nbsp;:&nbsp;
          </Text>
          <Text style={styles.label}>
            {this.state.client_Email}
          </Text>
        </View>

        <View style={styles.smallRowContainer}>
          <Text style={styles.label}>
            희망 지역&nbsp;:&nbsp;
          </Text>
          <Text style={styles.label}>
            {`${this.props.searchData.mainArea_Name} ${this.props.bidData.subArea_Name}`}
          </Text>
        </View>

        <View style={styles.smallRowContainer}>
          <Text style={styles.label}>
            체크인 날짜&nbsp;:&nbsp;
          </Text>
          <Text style={styles.label}>
             {this.props.searchData.checkIn_Date}
          </Text>
        </View>

        <View style={styles.smallRowContainer}>
          <Text style={styles.label}>
            체크아웃 날짜&nbsp;:&nbsp;
          </Text>
          <Text style={styles.label}>
             {this.props.searchData.checkOut_Date}
          </Text>
        </View>

        <View style={styles.smallRowContainer}>
          <Text style={styles.label}>
            희망 가격&nbsp;:&nbsp;
          </Text>
          <Text style={styles.label}>
             {this.props.bidData.bid_Price}
          </Text>
        </View>

        <View style={styles.rowContainer}>
          <Text style={styles.category}>
            카드 정보
          </Text>
        </View>


        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            번호
          </Text>
          <TextInput
            ref="1"
            style={[{width: 180}, styles.textInput]}
            keyboardType="numeric"
            returnKeyType="next"
            maxLength={16}
            onChangeText={(text) => this.onValueChange('card_number', text)}
            placeholder="0000 0000 0000 0000"
            onSubmitEditing={() => this.focusNextField('2')}
            onEndEditing={(event) => this.validateInput(1, 16, event.nativeEvent.text)}
            underlineColorAndroid={this.state.underlineColor1}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            만료일
          </Text>
          <TextInput
            ref="2"
            style={[{width: 100}, styles.textInput]}
            keyboardType="numeric"
            returnKeyType="next"
            maxLength={6}
            onChangeText={(text) => this.onValueChange('expiry', text)}
            placeholder="YYYYMM"
            onSubmitEditing={() => this.focusNextField('3')}
            onEndEditing={(event) => this.validateInput(2, 6, event.nativeEvent.text)}
            underlineColorAndroid={this.state.underlineColor2}
          />

          <Text style={styles.label}>
            비밀번호 앞 두 자리
          </Text>
          <TextInput
            ref="3"
            style={[{width: 50}, styles.textInput]}
            keyboardType="numeric"
            returnKeyType="next"
            maxLength={2}
            secureTextEntry={true}
            onChangeText={(text) => this.onValueChange('pwd_2digit', text)}
            placeholder="00"
            onSubmitEditing={() => this.focusNextField('4')}
            onEndEditing={(event) => this.validateInput(3, 2, event.nativeEvent.text)}
            underlineColorAndroid={this.state.underlineColor3}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            생년월일
          </Text>
          <TextInput
            ref="4"
            style={[{width: 80}, styles.textInput]}
            keyboardType="numeric"
            returnKeyType="done"
            maxLength={6}
            onChangeText={(text) => this.onValueChange('birth', text)}
            placeholder="YYMMDD"
            onSubmitEditing={this.promptConfirmMsg}
            onEndEditing={(event) => this.validateInput(4, 6, event.nativeEvent.text)}
            underlineColorAndroid={this.state.underlineColor4}
          />
        </View>

        <View style={styles.rowContainer}>
          <Button style={styles.searchBtnText}
            containerStyle={styles.searchBtn}
            onPress={this.promptConfirmMsg}>
            신청하기
          </Button>
        </View>

        <View style={styles.rowContainer}>
          <Button style={styles.searchBtnText}
            containerStyle={styles.searchBtn}
            onPress={() => this._handlePress('search')}>
            처음으로 돌아가기
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
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 30,
    marginBottom: 5,
  },
  title: {
    fontSize: 20,
    color: 'black',
  },
  label: {
    textAlign: 'left',
    color: 'black',
    fontSize: 15,
  },
  category: {
    textAlign: 'left',
    margin: 10,
    color: 'black',
    fontSize: 18,
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
  textInput: {
    marginLeft: 5,
    marginRight: 5,
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
  }
});

export default GetLatestBidInfo;
