import * as React from 'react';
import { Alert, AsyncStorage, Button, Text, View, StyleSheet } from 'react-native';

import LocationsList from './LocationsList';
import AddBikeSpotMenu from './AddBikeSpotMenu';
import libbikefinder from '../lib/libbikefinder';

export default class MainScreen extends React.Component {

  updateLocations = async () => {
    const locations = await libbikefinder.getLocations();
    this.setState({
      locations: locations
    });
  };

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
  };

  removeLocations = async () => {
    await libbikefinder.removeLocations();
    this.updateLocations();
  };

  static navigationOptions = {
    title: "Waar staat mijn fiets?",
  };

  constructor(props) {
    super(props);
    this.state = {
      locations: [],
    };
    this.props.navigation.addListener('willFocus', this.updateLocations);
  }

  componentWillMount() {
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
          <AddBikeSpotMenu
            onSubmit={async (row, spot) => {
              if(row !== "" && spot !== "") {
                await libbikefinder.saveLocation(row, spot);
                await this.updateLocations();
              }
            }}
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
