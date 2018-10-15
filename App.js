import * as React from 'react';
import { Button, View, ScrollView, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';
<<<<<<< HEAD
=======
import { Constants } from 'expo';
>>>>>>> f2a8cf89706a1d305580dbf93eea43e695b503bb

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

<<<<<<< HEAD
  render() {
    return <RootNav/>
  }
}
=======
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
>>>>>>> f2a8cf89706a1d305580dbf93eea43e695b503bb
