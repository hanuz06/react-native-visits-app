import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import { Platform } from "react-native";

import Colors from "../constants/Colors";

import MapScreen from "../screens/MapScreen";
import NewPlaceScreen from "../screens/NewPlaceScreen";
import PlaceDetailScreeen from "../screens/PlaceDetailScreen";
import PlacesListScreen from "../screens/PlacesListScreen";

const PlacesNavigator = createStackNavigator(
  {
    Places: PlacesListScreen,
    PlaceDetail: PlaceDetailScreeen,
    NewPlace: NewPlaceScreen,
    Map: MapScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.select({
          android: Colors.primary,
          ios: "",
        }),
      },
      headerTintColor: Platform.select({
        android: "white",
        ios: Colors.primary,
      }),
    },
  }
);

export default createAppContainer(PlacesNavigator);
