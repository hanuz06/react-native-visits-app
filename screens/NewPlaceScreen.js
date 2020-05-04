import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Alert,
  Button,
} from "react-native";
import { Formik, ErrorMessage } from "formik";
import PropTypes from "prop-types";
import * as yup from "yup";
import { useDispatch } from "react-redux";

import Colors from "../constants/Colors";
import * as placeActions from "../store/placeActions";
import ImageSelector from "../components/ImageSelector";
import LocationSelector from "../components/LocationSelector";

const ReviewSchema = yup.object({
  title: yup.string().required().min(4, "Minimum 4 characters required"),
  image: yup.string().required("Image required"),
});

const NewPlaceScreen = ({ navigation }) => {
  const [locationCoords, setLocationCoords] = useState({});
  const dispatch = useDispatch();

  const locationPickedHandler = (locationData) => {
    setLocationCoords(locationData);
  };

  return (
    <Formik
      initialValues={{
        title: "",
        image: "",
      }}
      validationSchema={ReviewSchema}
      onSubmit={(values) => {
        if (Object.keys(locationCoords).length === 0) {
          Alert.alert(
            "Location not selected!",
            "Please select location on the map",
            [{ text: "OK" }]
          );
          return;
        }
        dispatch(
          placeActions.addPlace(values.title, values.image, locationCoords)
        );
        navigation.goBack();
      }}
    >
      {(formikProps) => (
        <ScrollView style={styles.form}>
          <Text style={styles.title}>Title</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Please input title..."
            onChangeText={formikProps.handleChange("title")}
            value={formikProps.values.title}
            onBlur={formikProps.handleBlur("title")}
          />
          <Text style={styles.errorText}>
            {" "}
            <ErrorMessage name="title" />
          </Text>
          <ImageSelector onImageTaken={formikProps.handleChange("image")} />
          <Text style={styles.errorText}>
            {" "}
            <ErrorMessage name="image" />
          </Text>
          <LocationSelector
            navigation={navigation}
            onLocationSelected={locationPickedHandler}
          />
          <Button
            title="Save"
            color={Colors.primary}
            onPress={formikProps.handleSubmit}
          />
        </ScrollView>
      )}
    </Formik>
  );
};

NewPlaceScreen.navigationOptions = {
  headerTitle: "Add your place",
};

export default NewPlaceScreen;

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  title: {
    fontSize: 18,
    marginBottom: 15,
    fontFamily: "montserrat-regular",
  },
  textInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    padding: 4,
  },
  button: {
    alignItems: "center",
    backgroundColor: Colors.primary,
    padding: 10,
  },
  text: {
    fontSize: 18,
    color: "white",
  },
  errorText: {
    color: "crimson",
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 2,
    textAlign: "center",
  },
});

NewPlaceScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
