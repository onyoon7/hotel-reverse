import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Picker,
  Dimensions,
  Slider,
  AsyncStorage,
} from 'react-native';
const Item = Picker.Item;
import Button from 'react-native-button';
import MapView from 'react-native-maps';
import axios from 'axios';
import areaInfo from './assets/areaInfo';

const { width } = Dimensions.get('window');

class HotelBid extends Component {
  constructor(props){
    super(props)

    this.state = {
      subArea_Name: '',
      hotel_Rate: 5,
      bid_Price: '80000',
      client_Email : '',
    }
  }

  setPolygon(regionArr) {
    return regionArr.map(item => {
      let r = Math.floor(Math.random()*255), g = Math.floor(Math.random()*255), b = Math.floor(Math.random()*255);
      const fillColor = `rgba(${r},${g},${b},0.5)`;
      return (
        <MapView.Polygon
        key={item.key}
        coordinates={item.value}
        fillColor={fillColor}
        strokeColor="rgba(0,0,0,0.5)"
        stokeWidth={2}
        />
      )
    }
    );
  }

 componentWillMount() {
    let objKey;
    let mainArea = this.props.searchData.mainArea_Name;
    if (mainArea === '서울'){
      objKey = 'seoul';
    } else if (mainArea === '제주'){
      objKey = 'jeju';
    }

    this.subArea = [];
    for(let i = 0; i < areaInfo.area[objKey].length; i++){
      this.subArea.push(<Item label={areaInfo.area[objKey][i]} key={i} value={areaInfo.area[objKey][i]} />);
    }
    this.region = areaInfo.region[objKey];
    this.polygon = this.setPolygon(areaInfo.polygon[objKey]);
  }

  async _handlePress() {
    var id_token =  await AsyncStorage.getItem('id_token');
    console.log('hotel bid id token check', id_token);
    if (id_token) {
      try {
        let response = await axios({
          url: 'http://192.168.1.4:4444/client/auth/check',
          method : 'get',
          headers: {
            'Authorization': 'Bearer ' + id_token
          },
        });
        console.log('auth res: ', response.data);
        this.setState({client_Email :  response.data});
      } catch(error) {
        console.log(error);
      }
      this.props.navigator.push({id: 'bidInfo'})
    }
    else {
      this.props.navigator.push({id: 'signin'});
    }

    this.props.onChange(this.state.hotel_Rate, this.state.subArea_Name, this.state.bid_Price, this.state.client_Email);
  }

  onValueChange(key: string, value: string) {
    const newState = {};
    newState[key] = value;
    this.setState(newState);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <Text style={styles.title}>
            {this.props.searchData.mainArea_Name}의 어디에서 묵고 싶나요?
          </Text>
        </View>

        <MapView
          style={{width: width, flex: 1}}
          initialRegion={this.region}
        >
          {this.polygon}
        </MapView>

        <View style={{flex: 1}}>
          <View style={styles.rowContainer}>
            <Text style={styles.label}>세부지역</Text>
            <Picker style={{width: 150}}
              selectedValue={this.state.subArea_Name}
              onValueChange={this.onValueChange.bind(this, 'subArea_Name')}
              mode="dropdown">
              {this.subArea}
            </Picker>
          </View>

          <View style={styles.rowContainer}>
            <Text style={styles.label}>호텔등급</Text>
            <Picker style={{width: 150}}
              selectedValue={this.state.hotel_Rate}
              onValueChange={this.onValueChange.bind(this, 'hotel_Rate')}
              mode="dropdown">
                <Item label="★★★★★" value="5" />
                <Item label="★★★★" value="4" />
                <Item label="★★★" value="3" />
            </Picker>
          </View>

          <View style={styles.rowContainer}>
            <Text style={styles.price}>
              ₩ {this.state.bid_Price}
            </Text>
          </View>

          <Slider
            minimumValue={40000}
            maximumValue={150000}
            value={80000}
            step={1000}
            onValueChange={(value) => this.setState({bid_Price: value})}
          />

          <View style={styles.rowContainer}>
            <Button
              containerStyle={styles.button}
              style={styles.buttonText}
              onPress={() => this._handlePress()}>
                계속하기
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    color: '#000',
  },
  label: {
    width: 60,
    textAlign: 'left',
    margin: 10,
    color: 'black',
  },
  button: {
    width: 150,
    padding: 10,
    height: 30,
    overflow: 'hidden',
    borderColor: 'black',
    borderWidth: 2,
    borderStyle: 'solid',
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30,
  },
  buttonText: {
    fontSize: 15,
    color: 'white',
  },
  price: {
    fontSize: 18,
    color: 'black',
  },
});

export default HotelBid;
