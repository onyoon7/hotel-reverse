import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Picker,
  Navigator,
  Dimensions,
  Slider,
} from 'react-native';
const Item = Picker.Item;
import Button from 'react-native-button';
import MapView from 'react-native-maps';

let { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height / 2;
const LATITUDE_DELTA = 0.1522;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class HotelBid extends Component {
  constructor(props){
    super(props)

    let seoul = [
      // gangnam-gu
      { key: 'gangnam', value: [
          {
            latitude: 37.533335,
            longitude: 127.027770,
          },
          {
            latitude: 37.503381,
            longitude: 127.069827,
          },
          {
            latitude: 37.468237,
            longitude: 127.122012,
          },
          {
            latitude: 37.456995,
            longitude: 127.098164,
          },
          {
            latitude: 37.469115,
            longitude: 127.053685,
          },
        ],
      },
      // myeong-dong
      { key: 'myeongdong', value: [
          {
            latitude: 37.568933,
            longitude: 126.976930,
          },
          {
            latitude: 37.567810,
            longitude: 126.989075,
          },
          {
            latitude: 37.556414,
            longitude: 126.985041,
          },
          {
            latitude: 37.563592,
            longitude: 126.982080,
          },
        ],
      },
      { key: 'yeouido', value: [
          {
            latitude: 37.541101,
            longitude: 126.927290,
          },
          {
            latitude: 37.518230,
            longitude: 126.940766,
          },
          {
            latitude: 37.520273,
            longitude: 126.916132,
          },
          {
            latitude: 37.532865,
            longitude: 126.911755,
          },
        ],
      },
    ];

    let jeju = [];

    function getPolygonCmpt(region) {
      return region.map(item => {
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

    this.state={
      subArea_Name: '',
      hotel_Rate: 5,
      bid_Price: '80000',
      region : {
        seoul: {
          latitude: 37.552547,
          longitude: 126.993552,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        },
        jeju: {
        },
      },
      polygon: {
        seoul: getPolygonCmpt(seoul),
        jeju: getPolygonCmpt(jeju),
      },
    }
   }

   _handlePress() {
     this.props.navigator.push({id: 'signin'});
     this.props.onChange(this.state.hotel_Rate, this.state.subArea_Name, this.state.bid_Price);
   }

   onValueChange(key: string, value: string) {
     const newState = {};
     newState[key] = value;
     this.setState(newState);
   }

   render() {
     let region;
     let polygonName;

     const seoulArea = ['강남구', '서초구', '명동', '여의도'];
     const jejuArea = ['제주시', '서귀포시'];

     const rows = [];
     const mainArea = this.props.searchData.mainArea_Name;

     if(mainArea === '서울'){
       for(const i = 0; i < seoulArea.length; i++){
         rows.push(<Item label={seoulArea[i]} key={i} value={seoulArea[i]} />);
       }
       region = this.state.region.seoul;
       polygonName = 'seoul';
     } else if(mainArea === '제주'){
       for(const i = 0; i < jejuArea.length; i++){
         rows.push(<Item label={jejuArea[i]} key={i} value={jejuArea[i]} />);
       }
       region = this.state.region.jeju;
       polygonName = 'jeju';
     }

     return (
       <View style={styles.container}>
        <Text style={styles.title}>
          {this.props.searchData.mainArea_Name}의 어디에서 묵고 싶나요?
        </Text>

         <MapView
           style={styles.map}
           initialRegion={region}
         >
           {this.state.polygon[polygonName]}
         </MapView>

         <View style={styles.inputsContainer}>
           <View style={styles.rowContainer}>
             <Text style={styles.label}>세부지역</Text>
             <Picker style={{width: 150}}
               selectedValue={this.state.subArea_Name}
               onValueChange={this.onValueChange.bind(this, 'subArea_Name')}
               mode="dropdown">
               {rows}
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
             <Button style={styles.searchBtnText}
               containerStyle={styles.searchBtn}
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
   position: 'absolute',
   fontSize: 20,
   textAlign: 'center',
   color: '#000',
   margin: 10,
   top: 0,
   left: 0,
   right: 0,
   bottom: 50,
  },
  label: {
   width: 60,
   textAlign: 'left',
   margin: 10,
   color: 'black',
  },
  searchBtn: {
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
  searchBtnText: {
   fontSize: 15,
   color: 'white',
  },
  input: {
   height: 40,
   borderColor: '#173e43',
   borderWidth: 2,
   textAlign: 'center'
  },
  inputsContainer: {
    position: 'absolute',
    top: height / 2,
    left: 0,
    right: 0,
    bottom: 0,
  },
  map: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    bottom: height / 2,
  },
  price: {
    fontSize: 18,
    color: 'black',
  },
});



export default HotelBid;
