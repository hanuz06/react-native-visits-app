import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import PropTypes from "prop-types";
import MapView, { Marker } from "react-native-maps";

import Colors from "../constants/Colors";

const MapScreen = ({ navigation }) => {
  const initialLocation = navigation.getParam("initialLocation");
  const readOnly = navigation.getParam("readOnly");
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const mapRegion = {
    latitude: initialLocation ? initialLocation.lat : 51.04427,
    longitude: initialLocation ? initialLocation.lng : -114.062019,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectedLocationHandler = (e) => {
    if (readOnly) {
      return;
    }

    setSelectedLocation({
      lat: e.nativeEvent.coordinate.latitude,
      lng: e.nativeEvent.coordinate.longitude,
    });
  };

  const saveSelectedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "Location not selected!",
        "Please try again later or select location on the map",
        [{ text: "OK" }]
      );
      return;
    }
    navigation.navigate("NewPlace", {
      pickedLocation: selectedLocation,
    });
  }, [selectedLocation]);

  useEffect(() => {
    navigation.setParams({ saveLocation: saveSelectedLocationHandler });
  }, [saveSelectedLocationHandler]);

  let markerCoords;

  if (selectedLocation) {
    markerCoords = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
    };
  }

  return (
    <MapView
      style={styles.map}
      region={mapRegion}
      onPress={selectedLocationHandler}
    >
      {markerCoords && (
        <Marker
          draggable
          coordinate={markerCoords}
          title="Selected location"
        ></Marker>
      )}
    </MapView>
  );
};

MapScreen.navigationOptions = (navData) => {
  const saveLocationFunction = navData.navigation.getParam("saveLocation");
  const readOnly = navData.navigation.getParam("readOnly");

  if (readOnly) {
    return {};
  }
  return {
    headerRight: () => (
      <TouchableOpacity
        style={styles.saveButton}
        onPress={saveLocationFunction}
      >
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    ),
  };
};

export default MapScreen;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  saveButton: {
    marginHorizontal: 20,
  },
  saveButtonText: {
    fontSize: 16,
    color: Platform.select({ android: "white", ios: Colors.primary }),
  },
});

MapScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
