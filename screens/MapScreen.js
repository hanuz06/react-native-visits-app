import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

import Colors from "../constants/Colors";

const MapScreen = (props) => {
  const [selectedLocation, setSelectedLocation] = useState();

  const mapRegion = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectedLocationHandler = (e) => {
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
    props.navigation.navigate("NewPlace", {
      selectedLocation: selectedLocation,
    });
  }, [selectedLocation]);

  useEffect(() => {
    props.navigation.setParams({ saveLocation: saveSelectedLocationHandler });
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
          onDragEnd={selectedLocationHandler}
          coordinate={markerCoords}
          title="Selected location"
        ></Marker>
      )}
    </MapView>
  );
};

MapScreen.navigationOptions = (navData) => {
  const saveFn = navData.navigation.getParam("saveLocation");

  return {
    headerRight: () => (
      <TouchableOpacity style={styles.saveButton} onPress={saveFn}>
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
