import * as React from 'react';
import { Button, Text, TextInput, View, TouchableOpacity, StyleSheet } from 'react-native';

export default class ListItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      row: "",
      spot: ""
    };
  }

  handleChange = (input, value) => {
    const newState = {};
    newState[input] = value;
    this.setState(newState);
  };

  render() {
    return (
      <View style={styles.menu}>
        <Text style={styles.label}>Rij:</Text>
        <TextInput
          style={styles.textinput}
          keyboardType="number-pad"
          maxLength={4}
          onChangeText={(value) => this.handleChange("row", value)}
        />
        <Text style={styles.label}>Plek:</Text>
        <TextInput
          style={styles.textinput}
          keyboardType="number-pad"
          maxLength={4}
          onChangeText={(value) => this.handleChange("spot", value)}
        />
        <TouchableOpacity
          style={styles.buttonTO}
          onPress={() => this.props.onSubmit(this.state.row, this.state.spot)}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  menu: {
    flexDirection: "row",
    height: 40
  },
  label: {
    fontSize: 30,
    marginLeft: 7,
    marginRight: 7
  },
  textinput: {
    width: 100,
    fontSize: 15,
    borderWidth: 2,
    marginLeft: 7,
    marginRight: 7
  },
  buttonTO: {
    backgroundColor: "blue",
    alignItems: "center",
    width: 30
  },
  buttonText: {
    fontSize: 25,
    color: "white"
  }
});
