import React, { useState } from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import ReduxThunk from "redux-thunk"; // allow to make async request to Firebase

import PlacesNavigator from "./navigation/PlacesNavigator";
import placeReducer from "./store/placeReducer";
import { init } from "./db/db";

init()
  .then(() => {
    console.log("Inititalized database");
  })
  .catch((err) => {
    console.log("Initializing db failed.");
    console.log(err);
  });

const rootReducer = combineReducers({
  places: placeReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(ReduxThunk),
  composeWithDevTools()
);

const fetchFonts = () => {
  return Font.loadAsync({
    "montserrat-bold": require("./assets/fonts/Montserrat-Bold.ttf"),
    "montserrat-regular": require("./assets/fonts/Montserrat-Regular.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }

  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}
