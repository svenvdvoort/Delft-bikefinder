import * as React from 'react';
import { Alert, AsyncStorage, Button, Text, View, StyleSheet } from 'react-native';

import LocationsList from './LocationsList';

export default class MainScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      locations: [],
    };
    this.props.navigation.addListener('willFocus', this.updateLocations);
  }

  static navigationOptions = {
    title: "Waar staat mijn fiets?",
  }

  componentWillMount() {
    this.updateLocations();
  }

  updateLocations = async () => {
    const locationsString = await AsyncStorage.getItem("@BikeStore:locations");
    var locations;
    if(locationsString == null) {
      locations = [];
    } else {
      locations = JSON.parse(locationsString);
    }
    this.setState({
      locations: locations
    });
  }

  removeSure = () => {
    Alert.alert(
      "Weet je het zeker?",
      "Alle historie verwijderen? (Laatste locatie blijft altijd bewaard)",
      [
        {text: "Terug", style: "cancel"},
        {text: "OK", onPress: this.removeLocations, style: "destructive"}
      ],
      { cancelable: false }
    );
  }

  removeLocations = async () => {
    const locationsString = await AsyncStorage.getItem("@BikeStore:locations");
    var locations;
    if(locationsString == null) {
      locations = [];
    } else {
      locations = JSON.parse(locationsString);
    }
    //remove setState and add AsyncStorage.setItem and updateLocations!
    if(locations.length < 1) {
      await AsyncStorage.setItem("@BikeStore:locations",
          JSON.stringify([]));
    } else {
      await AsyncStorage.setItem("@BikeStore:locations",
          JSON.stringify([locations[0]]));
    }
    this.updateLocations();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.button}>
          <Button
            title="Scan QR-code"
            color="blue"
            onPress={() => this.props.navigation.navigate('QRScreen')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Verwijder historie"
            color="red"
            onPress={this.removeSure}
          />
        </View>
        <LocationsList
          locations={this.state.locations}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  button: {
    paddingTop: 15,
  }
});