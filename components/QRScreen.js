import * as React from 'react';
import { Alert, AsyncStorage, Button, Text, View, StyleSheet } from 'react-native';

export default class QRScreen extends React.Component {

  static navigationOptions = {
    title: "QR-code scannen",
  }

  parseURL = (url) => {
    const splittedURL = url.split("/");
    if(splittedURL.length < 4 || splittedURL[3].length < 7) {
      return { row: null, spot: null };
    } else {
      const row = parseInt(splittedURL[3].slice(2, 4));
      const spot = parseInt(splittedURL[3].slice(4, 7));
      if(isNaN(row) || isNaN(spot)) {
        return { row: null, spot: null };
      }
      return { row: row, spot: spot};
    }
  }

  saveLocation = async (url) => {
    const { row, spot } = this.parseURL(url);
    //check for invalid URL, if so alert and return
    if(row == null || spot == null) {
      Alert.alert(
        "Geen geldige URL gevonden",
        url,
        [
          {text: "OK", onPress: () => this.props.navigation.goBack()}
        ],
        { cancelable: false }
      );
      return;
    }
    //save the location with row and spot returned from parseURL
    try {
      const locationsString = await AsyncStorage.getItem('@BikeStore:locations');
      var locations;
      if(locationsString == null) {
        locations = [];
      } else {
        locations = JSON.parse(locationsString);
      }
      const dateString = new Date().toLocaleString();
      locations.unshift({row: row, spot: spot, date: dateString});
      await AsyncStorage.setItem("@BikeStore:locations", JSON.stringify(locations));
      Alert.alert(
        "Opgeslagen!",
        "Rij: " + row + ", plek: " + spot + ", " + dateString,
        [
          {text: "OK", onPress: () => this.props.navigation.goBack()}
        ],
        { cancelable: false }
      );
    } catch (err) {
      console.log("Error while saving location: ", err);
    }
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>QR Screen</Text>
        <Button
          title="Locatie toevoegen"
          color="blue"
          onPress={() => this.saveLocation("http://ab9.nl/DC10004")}
        />
      </View>
    );
  }
}
