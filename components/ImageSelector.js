import React, { useState } from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View, Button, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

import Colors from "../constants/Colors";

const ImageSelector = ({ onImageTaken }) => {
  const [pickedImage, setPickedImage] = useState();

  // this configuration is required for ios, not for android
  const verifyPermission = async () => {
    const res = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );
    if (res.status != "granted") {
      Alert.alert(
        "Insufficient permission!",
        "You need to grant camera permissions to use this app.",
        [{ text: "Ok" }]
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }
    // opens device camera
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    if (!image.uri) {
      return;
    }

    onImageTaken(image.uri);
    setPickedImage(image.uri);
  };

  return (
    <View style={styles.imageSelector}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <Text style={styles.text}>No image taken yet.</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        )}
      </View>
      <Button
        title="Take Image"
        color={Colors.primary}
        onPress={takeImageHandler}
      />
    </View>
  );
};

export default ImageSelector;

const styles = StyleSheet.create({
  imageSelector: {
    marginBottom: 10,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  text: {
    fontFamily: "montserrat-regular",
  },
});

ImageSelector.propTypes = {
  onImageTaken: PropTypes.func.isRequired,
};
