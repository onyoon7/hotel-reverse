import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Text,
  View,
  AsyncStorage,
} from 'react-native';


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

  redirect(routeName, token) {
    this.props.navigator.push({
      id : routeName,
      passProps : {
        accessToken : token,
      }
    })
  }

  async onRegisterPressed(){
    try {
      let response = await fetch('https://afternoon-beyond-22141.herokuapp.com/api/users', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user:{
            name: this.state.name,
            client_email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation,
          }
        })
      });

      let lest = await response.text();

      if(response.status >= 200 && response.status < 300) {
        console.log("res success is " + res);
        let accessToken = res;
        this.redirect('search', accessToken);
      } else {
        let errors = res;
        throw errors;
      }
    } catch(errors) {
      console.log('catch errors : ' + errors);
      //errors are in JSON form so we must parse them first.
      let formErrors = JSON.parse(errors);
      //We will store all the errors in the array.
      let errorsArray = [];
      for(var key in formErrors) {
        //If array is bigger than one we need to split it.
        if(formErrors[key].length > 1) {
            formErrors[key].map(error => errorsArray.push(`${key} ${error}`));
        } else {
            errorsArray.push(`${key} ${formErrors[key]}`);
        }
      }
      this.setState({errors : errorsArray});
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

        <TouchableHighlight onPress={this.onRegisterPressed.bind(this)} style={styles.button}>
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

