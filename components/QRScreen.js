import * as React from 'react';
import { Alert, Button, Text, View, StyleSheet } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

import libbikefinder from '../lib/libbikefinder';

export default class QRScreen extends React.Component {

  static navigationOptions = {
    title: "QR-code scannen",
  }

  save = async (url) => {
    try {
      const { row, spot, dateString } = await libbikefinder.saveWithURL(url);
      Alert.alert(
        "Opgeslagen!",
        "Rij: " + row + ", plek: " + spot + ", " + dateString,
        [
          {text: "OK", onPress: () => this.props.navigation.goBack()}
        ],
        { cancelable: false }
      );
    } catch(err) {
      Alert.alert(
        "Geen geldige URL gevonden",
        err,
        [
          {text: "OK", onPress: () => this.props.navigation.goBack()}
        ],
        { cancelable: false }
      );
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      flashlightEnabled: false,
    };
  }

  toggleFlashlight = () => {
    this.setState({
      flashlightEnabled: !this.state.flashlightEnabled,
    });
  }

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
            onRead={(e) => {this.save(e.data)}}
            cameraProps={{
              flashMode: (this.state.flashlightEnabled ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off)
            }}
            showMarker={true}
          />
        </View>
      </View>
    );
  }
}
