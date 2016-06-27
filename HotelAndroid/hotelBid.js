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
import areaInfo from './assets/areaInfo';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height / 2;

class HotelBid extends Component {
  constructor(props){
    super(props)

    this.state = {
      subArea_Name: '',
      hotel_Rate: 5,
      bid_Price: '80000',
      bubbleText: '↕️',
      mapStyle: {width: width, flex: 1},
      region: {},
    }

    this.isFullScreen = false;

    this.onValueChange = this.onValueChange.bind(this);
    this.toggleFullScreen = this.toggleFullScreen.bind(this);
    this.setMapView = this.setMapView.bind(this);
    this.setRegionToMarker = this.setRegionToMarker.bind(this);
  }

  setMapView(region) {
    let polygons = areaInfo.polygon[region];
    let markers = areaInfo.marker[region];

    let colors = [];
    for (let i=0; i<polygons.length; i++) {
      let r = Math.floor(Math.random()*255), g = Math.floor(Math.random()*255), b = Math.floor(Math.random()*255);
      colors.push(`rgba(${r},${g},${b}`);
    }

    this.polygon = polygons.map((item, i) => {
      return (
        <MapView.Polygon
        key={item.key}
        coordinates={item.value}
        fillColor={colors[i] + ',0.5)'}
        strokeColor="rgba(0,0,0,0.5)"
        stokeWidth={2}
        />
      )
    }
    );

    this.marker = markers.map((item, i) => {
      return (
        <MapView.Marker
        key={item.key}
        coordinate={item.value}
        title={item.key}
        pinColor={colors[i] + ',0.7)'}
        onPress={() => {
          this.onValueChange('subArea_Name', item.key);
          if (this.isFullScreen) {
            this.toggleFullScreen()
          }
          this.setRegionToMarker(item.value);
        }
        }
        />
      )
    }
    );
  }

  setRegionToMarker(coor) {
    let region = { latitude: coor.latitude, longitude: coor.longitude };
    region.latitudeDelta = 0.0522;
    region.longitudeDelta = 0.1522 * ASPECT_RATIO;
    this.onValueChange('region', region);
  }

  componentWillMount() {
    let objKey;
    let mainArea = this.props.searchData.mainArea_Name;
    if (mainArea === '서울'){
      objKey = 'seoul';
    } else if (mainArea === '제주'){
      objKey = 'jeju';
    }

    this.onValueChange('region', areaInfo.region[objKey]);

    this.subArea = [];
    for(let i = 0; i < areaInfo.area[objKey].length; i++){
      this.subArea.push(<Item label={areaInfo.area[objKey][i]} key={i} value={areaInfo.area[objKey][i]} />);
    }
    this.setMapView(objKey);
  }

  async _handlePress() {
    var id_token =  await AsyncStorage.getItem('id_token');
    console.log('hotel bid id token check', id_token);
    if (id_token) {
      this.props.navigator.push({id: 'bidInfo'})
    }
    else {
      this.props.navigator.push({id: 'signin'});
    }
    this.props.onChange(this.state.hotel_Rate, this.state.subArea_Name, this.state.bid_Price);
  }

  onValueChange(key: string, value: string) {
    const newState = {};
    newState[key] = value;
    this.setState(newState);
  }

  toggleFullScreen() {
    this.isFullScreen = !this.isFullScreen;
    if (this.isFullScreen) {
      this.onValueChange('bubbleText', '←');
      this.onValueChange('mapStyle', {flex: 100, width: width, height: height});
    } else {
      this.onValueChange('bubbleText', '↕️');
      this.onValueChange('mapStyle', {width: width, flex: 1});
    }
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
          style={this.state.mapStyle}
          region={this.state.region}
          onPress={() => {
            if (!this.isFullScreen) {
              this.toggleFullScreen()
            }
          }}
        >
          {this.polygon}
          {this.marker}
        </MapView>

        <View style={styles.bubbleContainer}>
          <Button
            containerStyle={styles.bubble}
            style={{color: 'black', fontSize: 30}}
            onPress={this.toggleFullScreen}>
              {this.state.bubbleText}
          </Button>
        </View>

        <View style={{flex: 1}}>
          <View style={styles.rowContainer}>
            <Text style={styles.label}>세부지역</Text>
            <Picker style={{width: 150}}
              selectedValue={this.state.subArea_Name}
              onValueChange={value => this.onValueChange('subArea_Name', value)}
              mode="dropdown">
              {this.subArea}
            </Picker>
          </View>

          <View style={styles.rowContainer}>
            <Text style={styles.label}>호텔등급</Text>
            <Picker style={{width: 150}}
              selectedValue={this.state.hotel_Rate}
              onValueChange={value => this.onValueChange('hotel_Rate', value)}
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
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 20,
    width: 60,
    height: 50,
  },
  bubbleContainer: {
    position: 'absolute',
    top: 60,
    left: 10,
  },
  price: {
    fontSize: 18,
    color: 'black',
  },
  smallMap: {
    width: width,
    flex: 1,
  },
});

export default HotelBid;
