import * as FileSystem from "expo-file-system";

import { ADD_PLACE, SET_PLACES } from "../types";
import { insertPlace, fetchPlaces } from "../db/db";
import APIKEY from "../env";

export const addPlace = (title, image, location) => {
  // console.log('THIS IS PLACE ACTIONS')
  return async (dispatch) => {
    // console.log("THIS IS PLACE ACTION");
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${APIKEY.googleApiKey}`
    );

    if (!res.ok) {
      throw new Error("Address cannot be calculated");
    }
    console.log('REACHED RESDATA')
    const resData = await res.json();
    console.log(resData.results[0].formatted_address);

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
        resData.results[0].formatted_address,
        15.6,
        16.8
      );
      dispatch({
        type: ADD_PLACE,
        placeData: {
          id: dbRes.insertId,
          title: title,
          image: newPath,
          latitude: 15.6,
          longitude: 16.8,
        },
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
