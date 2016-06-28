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
    }
  }

  focusNextField(nextField) {
    this.refs[nextField].focus();
  }

  passwordCheck() {
    if(this.state.password.length <= 8) {
      ToastAndroid.show('비밀번호는 8자리이상 입력해주세요', ToastAndroid.LONG);
      return false;
    } else if(this.state.password !== this.state.password_confirmation) {
      ToastAndroid.show('비밀번호가 서로 동일하지 않습니다', ToastAndroid.LONG);
      return false;
    } else if(this.state.client_email.indexOf('@') === -1) {
      ToastAndroid.show('이메일 형식이 올바르지 않습니다', ToastAndroid.LONG);
      return false;
    } else {
      return true;
    }
  }


  async _handlePress() {
    let result = this.passwordCheck();
    if(result) {
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
        let errors = error.data.errors;
        let errorsArray = [];
        // let errorMessage = errors[0].message
        for (let key in errors) {
          if(errors[key].length > 1) {
            errors[key].message.map(error => errorsArray.push(`${key} ${error}`));
          } else {
            errorsArray.push(`${key} ${errors[key].message}`);
          }
        }
        this.setState({errors : errorsArray});
        console.log('fail to regitster in front : ', errorsArray);
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
          ref='1'
          onChangeText={ (text)=> this.setState({client_email : text})}
          keyboardType='email-address'
          returnKeyType='next'
          onSubmitEditing={()=> this.focusNextField('2')}
          style = {styles.input} placeholder='Email'>
        </TextInput>
        <TextInput
          ref='2'
          onChangeText={ (text)=> this.setState({name: text}) }
          keyboardType='default'
          returnKeyType='next'
          onSubmitEditing={()=> this.focusNextField('3')}
          style={styles.input} placeholder='Name'>
        </TextInput>
        <TextInput
          ref='3'
          onChangeText={ (text)=> this.setState({password: text}) }
          keyboardType='numbers-and-punctuation'
          returnKeyType='next'
          onSubmitEditing={()=> this.focusNextField('4')}
          style={styles.input} placeholder='Password'
          secureTextEntry={true}>
        </TextInput>
        <TextInput
          ref='4'
          onChangeText={ (text)=> this.setState({password_confirmation: text}) }
          keyboardType='numbers-and-punctuation'
          returnKeyType='done'
          style={styles.input} placeholder='Confirm Password'
          secureTextEntry={true}>
        </TextInput>

        <TouchableHighlight style={styles.button} onPress={() => this._handlePress()}>
          <Text style={styles.buttonText}>
            Register
          </Text>
        </TouchableHighlight>

        <Errors errors={this.state.errors}/>

    </View>
  )}
}

const Errors = (props) => {
  return (
    <View>
      {props.errors.map((error, i) => <Text key={i} style={styles.error}> {error} </Text>)}
    </View>
  )}
}

const Errors = (props) => {
  return (
    <View>
      {props.errors.map((error, i) => <Text key={i} style={styles.error}> {error} </Text>)}
    </View>
  );
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
