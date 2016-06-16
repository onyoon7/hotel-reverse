import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Text,

} from 'react-native';
import Register from './register';
import Login from './login';


class HotelSignin extends Component {
  constructor(props) {
    super(props);
  }

  _handlePress(routeName) {
    this.props.navigator.push({
      id : routeName,
    })
    this.props.onChange(this.state.client_email);
  }

  render() {
    return (
      <View>
        <View style = {styles.container}>
          <Login />
        </View>
        <View style={{flex : 2}}>

          <TouchableHighlight
            style={styles.register}
            onPress = {this._handlePress.bind(this, 'register')}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableHighlight>
        </View>
        <View style={{flex : 3}}>
          <TouchableHighlight
            style={[styles.button, styles.facebook]}
            onPress = {this._handlePress.bind(this, 'facebook')}>
            <Text style={styles.buttonText}>Facebook</Text>
          </TouchableHighlight>
        </View>
        <View style={{flex : 4}}>
          <TouchableHighlight
            style={[styles.button, styles.googleweb]}
            onPress = {this._handlePress.bind(this, 'google')}>
            <Text style={styles.buttonText}>google</Text>
          </TouchableHighlight>
        </View>
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
    backgroundColor : '#F5FCFF',
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
  buttonText: {
    color: '#fff',
    fontSize: 18,
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flexDirection: 'row',
    borderRadius: 8,
    marginBottom: 10,
    justifyContent: 'center'
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
    margin : 30
  },
  facebook: {
    backgroundColor: '#3b5998',
    margin : 30
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
