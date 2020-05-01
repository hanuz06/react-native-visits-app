import React from "react";
import { StyleSheet, Image, Text, View, ScrollView } from "react-native";
import { useSelector } from "react-redux";

import MapPreview from "../components/MapPreview";

const PlaceDetailScreen = (props) => {
  const placeId = props.navigation.getParam("placeId");
  const selectedPlace = useSelector((state) =>
    state.places.places.find((place) => place.id === placeId)
  );

  const selectedLocation = { lat: selectedPlace.lat, lng: selectedPlace.lng };

  const mapDetailsHandler = () => {
    // console.log(props.navigation);
    props.navigation.navigate("Map", {
      readOnly: true,
      initialLocation: selectedLocation,
    });
  };

  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
      <Image source={{ uri: selectedPlace.imageUri }} style={styles.image} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.addressText}>{selectedPlace.address}</Text>
        </View>
        <MapPreview
          style={styles.mapPreview}
          location={selectedLocation}
          onPress={mapDetailsHandler}
        />
      </View>
    </ScrollView>
  );
};

PlaceDetailScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("placeTitle"),
  };
};

export default PlaceDetailScreen;

const styles = StyleSheet.create({
  image: {
    height: "30%",
    minHeight: 220,
    width: "100%",
    backgroundColor: "#ccc",
  },
  locationContainer: {
    width: "100%",
    maxWidth: 450,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10,
    backgroundColor: "#ccc",
  },
  addressContainer: {
    padding: 20,
  },
  addressText: {
    color: "#080b72",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  mapPreview: {
    width: "100%",
    maxWidth: 450,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});
