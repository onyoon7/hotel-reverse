import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Text,
  TextInput,
  AsyncStorage,
} from 'react-native';
import Register from './register';
import Login from './login';

const ACCESS_TOKEN = 'access_token';

class HotelSignin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      client_email : "",
      password : "",
      error : "",
    }
  }

// ----- the token related to client login ----- //

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

// -------------------------------------------- //

  _handlePress(routeName) {
    this.props.navigator.push({
      id : routeName,
    })
    // this.props.onChange(this.state.client_email);
  }

  render() {
    return (
      <View style = {styles.container}>

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

        <TouchableHighlight
          style={styles.button}
          onPress = {this._handlePress.bind(this, 'register')}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={[styles.button, styles.facebook]}
          onPress = {this._handlePress.bind(this, 'facebook')}>
          <Text style={styles.buttonText}>Facebook</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[styles.button, styles.googleweb]}
          onPress = {this._handlePress.bind(this, 'google')}>
          <Text style={styles.buttonText}>google</Text>
        </TouchableHighlight>
        <Text style={styles.error}>
          {this.state.error}
        </Text>
      </View>
    )
  }
}

let styles = StyleSheet.create({
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10,
    paddingTop: 80
  },
  content: {
    flex: 1,
    marginTop: 80,
    marginRight: 10,
    marginLeft: 10
  },
  register : {
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center'
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
  },
  pic: {
    width: 100,
    height: 100
  },
  mono: {
    fontFamily: 'Menlo',
    paddingTop: 10
  },
  scroll: {
    marginTop: 0,
    paddingTop: 0,
    backgroundColor: '#f2f2f2',
    borderColor: '#888',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    flexDirection: 'row'
  },
  header: {
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
    fontSize: 16
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  'googleweb': {
    backgroundColor: '#ccc',
  },
  facebook: {
    backgroundColor: '#3b5998'
  },
  twitter: {
    backgroundColor: '#48BBEC'
  },
  instagram: {
    backgroundColor: '#3F729B'
  },
  tumblr: {
    backgroundColor: '#36465D'
  },
  'linkedin-web': {
    backgroundColor: '#0077B5'
  }
});


export default HotelSignin;
