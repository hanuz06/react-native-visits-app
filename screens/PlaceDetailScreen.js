import React from "react";
import { StyleSheet, Image, Text, View, ScrollView } from "react-native";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import MapPreview from "../components/MapPreview";

const PlaceDetailScreen = ({ navigation }) => {
  const placeId = navigation.getParam("placeId");
  const selectedPlace = useSelector((state) =>
    state.places.places.find((place) => place.id === placeId)
  );

  const selectedLocation = { lat: selectedPlace.lat, lng: selectedPlace.lng };

  const mapDetailsHandler = () => {
    // console.log(props.navigation);
    navigation.navigate("Map", {
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
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
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
    fontFamily: "montserrat-bold",
  },
  mapPreview: {
    width: "100%",
    maxWidth: 450,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});

PlaceDetailScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
