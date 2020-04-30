import * as FileSystem from "expo-file-system";

import { ADD_PLACE, SET_PLACES } from "../types";
import { insertPlace, fetchPlaces } from "../db/db";

export const addPlace = (title, image) => {
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
        15.6,
        12.3
      );      
      dispatch({
        type: ADD_PLACE,
        placeData: { id: dbRes.insertId, title: title, image: newPath },
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
