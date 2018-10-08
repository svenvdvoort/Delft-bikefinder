import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class ListItem extends React.Component {
  render() {
    return (
      <View style={styles.listitem}>
        <Text style={styles.bikelocation}>
          Rij {this.props.row} - plek {this.props.spot}
        </Text>
        <Text style={styles.date}>
          {this.props.date}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listitem: {
    margin: 24,
    marginBottom: 0,
  },
  bikelocation: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#34495e',
  },
  date: {
    fontSize: 16,
    color: '#34495e',
  },
});
