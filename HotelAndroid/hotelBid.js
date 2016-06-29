import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Picker,
  Dimensions,
  Slider,
  AsyncStorage,
  ScrollView,
} from 'react-native';
const Item = Picker.Item;
import Button from 'react-native-button';
import MapView from 'react-native-maps';
import areaInfo from './assets/areaInfo';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height / 2;

const normalMapStyle = { width: width, flex: 0.7 };

class HotelBid extends Component {
  constructor(props){
    super(props)

    this.state = {
      subArea_Name: '',
      hotel_Rate: 5,
      bid_Price: '80000',
      bubbleText: '↕️',
      mapStyle: normalMapStyle,
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
    let regionKey = areaInfo.area.main[this.props.searchData.mainArea_Name];

    this.subArea = areaInfo.area[regionKey].map((val) => {
      return <Item label={val} key={val} value={val} />;
    });

    this.onValueChange('region', areaInfo.region[regionKey]);
    this.setMapView(regionKey);
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
      this.onValueChange('mapStyle', styles.fullMap);
    } else {
      this.onValueChange('bubbleText', '↕️');
      this.onValueChange('mapStyle', normalMapStyle);
    }
  }

  render() {
    return (
      <View style={styles.container}>
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

        <ScrollView style={{flex: 1, width: width}}>
          <View style={styles.rowContainer}>
            <Text style={styles.title}>
              {this.props.searchData.mainArea_Name}의 어디에서 묵고 싶나요?
            </Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.label}>세부지역</Text>
            <Picker style={styles.dropdown}
              selectedValue={this.state.subArea_Name}
              onValueChange={value => this.onValueChange('subArea_Name', value)}
              mode="dropdown">
              {this.subArea}
            </Picker>
          </View>

          <View style={styles.rowContainer}>
            <Text style={styles.label}>호텔등급</Text>
            <Picker style={styles.dropdown}
              selectedValue={this.state.hotel_Rate}
              onValueChange={value => this.onValueChange('hotel_Rate', value)}
              mode="dropdown">
              <Item label="★★★★★" value="5" />
              <Item label="★★★★" value="4" />
              <Item label="★★★" value="3" />
            </Picker>
          </View>

          <View style={styles.rowContainer}>
            <Text style={styles.text}>
              ₩ {this.state.bid_Price}
            </Text>
          </View>

          <View style={[styles.centeredRow]}>
            <Slider
              style={{width: 300}}
              minimumValue={40000}
              maximumValue={150000}
              value={80000}
              step={1000}
              onValueChange={(value) => this.setState({bid_Price: value})}
            />
          </View>

          <View style={[{marginTop: 50}, styles.rowContainer]}>
            <Button
              containerStyle={styles.submitBtn}
              style={styles.submitBtnText}
              onPress={() => this._handlePress()}>
              계속하기
            </Button>
          </View>
        </ScrollView>
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
  centeredRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
    marginTop: 15,
    marginBottom: 15,
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
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 20,
    width: 60,
    height: 50,
  },
  bubbleContainer: {
    position: 'absolute',
    top: 15,
    left: 15,
  },
  text: {
    fontSize: 17,
    color: 'green',
  },
  fullMap: {
    width: width,
    height: height,
  },
  dropdown: {
    width: 150,
    height: 30,
    color: 'green'
  },
});

export default HotelBid;
