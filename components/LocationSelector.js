import React, { useState } from "react";
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

const LocationSelector = (props) => {
  const [selectedLocation, setSelectedLocation] = useState();
  const [isLoading, setIsLoading] = useState(false);

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

  const getLocationHandler = async () => {
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
    } catch (err) {
      Alert.alert(
        "Could not get location!",
        "Please try again later or select location on the map",
        [{ text: "OK" }]
      );
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.locationSelector}>
      <MapPreview style={styles.mapPreview} location={selectedLocation}>
        {isLoading ? (
          <ActivityIndicator size="large" color={Colors.accent} />
        ) : (
          <Text>No location chosen yet!</Text>
        )}
      </MapPreview>
      <Button
        title="Get user location"
        color={Colors.primary}
        onPress={getLocationHandler}
      />
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
});
