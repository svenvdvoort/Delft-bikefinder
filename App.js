import * as React from 'react';
import { Button, View, ScrollView, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Constants } from 'expo';

// You can import from local files
import MainScreen from './components/MainScreen';
import QRScreen from './components/QRScreen';

const RootNav = createStackNavigator({
  MainScreen: {
    screen: MainScreen
  },
  QRScreen: {
    screen: QRScreen
  },
}, 
{
  initialRouteName: 'MainScreen'
});

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      locations: []
    };
  }

  render() {
    return <RootNav/>
  }
}