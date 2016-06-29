import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  DatePickerAndroid,
  TouchableWithoutFeedback,
  Picker,
  ToastAndroid,
  Dimensions,
} from 'react-native';
const Item = Picker.Item;
import Button from 'react-native-button';
import areaInfo from './assets/areaInfo';

const { width } = Dimensions.get('window');

const checkInHolder = '체크인 날짜 선택';
const checkOutHolder = '체크아웃 날짜 선택';

class HotelSearch extends Component {
  constructor(props){
    super(props);

    this.state = {
      mainArea_Name: '서울',
      checkInDate: new Date(),
      checkInText: checkInHolder,
      checkOutDate: new Date(),
      checkOutText: checkOutHolder,
      room_Number: 1,
    }

    this.onValueChange = this.onValueChange.bind(this);
    this.showPicker = this.showPicker.bind(this);
    this.setDropDowns = this.setDropDowns.bind(this);
  }

  _convertDate(date) {
    let dd = date.getDate()
    let mm = date.getMonth() + 1;
    let y = date.getFullYear();

    return `${y}-${mm}-${dd}`;
  }

  _incRoomNumber() {
    if (this.state.room_Number < 9) {
      this.setState({
        ...this.state,
        room_Number: this.state.room_Number+1,
      });
    }
  }

  _decRoomNumber() {
    if (this.state.room_Number > 1) {
      this.setState({
        ...this.state,
        room_Number: this.state.room_Number-1,
      });
    }
  }

  _handlePress() {
    if (this.state.checkInText === checkInHolder ||
      this.state.checkOutText === checkOutHolder) {
      const msg = '정보를 입력해주세요';
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      this.props.navigator.push({id: 'bid'});
      this.props.onChange(this.state.mainArea_Name, this.state.checkInText, this.state.checkOutText, this.state.room_Number);
    }
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
      } else {
        var date = new Date(year, month, day);

        newState[stateKey + 'Text'] = this._convertDate(date);
        newState[stateKey + 'Date'] = date;
      }
      this.setState(newState);
    } catch ({code, message}) {
      console.warn(`Error in example '${stateKey}': `, message);
    }
  }

  setDropDowns() {
    this.dropDowns = Object.keys(areaInfo.area.main).map((val) => {
      return <Item label={val} key={val} value={val} />;
    });
  }

 async componentWillMount() {
    this.setDropDowns();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Text style={styles.title}>
          호텔을 검색하세요
        </Text>

        <View style={styles.rowContainer}>
          <Text style={styles.label}>지역</Text>
        </View>

        <View style={styles.rowContainer}>
          <Picker style={styles.dropdown}
            selectedValue={this.state.mainArea_Name}
            onValueChange={(value) => this.onValueChange('mainArea_Name', value)}
            mode="dropdown">
            {this.dropDowns}
          </Picker>
        </View>

        <View style={[styles.centeredRow]}>
          <View style={[styles.datePickerRow]}>
            <Text style={[styles.label]}>체크인</Text>
          </View>
          <View style={[styles.datePickerRow]}>
            <Text style={[styles.label]}>체크아웃</Text>
          </View>
        </View>

        <View style={[styles.centeredRow]}>
          <TouchableWithoutFeedback
            onPress={() => this.showPicker('checkIn', {
              date: this.state.checkInDate,
              minDate: new Date(),
              maxDate: new Date().setDate(new Date().getDate() + 14),
            })}>
            <View style={styles.datePickerRow}>
              <Text style={styles.text}>{this.state.checkInText}</Text>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress={() => {
              let maxDate = new Date(this.state.checkInDate);
              maxDate.setDate(maxDate.getDate() + 14);

              let options = {
                date: this.state.checkOutDate,
                minDate: this.state.checkInDate,
                maxDate: maxDate,
              };
              this.showPicker('checkOut', options)}}>
              <View style={styles.datePickerRow}>
                <Text style={styles.text}>{this.state.checkOutText}</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>

          <View style={styles.rowContainer}>
            <Text style={styles.label}>객실수</Text>
            <View style={{marginRight: 15}}>
              <Button style={styles.roomBtnText}
                containerStyle={styles.roomBtn}
                onPress={() => this._decRoomNumber()}>
                -
              </Button>
            </View>
            <Text style={styles.text}>{this.state.room_Number}</Text>
            <View style={{marginLeft: 15}}>
              <Button style={styles.roomBtnText}
                containerStyle={styles.roomBtn}
                onPress={() => this._incRoomNumber()}>
                +
              </Button>
            </View>
          </View>

          <View style={[{marginTop: 50}, styles.centeredRow]}>
            <Button style={styles.submitBtnText}
              containerStyle={styles.submitBtn}
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 8,
    marginLeft: 30,
    marginRight: 30,
  },
  centeredRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
    margin: 10,
    marginTop: 30,
    marginBottom: 40,
  },
  label: {
    width: 80,
    textAlign: 'left',
    color: 'grey',
    fontSize: 15,
  },
  submitBtn: {
    width: width - 30,
    padding: 10,
    height: 40,
    overflow: 'hidden',
    borderColor: 'black',
    borderWidth: 2,
    borderStyle: 'solid',
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    fontSize: 18,
    color: 'white',
  },
  roomBtn: {
    width: 28,
    height: 28,
    overflow: 'hidden',
    borderColor: 'green',
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roomBtnText: {
    fontSize: 20,
    color: 'green',
  },
  text: {
    fontSize: 17,
    color: 'green',
  },
  datePickerRow: {
    width: width/2-60,
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 30,
    marginRight: 30,
    justifyContent: 'flex-start',
  },
  dropdown: {
    width: 150,
    height: 30,
    color: 'green'
  },
});

export default HotelSearch;
