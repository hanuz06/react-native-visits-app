import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
  TextInput,
  View,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";

import Colors from "../constants/Colors";

const ReviewSchema = yup.object({
  title: yup.string().required().min(4, "Minimum 4 characters required"),
});

const NewPlaceScreen = (props) => {
  // const [titleValue, setTitleValue] = useState("");

  // const titleChangeHandler = (text) => {
  //   // you could add validation
  //   setTitleValue(text);
  // };

  // const savePlaceHandler = () => {};

  return (
    <Formik
      initialValues={{ title: "" }}
      validationSchema={ReviewSchema}
      onSubmit={() => {}}
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
          <TouchableOpacity
            style={styles.button}
            onPress={formikProps.handleSubmit}
          >
            <Text style={styles.text}>Save</Text>
          </TouchableOpacity>
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
    color: "#1f2a33",
  },
  errorText: {
    color: "crimson",
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 2,
    textAlign: "center",
  },
});
