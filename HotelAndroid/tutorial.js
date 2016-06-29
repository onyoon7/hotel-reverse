import React, { Component } from 'react';
import {
  AsyncStorage,
  View,
  Text,
  TouchableHighlight,
  Image,
  StyleSheet,
  ViewPagerAndroid,
} from 'react-native'

let IMAGES = [
  './assets/bg_1.jpg',
  './assets/bg_2.jpg',
  './assets/bg_3.jpg',
  './assets/bg_4.jpg',
  './assets/bg_5.jpg',
];
let PAGES = IMAGES.length;

class ToturialPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      animationsAreEnabled: true,
      scrollEnabled: true,
      progress: {
        offset: 0,
        position: 0
      },
    }
  }


  onPageSelected (e) {
    console.log('onPageSelected : ', e.nativeEvent.position)
    this.setState({page: e.nativeEvent.position});
  }

  onPageScroll(e) {
    console.log('onPageScroll : ', e.nativeEvent)
    this.setState({progress: e.nativeEvent})
  }

  onPageScrollStateChanged (state : ViewPagerScrollState) {
    this.setState({scrollState: state});
  }

  async _handlePress (where) {
    await AsyncStorage.setItem('tutorial','true')
    this.props.navigator.push({id : where});
  }

  render() {
    let pages = [];
    for(let i=0; i<PAGES; i++) {
      pages.push(
        <View key={i} collapsable={false}>
          <Image
            sylte={styles.image}
            source={require('./assets/bg_1.jpg')}
          />
        </View>
      )
    }
    console.log(pages)
    return (
      <View style = {styles.container}>
        <ViewPagerAndroid
          style={styles.viewPager}
          initialPage={0}
          onPageScroll = {this.onPageScroll.bind(this)}
          onPageScrollStateChanged = {this.onPageScrollStateChanged.bind(this)}
          scrollEnabled = {this.state.scrollEnabled}
          pageMargin = {0}
          ref = {(viewPager) => {this.viewPager = viewPager;}}>
          {pages}
        </ViewPagerAndroid>
        <TouchableHighlight
          onPress = {()=>this._handlePress('search')}>
          <Text>skip</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    height: 30,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    width: 0,
    margin: 5,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'gray',
  },
  buttonDisabled: {
    backgroundColor: 'black',
    opacity: 0.5,
  },
  buttonText: {
    color: 'white',
  },
  scrollStateText: {
    color: '#99d1b7',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    flex : 1,
    position : 'absolute',
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  likeButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderColor: '#333333',
    borderWidth: 1,
    borderRadius: 5,
    flex: 1,
    margin: 8,
    padding: 8,
  },
  likeContainer: {
    flexDirection: 'row',
  },
  likesText: {
    flex: 1,
    fontSize: 18,
    alignSelf: 'center',
  },
  progressBarContainer: {
    height: 10,
    margin: 10,
    borderColor: '#eeeeee',
    borderWidth: 2,
  },
  progressBar: {
    alignSelf: 'flex-start',
    flex: 1,
    backgroundColor: '#eeeeee',
  },
  viewPager: {
    flex: 1,
  },
});

export default ToturialPage;
