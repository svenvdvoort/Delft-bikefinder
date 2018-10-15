import * as React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';

import ListItem from "./ListItem"

export default class LocationsList extends React.Component {
  render() {
    const locations = this.props.locations.map((location, index) => 
      <ListItem
        row={location.row}
        spot={location.spot}
        date={location.date}
        key={index}
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
