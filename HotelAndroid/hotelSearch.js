import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  DatePickerAndroid,
  TouchableWithoutFeedback,
  Picker,
} from 'react-native';
const Item = Picker.Item;
import Button from 'react-native-button';


class HotelSearch extends Component {
  constructor(props){
    super(props);

    this.state = {
      mainArea_Name: '',
      checkInDate: new Date(),
      checkInText: '체크인 날짜 선택',
      checkOutDate: new Date(),
      checkOutText: '체크아웃 날짜 선택',
      room_Number: 1,
    }

    this.onValueChange = this.onValueChange.bind(this);
    this.showPicker = this.showPicker.bind(this);
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
    this.props.navigator.push({id: 'bid'});
    this.props.onChange(this.state.mainArea_Name, this.state.checkInText, this.state.checkOutText, this.state.room_Number);
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

        newState[stateKey + 'Text'] = this._convertDate(date);
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
              selectedValue={this.state.mainArea_Name}
              onValueChange={() => this.onValueChange('mainArea_Name')}
              mode="dropdown">
              <Item label="서울" value="서울" />
              <Item label="제주" value="제주" />
            </Picker>
          </View>

          <View style={styles.rowContainer}>

            <Text style={styles.label}>체크인</Text>

            <TouchableWithoutFeedback
                onPress={() => this.showPicker('checkIn', {
                  date: this.state.checkInDate,
                  minDate: new Date(),
                  maxDate: new Date().setDate(new Date().getDate() + 14),
                })}>
              <View>
                <Text style={styles.text}>{this.state.checkInText}</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>

          <View style={styles.rowContainer}>
            <Text style={styles.label}>체크아웃</Text>
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
              <View>
                <Text style={styles.text}>{this.state.checkOutText}</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>

          <View style={styles.rowContainer}>
            <Text style={styles.label}>객실수</Text>

            <Button
              onPress={() => this._decRoomNumber()}>
              -&nbsp;
            </Button>
            <Text>{this.state.room_Number}</Text>
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

export default HotelSearch;
