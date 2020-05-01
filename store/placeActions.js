import * as FileSystem from "expo-file-system";

import { ADD_PLACE, SET_PLACES } from "../types";
import { insertPlace, fetchPlaces } from "../db/db";

export const addPlace = (title, image, location) => {
  return async (dispatch) => {
    const fileName = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });

      const dbRes = await insertPlace(
        title,
        newPath,
        "Dummy Address",
        location.lat,
        location.lng
      );      
      dispatch({
        type: ADD_PLACE,
        placeData: { id: dbRes.insertId, title: title, image: newPath, latitude: location.lat, longitude: location.lng },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const loadPlaces = () => {
  return async (dispatch) => {
    try {
      const dbRes = await fetchPlaces();     
      dispatch({
        type: SET_PLACES,
        places: dbRes.rows._array,
      });
    } catch (err) {
      throw err;
    }
  };
};
