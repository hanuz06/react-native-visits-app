import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import ReduxThunk from "redux-thunk"; // allow to make async request to Firebase
import { StyleSheet, Text, View } from "react-native";

import PlacesNavigator from "./navigation/PlacesNavigator";
import placeReducer from "./store/placeReducer";

const rootReducer = combineReducers({
  places: placeReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(ReduxThunk),
  composeWithDevTools()
);

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
