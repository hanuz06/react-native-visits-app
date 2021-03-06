import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Alert,
  Button,
} from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import Colors from "../constants/Colors";
import MapPreview from "./MapPreview";

const LocationSelector = ({ onLocationSelected, navigation }) => {
  const [selectedLocation, setSelectedLocation] = useState();
  const [isLoading, setIsLoading] = useState(false);

  // "pickedLocation" navigation param came from MapScreen via NewPlaceScreen
  const mapSelectedLocation = navigation.getParam("pickedLocation");

  useEffect(() => {
    if (mapSelectedLocation) {
      setSelectedLocation(mapSelectedLocation);
      onLocationSelected(mapSelectedLocation);
    }
  }, [mapSelectedLocation]);

  // this configuration is required for ios, not for android
  const verifyPermission = async () => {
    const res = await Permissions.askAsync(Permissions.LOCATION);
    if (res.status != "granted") {
      Alert.alert(
        "Insufficient permission!",
        "You need to grant location permissions to use this app.",
        [{ text: "Ok" }]
      );
      return false;
    }
    return true;
  };

  const getLocationHandler = async (e) => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }

    try {
      setIsLoading(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });

      setSelectedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });

      onLocationSelected({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (err) {
      Alert.alert(
        "Could not get location!",
        "Please try again later or select location on the map",
        [{ text: "OK" }]
      );
    }
    setIsLoading(false);
  };

  const selectOnMapHandler = () => {
    navigation.navigate("Map");
  };

  return (
    <View style={styles.locationSelector}>
      <MapPreview
        style={styles.mapPreview}
        location={selectedLocation}
        onPress={selectOnMapHandler}
      >
        {isLoading ? (
          <ActivityIndicator size="large" color={Colors.accent} />
        ) : (
          <Text style={styles.text}>No location chosen yet!</Text>
        )}
      </MapPreview>
      <View style={styles.buttons}>
        <Button
          title="Get user location"
          color={Colors.primary}
          onPress={getLocationHandler}
        />
        <Button
          title="Select on a map"
          color={Colors.primary}
          onPress={selectOnMapHandler}
        />
      </View>
    </View>
  );
};

export default LocationSelector;

const styles = StyleSheet.create({
  locationSelector: {
    // alignItems: "center",
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: "100%",
    height: 150,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  text: {
    fontFamily: "montserrat-regular",
  },
});

LocationSelector.propTypes = {
  onLocationSelected: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
};
