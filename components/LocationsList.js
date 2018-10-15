import * as React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';

import ListItem from "./ListItem"

export default class LocationsList extends React.Component {
  render() {
<<<<<<< HEAD
    const locations = this.props.locations.map((location, index) => 
=======
    const locations = this.props.locations.map((location) => 
>>>>>>> f2a8cf89706a1d305580dbf93eea43e695b503bb
      <ListItem
        row={location.row}
        spot={location.spot}
        date={location.date}
<<<<<<< HEAD
        key={index}
=======
>>>>>>> f2a8cf89706a1d305580dbf93eea43e695b503bb
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
