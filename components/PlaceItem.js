import React from "react";
import PropTypes from "prop-types";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";

const PlaceItem = ({ onDeleteItem, onSelect, image, title, address }) => {
  return (
    <TouchableOpacity
      onLongPress={onDeleteItem}
      onPress={onSelect}
      style={styles.placeItem}
    >
      <Image style={styles.image} source={{ uri: image }} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.address}>{address}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  placeItem: {
    borderColor: "#ccc",
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 1,
    elevation: 3,
    borderRadius: 2,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#ccc",
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  textContainer: {
    marginLeft: 25,
    width: 250,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  title: {
    color: "black",
    fontSize: 16,    
    marginTop: 20,
    marginBottom: 5,
    fontFamily: "montserrat-regular",
  },
  address: {
    color: "#666",
    fontSize: 14,
    fontFamily: "montserrat-regular",
  },
});

PlaceItem.propTypes = {
  onDeleteItem: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
};

export default PlaceItem;
