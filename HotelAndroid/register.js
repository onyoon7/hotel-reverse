import React, { Component } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Text,
  View,
  AsyncStorage,
  ToastAndroid,
} from 'react-native';
import axios from 'axios';
import config from './config';


class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name : '',
      client_email : '',
      password : '',
      password_confirmation : '',
      errors : [],
      showProgress : false,
    }
  }

  async _handlePress() {
    this.setState({showProgress : true})
    try {
      let name = this.state.name;
      let email = this.state.client_email;
      let password = this.state.password;
      let response = await axios({
        url: config.serverUrl + '/client/signup/',
        method : 'post',
        data : {
          client_ID : email,
          client_PW : password,
          client_Name : name,
          client_Email : email,
          billingInfo : '1234-1234-1234-1234'
        }
      });
      console.log('response : ', response);
      let id_token = await response.body;
      console.log('id token : ', id_token);
      ToastAndroid.show('회원가입을 축하드립니다', ToastAndroid.SHORT)
      this.props.navigator.pop();
    } catch(error) {
      let errorMessage = error.data.errors[0].message
      console.log('fail to regitster in front : ', errorMessage);
      if(error.data.errors[0].message === 'client_Email must be unique') {
        ToastAndroid.show('이미 등록된 이메일 주소입니다.다시 확인해주세요', ToastAndroid.LONG)
      } else {
        ToastAndroid.show('회원가입에 실패하였습니다.다시 시도해주세요', ToastAndroid.LONG)
      }
    }
  }

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.heading}>
          Join us now!
        </Text>
        <TextInput
          onChangeText={ (text)=> this.setState({client_email : text})}
          style = {styles.input} placeholder='Email'>
        </TextInput>
        <TextInput
          onChangeText={ (text)=> this.setState({name: text}) }
          style={styles.input} placeholder='Name'>
        </TextInput>
        <TextInput
          onChangeText={ (text)=> this.setState({password: text}) }
          style={styles.input} placeholder='Password'
          secureTextEntry={true}>
        </TextInput>
        <TextInput
          onChangeText={ (text)=> this.setState({password_confirmation: text}) }
          style={styles.input} placeholder='Confirm Password'
          secureTextEntry={true}>
        </TextInput>

        <TouchableHighlight
          style={styles.button}
          onPress={() => this._handlePress()}>
          <Text style={styles.buttonText}>
            Register
          </Text>
        </TouchableHighlight>

    </View>
  )}
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    justifyContent : 'flex-start',
    alignItems : 'center',
    backgroundColor : '#F5FCFF',
    padding : 10,
    paddingTop : 80,
  },
  input : {
    height : 50,
    marginTop : 10,
    padding : 4,
    fontSize : 18,
    borderWidth : 1,
    borderColor : '#48bbec',
  },
  button : {
    height : 50,
    backgroundColor : '#48BBEC',
    alignSelf : 'stretch',
    marginTop : 10,
    justifyContent : 'center',
  },
  buttonText : {
    fontSize : 22,
    color : '#FFF',
    alignSelf : 'center',
  },
  heading : {
    fontSize : 30,
  },
  error : {
    color : 'red',
    paddingTop : 10,
  },
  loader : {
    marginTop : 20
  },
});

export default Register;
