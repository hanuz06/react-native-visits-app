import React, { useEffect, useState, useCallback } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  Button,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";

import Colors from "../constants/Colors";
import * as placeActions from "../store/placeActions";
import ImageSelector from "../components/ImageSelector";
import LocationSelector from "../components/LocationSelector";

const ReviewSchema = yup.object({
  title: yup.string().required().min(4, "Minimum 4 characters required"),
  image: yup.string().required(),
  lat: yup.number().required,
  lng: yup.number().required,
});

const CoordsSchema = yup.object({
  lat: yup.number().required,
  lng: yup.number().required,
});

// const locationCoordsSchema = yup.object({
//   locationCoords: yup.object().required,
// });

const NewPlaceScreen = (props) => {
  const dispatch = useDispatch();
  const [locationCoords, setLocationCoords] = useState({});
  // const [titleValue, setTitleValue] = useState("");

  // const titleChangeHandler = (text) => {
  //   // you could add validation
  //   setTitleValue(text);
  // };

  // const savePlaceHandler = (values) => {
  //   dispatch(placeActions.addPlace(values));
  //   props.navigation.goBack();
  // };

  // locationCoordsSchema
  //   .isValid(locationCoords)

  const initialValues = { title: "", image: "" };

  const locationPickedHandler = async (locationData) => {
    // const res = await CoordsSchema.isValid(locationCoords, {
    //   abortEarly: "Oops, something is wrong!!",
    // });
    // console.log("res ", res);

    // initialValues["location"] = locationData;a
    setLocationCoords(locationData);
  };

  // useEffect(() => {
  //   initialValues.location = locationCoords;
  // }, [initialValues.title, initialValues.image, locationCoords]);

  return (
    <Formik
      initialValues={initialValues}
      // validationSchema={ReviewSchema.cast({
      //   title: initialValues.title,
      //   image: initialValues.image,
      // })}
      onSubmit={(values) => {
        // console.log("newplaceeeee ", locationCoords);
        dispatch(
          placeActions.addPlace(values.title, values.image, locationCoords)
        );
        props.navigation.goBack();
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
            {formikProps.touched.title && formikProps.errors.title}
          </Text>
          <ImageSelector onImageTaken={formikProps.handleChange("image")} />
          <LocationSelector
            navigation={props.navigation}
            onLocationSelected={locationPickedHandler}
          />
          {/* <TouchableOpacity
            style={styles.button}
            onPress={formikProps.handleSubmit}
          >
            <Text style={styles.text}>Save</Text>
          </TouchableOpacity> */}
          <Button title="Save" onPress={formikProps.handleSubmit} />
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
