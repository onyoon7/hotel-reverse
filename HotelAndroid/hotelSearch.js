import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  DatePickerAndroid,
  TouchableWithoutFeedback,
  Picker,
  Image,
  ToastAndroid,
  Dimensions,
} from 'react-native';
const Item = Picker.Item;
import Button from 'react-native-button';
import areaInfo from './assets/areaInfo';

const { width } = Dimensions.get('window');

const checkInHolder = 'Check in';
const checkOutHolder = 'Check out';

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

  componentWillMount() {
    this.props.onFlagChange(true);
    this.setDropDowns();
  }

  render() {
    return (
      <View style={{flex: 1,backgroundColor: 'white'}}>
        <Text style={styles.title}>
        </Text>
        <View style={[styles.centeredRow]}>
          <View style={[styles.rowContainer]}>
            <View style={[styles.datePickerLuggage]}>
              <Image source={require('./assets/luggage.png')} />
            </View>
            <View style={[styles.datePickerRow]}>
              <Image source={require('./assets/bed.png')} />
            </View>
            </View>
        </View>

        <View style={[styles.centeredRow]}>
          <View style={[styles.view,styles.rowContainer,styles.datePickerRow]}>
            <Picker style={styles.dropdown}
              selectedValue={this.state.mainArea_Name}
              onValueChange={(value) => this.onValueChange('mainArea_Name', value)}
              mode="dropdown">
              {this.dropDowns}
            </Picker>
          </View>

          <View style={[styles.view,styles.rowContainer,styles.roomNumber]}>
            <View style={{marginRight: 25}}>
              <Button style={styles.roomBtnText}
                containerStyle={styles.roomBtn}
                onPress={() => this._decRoomNumber()}>
                -
              </Button>
            </View>
            <Text style={styles.text}>{this.state.room_Number}</Text>
            <View style={{marginLeft: 25}}>
              <Button style={styles.roomBtnText}
                containerStyle={styles.roomBtn}
                onPress={() => this._incRoomNumber()}>
                +
              </Button>
            </View>
          </View>
        </View>

        <View style={[styles.centeredRow,styles.rowContainer]}>
          <View style={[styles.datePickerRow]}>
            <Image source={require('./assets/calendar.png')} />
          </View>
          <View style={[styles.datePickerRow]}>
            <Image source={require('./assets/calendar.png')} />
          </View>
        </View>


        <View style={[styles.centeredRow]}>
          <TouchableWithoutFeedback
            onPress={() => this.showPicker('checkIn', {
              date: this.state.checkInDate,
              minDate: new Date(),
              maxDate: new Date().setDate(new Date().getDate() + 14),
            })}>
            <View style={[styles.view,styles.datePickerRow]}>
              <Text style={styles.text}>{this.state.checkInText}</Text>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress={() => {
              let minDate = new Date(this.state.checkInDate);
              let maxDate = new Date(this.state.checkInDate);
              minDate.setDate(minDate.getDate() + 1);
              maxDate.setDate(maxDate.getDate() + 14);

              let options = {
                date: this.state.checkOutDate,
                minDate: minDate,
                maxDate: maxDate,
              };
              this.showPicker('checkOut', options)}}>
              <View style={[styles.view,styles.datePickerRow]}>
                <Text style={styles.text}>{this.state.checkOutText}</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>


          <View style={[styles.button, styles.centeredRow]}>
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
    marginLeft: 20,
    marginRight: 10,
  },
  centeredRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
    margin: 10,
    marginTop: 30,
    marginBottom: 30,
  },
  label: {
    width: 100,
    textAlign: 'left',
    color: 'grey',
    fontSize: 20,
  },
  submitBtn: {
    width: width,
    padding: 10,
    height: 60,
    overflow: 'hidden',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    fontSize: 18,
    color: 'white',
  },
  button: {
    position: 'absolute',
    bottom: 0,
  },
  roomBtn: {
    width: 28,
    height: 28,
    overflow: 'hidden',
    borderRadius: 100,
    backgroundColor: '#CACACA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  roomNumber: {
    marginLeft: 43,
  },
  roomBtnText: {
    fontSize: 20,
    color: 'white',
  },
  text: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },
  dropdown: {
    marginLeft: 10,
    width: 120,
    height: 30,
    color: 'black',
  },
  datePickerRow: {
    width: width/2-60,
    marginTop: 8,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    padding: 5,
    justifyContent: 'flex-start',
  },
  datePickerLuggage: {
    width: width/2-60,
    marginTop: 8,
    marginBottom: 10,
    marginLeft: 40,
    marginRight: 20,
    padding: 5,
    justifyContent: 'flex-start',
  },
});

export default HotelSearch;
