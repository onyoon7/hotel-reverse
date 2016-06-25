import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Text,
  View,
  AsyncStorage,
} from 'react-native';
import axios from 'axios';


class Register extends Component {
  constructor() {
    super();

    this.state = {
      name : '',
      client_email : '',
      password : '',
      password_confirmation : '',
      errors : [],
    }
  }

  _handlePress() {
    let name = this.state.name;
    let email = this.state.client_email;
    let password = this.state.password;
    let checkSuccess = false;
    axios({
      url: 'http://192.168.1.4:4444/client/signup/',
      method : 'post',
      data : {
        client_ID : email,
        client_PW : password,
        client_Name : name,
        client_Email : email,
        billingInfo : '1234-1234-1234-1234'
      }
    }).then(function(response) {
      console.log("Thank you for your regitster")
      console.log(response)
    }).then(this.props.navigator.push({id : 'signin'}))
    .catch(function(error) {
      console.log("Register fail")
      console.log(error);
    })
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
        onPress={() => Alert.alert('signup','가입을 축하드립니다',
        [{text : 'congratulation', onPress: () => this._handlePress() }] )}>
          <Text style={styles.buttonText}>
            Register
          </Text>
        </TouchableHighlight>

        <Errors errors={this.state.errors} />

      </View>
    );
  }
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
