import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS,
  AsyncStorage,
  Text,
  View
} from 'react-native';

const ACCESS_TOKEN = 'access_token';

class Login extends Component {
  constructor() {
    super()

    this.state = {
      clientemail : "",
      password : "",
      error : "",
    }
  }

  redirect(routeName, token) {
    this.props.navigator.push({
      id : routeName,
      passProps : {
        accessToken : token,//token
      }
    })
  }

  async storeToken(accessToken) {
    try {
      await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
      this.getToken();
    } catch(error) {
      console.log("something went wrong")
    }
  }

  async getToken(accessToken) {
    try {
      let token = await AsyncStorage.getItem(ACCESS_TOKEN);
      console.log('token is : ' + token)
    } catch(error) {
      console.log("something went wrong")
    }
  }

  async removeToken(accessToken) {
    try {
      await AsyncStorage.removeItem(ACCESS_TOKEN);
      this.getToken();
    } catch(error) {
      console.log("something went wrong")
    }
  }

  async onLoginPressed() {
    try {
      let response = await fetch('https://afternoon-beyond-22141.herokuapp.com/api/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session:{
            clientemail: this.state.email,
            password: this.state.password,
          }
        })
      });
      let res = await response.text();
      if (response.status >= 200 && response.status < 300) {
        //Handle success
        this.setState({error : ""});
        let accessToken = res;
        //On success we will store the access_token in the AsyncStorage
        this.storeToken(accessToken);
        console.log('res token : ' + accessToken);
        this.redirect('check', accessToken);
      } else {
        //Handle error
        let error = res;
        throw error;
      }
    } catch(error) {
      this.removeToken();
      this.setState({error: error});
      console.log("error " + error);
      this.setState({showProgress: false});
    }
  }

  render () {
    return (
       <View style={styles.container}>
        <Text style={styles.heading}>
          💃 Enjoy Hotel-Reverse 💃
        </Text>
        <TextInput
          onChangeText={ (text)=> this.setState({clientemail: text}) }
          style={styles.input} placeholder="Email">
        </TextInput>
        <TextInput
          onChangeText={ (text)=> this.setState({password: text}) }
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}>
        </TextInput>
        <TouchableHighlight onPress={this.onLoginPressed.bind(this)} style={styles.button}>
          <Text style={styles.buttonText}>
            Login
          </Text>
        </TouchableHighlight>

        <Text style={styles.error}>
          {this.state.error}
        </Text>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10,
    paddingTop: 80
  },
  input: {
    height: 50,
    marginTop: 10,
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
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  },
  heading: {
    fontSize: 30,
  },
  error: {
    color: 'red',
    paddingTop: 10
  },
  success: {
    color: 'green',
    paddingTop: 10
  },
  loader: {
    marginTop: 20
  }
});

export default Login;
