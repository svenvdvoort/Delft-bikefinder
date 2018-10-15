import * as React from 'react';
import { Button, View, ScrollView, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';

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
  render() {
    return <RootNav/>
  }
}
