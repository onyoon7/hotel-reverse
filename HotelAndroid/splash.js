import React, { Component } from 'react';
import {
  View,
  Image,
  AsyncStorage,
  Text,
  StyleSheet,
} from 'react-native';


class SplashPage extends Component {

  async movePage () {
    await AsyncStorage.setItem('tutorial','false');
    let tutorial = await AsyncStorage.getItem('tutorial')
    if(tutorial==='true') {
      this.props.navigator.push({id : 'search'});
    } else {
      this.props.navigator.push({id : 'tutorial'});
    }
  }

  componentWillMount () {
    var navigator = this.props.navigator;
      setTimeout (() => this.movePage(), 2000);
  }

  render () {
      return (
        <View style={{flex: 1, backgroundColor: '#C8E6C9', alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.text}> Welcome</Text>
          <Text style={styles.text}> to</Text>
          <Text style={styles.text}> Hotel-Reverse </Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  text : {
    fontSize : 50,
    textAlign : 'center'
  }
})

module.exports = SplashPage;
