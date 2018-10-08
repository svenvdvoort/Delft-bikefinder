import * as React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';

import ListItem from "./ListItem"

export default class LocationsList extends React.Component {
  render() {
    const locations = this.props.locations.map((location) => 
      <ListItem
        row={location.row}
        spot={location.spot}
        date={location.date}
      />
    );
    return (
      <ScrollView>
        {locations}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({

});
