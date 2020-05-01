import * as FileSystem from "expo-file-system";

import { ADD_PLACE, SET_PLACES } from "../types";
import { insertPlace, fetchPlaces } from "../db/db";
import APIKEY from "../env.env";

export const addPlace = (title, image, location) => {
  return async (dispatch) => {   
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${APIKEY.googleApiKey}`
    );
    
    if (!res.ok) {
      throw new Error("Address cannot be calculated");
    }

    const resData = await res.json();
    // console.log(resData.results[0].formatted_address);

    if (!resData.results) {
      throw new Error("Address cannot be calculated! No results.");
    }
 
    const address = resData.results[0].formatted_address;

    const fileName = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });

      // send to database
      const dbRes = await insertPlace(
        title,
        newPath,
        address,
        location.lat,
        location.lng
      );

      // send to redux
      dispatch({
        type: ADD_PLACE,
        placeData: {
          id: dbRes.insertId,
          title: title,
          image: newPath,
          address: address,
          coordinates: {
            lat: location.lat,
            lng: location.lng,
          },
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
