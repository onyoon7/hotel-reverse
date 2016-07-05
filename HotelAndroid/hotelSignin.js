import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Text,
  TextInput,
  AsyncStorage,
  ToastAndroid,
  Dimensions,
} from 'react-native';

import axios from 'axios'
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import config from './config';

const validUnderlineColor = null;
const invalidUnderlineColor = 'red';
const { width } = Dimensions.get('window');

class HotelSignin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      client_Email : "",
      password : "",
      error : "",
      user : "",
    }
    this._handlePress = this._handlePress.bind(this);
  }

  movePAGE(){
    let naviArr = this.props.navigator.getCurrentRoutes();
    if(naviArr[naviArr.length-2].id==='bid') {
      this.props.navigator.push({id : 'bidInfo'});
    } else {
      this.props.navigator.pop();
    }
  }

  async _signIn() {
    try {
      let user = await GoogleSignin.signIn()
      await AsyncStorage.setItem('id_token', user.id);
      await AsyncStorage.setItem('client_Email', user.email);
      ToastAndroid.show('로그인에 성공하였습니다', ToastAndroid.SHORT);
      this.movePAGE();
    }
    catch(err) {
      console.log('WRONG SIGNIN', err);
    }
  }

  async _handlePress(where) {
    let email = this.state.client_Email;
    let password = this.state.password;
    switch(where) {
    case 'login' :
      try {
        var response = await axios({
          url: config.serverUrl + '/client/signin/',
          method : 'post',
          data : {
            client_Email : email,
            client_PW : password
          }
        });
        if(response.data.id_token) {
          await AsyncStorage.setItem('id_token', response.data.id_token);
          await AsyncStorage.setItem('client_Email', email);
          ToastAndroid.show('로그인에 성공하였습니다', ToastAndroid.SHORT);
          this.props.naviView();
        }
      } catch(error) {
        console.log(error);
      }
      var id_token = await AsyncStorage.getItem('id_token');
      if(id_token) {
        this.movePAGE();
      } else {
        ToastAndroid.show('이메일/비밀번호를 다시 확인해주세요', ToastAndroid.SHORT);
      }
      break;
    case 'register' :
      this.props.navigator.push({
        id : where,
      })
      break;
    }
  }

  focusNextField(nextField) {
    this.refs[nextField].focus();
  }

  render() {
    return (
      <View style = {styles.container}>

        <Text style={styles.heading}>
            Enjoy Hotel-Reverse
        </Text>
        <TextInput
          ref='1'
          onChangeText={ (text)=> this.setState({client_Email: text}) }
          keyboardType='email-address'
          returnKeyType='next'
          onSubmitEditing={()=> this.focusNextField('2')}
          style={styles.input} placeholder="Email">
        </TextInput>
        <TextInput
          ref='2'
          onChangeText={ (text)=> this.setState({password: text}) }
          keyboardType='numbers-and-punctuation'
          returnKeyType='done'
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}>
        </TextInput>
        
        <View style={styles.logbox}>
          <View style={styles.padding}>
            <TouchableHighlight onPress={()=>this._handlePress('login')} style={styles.submitBtn}>
              <Text style={styles.buttonText}>
                Log In
              </Text>
            </TouchableHighlight>
          </View>
          
          <View style={styles.padding}>
            <TouchableHighlight
              style={styles.submitBtn}
              onPress = {()=>this._handlePress('register')}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableHighlight>
          </View>
          
          <View style={styles.padding}>
            <GoogleSigninButton
              style={styles.submitBtn}
              onPress = {()=>this._signIn()}/>
          </View>
            <Text style={styles.error}>
              {this.state.error}
            </Text>
        </View> 
      </View>
    )
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    paddingTop: 80
  },
  input: {
    height: 50,
    marginTop: 30,
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48bbec'
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center'
  },

  padding : {
    padding : 10,
  },
  submitBtn: {
    width: width,
    padding: 10,
    height: 56,
    overflow: 'hidden',
    marginTop: 0,
    marginBottom: -15,
    // borderColor: 'black',
    // borderWidth: 2,
    // borderStyle: 'solid',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  },
  logbox : {
    marginTop: 175,
  },

  heading: {
    fontSize: 30,
  },
  error: {
    color: 'red',
    paddingTop: 10
  },
});

export default HotelSignin;
