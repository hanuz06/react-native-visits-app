import React, { useEffect } from "react";
import {
  Platform,
  FlatList,
  Alert,
  Text,
  View,
  StyleSheet,
  ImageBackground,
} from "react-native";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/HeaderButton";
import PlaceItem from "../components/PlaceItem";
import * as placeActions from "../store/placeActions";

const PlacesListScreen = ({ navigation }) => {
  const places = useSelector((state) => state.places.places);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(placeActions.loadPlaces());
  }, [dispatch]);

  const deletePlaceHandler = (id) => {
    Alert.alert(
      "Place will be deleted",
      "Are you sure?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "DELETE",
          onPress: () => dispatch(placeActions.deletePlace(id)),
        },
      ]
      // { cancelable: false }
    );
  };
  return (
    <View style={styles.mainWindow}>
      {places.length !== 0 ? (
        <FlatList
          data={places}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
            <PlaceItem
              image={itemData.item.imageUri}
              title={itemData.item.title}
              address={itemData.item.address}
              onDeleteItem={() => deletePlaceHandler(itemData.item.id)}
              onSelect={() => {
                navigation.navigate("PlaceDetail", {
                  placeTitle: itemData.item.title,
                  placeId: itemData.item.id,
                });
              }}
            />
          )}
        />
      ) : (
        <ImageBackground
          source={require("../assets/images/eiffel.jpg")}
          style={styles.image}
        >
          <Text style={styles.text}>Add your places! </Text>
        </ImageBackground>
      )}
    </View>
  );
};

PlacesListScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "All visited places",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add place"
          iconName={Platform.select({
            android: "md-add",
            ios: "ios-add",
          })}
          onPress={() => {
            navData.navigation.navigate("NewPlace");
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default PlacesListScreen;

const styles = StyleSheet.create({
  mainWindow: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.8,
  },
  text: {
    fontSize: 22,
    color: "purple",
    fontFamily: "montserrat-regular",
  },
});

PlacesListScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
