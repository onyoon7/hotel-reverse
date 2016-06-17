import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Picker,
  Navigator,
} from 'react-native';
const Item = Picker.Item;
import Button from 'react-native-button';

class HotelBid extends Component {
  constructor(props){
    super(props)
    this.state={
      subArea_Name: '',
      hotel_Rate: 1,
      bid_Price: ''
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
     const seoulArea = ['강남구', '서초구', '명동', '여의도'];
     const jejuArea = ['제주시', '서귀포시'];

     const rows = [];
     const change = this.props.searchData.mainArea_Name;

     if(change === '서울'){
       for(const i = 0; i < seoulArea.length; i++){
         rows.push(<Item label={seoulArea[i]} value={seoulArea[i]} />);
       }
     }
     if(change === '제주'){
       for(const i = 0; i < jejuArea.length; i++){
         rows.push(<Item label={jejuArea[i]} value={jejuArea[i]} />);
       }
     }
     return (
       <View style={{flex: 1}}>
         <Text style={styles.appName}>
           HOTEL REVERSE
         </Text>
         <View style={styles.rowContainer}>
           <Text style={styles.label}>세부지역</Text>
           <Picker style={{width: 100}}
             selectedValue={this.state.subArea_Name}
             onValueChange={this.onValueChange.bind(this, 'subArea_Name')}
             mode="dropdown">
             {this.rows}
           </Picker>
         </View>

         <View style={styles.rowContainer}>
           <Text style={styles.label}>호텔등급</Text>
           <Picker style={{width: 100}}
             selectedValue={this.state.hotel_Rate}
             onValueChange={this.onValueChange.bind(this, 'hotel_Rate')}
             mode="dropdown">
             <Item label="1" value="1" />
             <Item label="2" value="2" />
             <Item label="3" value="3" />
             <Item label="4" value="4" />
             <Item label="5" value="5" />
           </Picker>
         </View>
         <TextInput
           style={styles.input}
           onChangeText={(bid_Price) => this.setState({bid_Price})}
           value={this.state.bid_Price}
           placeholder ={'금액을 입력해주세요.'}
         />
         <View style={styles.rowContainer}>
           <Button style={styles.searchBtnText}
             containerStyle={styles.searchBtn}
             onPress={() => this._handlePress()}>
             계속하기
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
 input: {
   height: 40,
   borderColor: '#173e43',
   borderWidth: 2,
   textAlign: 'center'
 }
});



export default HotelBid;
