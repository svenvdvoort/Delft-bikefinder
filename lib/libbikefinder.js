import { AsyncStorage } from 'react-native';

const locationskey = "@bikefinder:locations";

const getLocations = async () => {
  const locationsString = await AsyncStorage.getItem(locationskey);
  if(locationsString == null) {
    return [];
  } else {
    return JSON.parse(locationsString);
  }
}

const saveWithURL = async (url) => {
  const splittedURL = url.split("/");
  if(splittedURL.length < 4 || splittedURL[3].length < 7) {
    throw url + "\nInvalid URL syntax";
  } else {
    const row = parseInt(splittedURL[3].slice(2, 4));
    const spot = parseInt(splittedURL[3].slice(4, 7));
    if(isNaN(row) || isNaN(spot)) {
      throw url + "\nNot valid numbers found in URL";
    }
    return await saveLocation(row, spot);
  }
};

const saveLocation = async (row, spot) => {
  try {
    const locationsString = await AsyncStorage.getItem(locationskey);
    var locations;
    if(locationsString == null) {
      locations = [];
    } else {
      locations = JSON.parse(locationsString);
    }
    const date = new Date();
    const dateString = date.getHours()+":"+date.getMinutes().toString().padStart(2, '0')
      +"   "+date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
    locations.unshift({row: row, spot: spot, date: dateString});
    await AsyncStorage.setItem(locationskey, JSON.stringify(locations));
    return { row: row, spot: spot, dateString: dateString };
  } catch (err) {
    console.log("Error while saving location: ", err);
  }
};

removeLocations = async () => {
  const locationsString = await AsyncStorage.getItem(locationskey);
  var locations;
  if(locationsString == null) {
    locations = [];
  } else {
    locations = JSON.parse(locationsString);
  }
  if(locations.length < 1) {
    await AsyncStorage.setItem(locationskey, JSON.stringify([]));
  } else {
    await AsyncStorage.setItem(locationskey, JSON.stringify([locations[0]]));
  }
};

module.exports.getLocations = getLocations;
module.exports.saveWithURL = saveWithURL;
module.exports.saveLocation = saveLocation;
module.exports.removeLocations= removeLocations;
