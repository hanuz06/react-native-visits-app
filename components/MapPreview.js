import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, StyleSheet, Image } from "react-native";
import APIKEY from "../env.env";

const MapPreview = ({ location, onPress, style, children }) => {
  let imagePreviewUrl;

  if (location) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${location.lat},${location.lng}&key=${APIKEY.googleApiKey}`;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ ...styles.mapPreview, ...style }}
    >
      {location ? (
        <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

export default MapPreview;

const styles = StyleSheet.create({
  mapPreview: {
    alignItems: "center",
    justifyContent: "center",
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
});

MapPreview.propTypes = {
  location: PropTypes.object,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.object,
  children: PropTypes.node,
};
