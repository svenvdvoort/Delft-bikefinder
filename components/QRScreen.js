import * as React from 'react';
import { Alert, AsyncStorage, Button, Text, View, StyleSheet } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

export default class QRScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      flashlightEnabled: false,
    };
  }

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

  toggleFlashlight = () => {
    this.setState({
      flashlightEnabled: !this.state.flashlightEnabled,
    });
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
      <View style={{flex: 1, justifyContent: 'flex-start'}}>
        <View style={{padding: 20}}>
          <Button
            title="Zaklamp"
            color={this.state.flashlightEnabled ? "blue" : "grey"}
            onPress={this.toggleFlashlight}
          />
        </View>
        <View>
          <QRCodeScanner
            onRead={(e) => this.saveLocation(e.data)}
            cameraProps={{ flashMode:
              (this.state.flashlightEnabled ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off)
            }}
            showMarker={true}
          />
        </View>
      </View>
    );
  }
}
