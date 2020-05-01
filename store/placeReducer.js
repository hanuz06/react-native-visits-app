import { ADD_PLACE, SET_PLACES } from "../types";
import Place from "../model/place";

const initialState = {
  places: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PLACES:
      return {
        places: action.places.map(
          (pl) => new Place(pl.id.toString(), pl.title, pl.imageUri)
        ),
      };
    case ADD_PLACE:
      const newPlace = new Place(
        action.placeData.id.toString(),
        action.placeData.title,
        action.placeData.image,
        action.placeData.latitude,
        action.placeData.longitude
      );
      return {
        places: state.places.concat(newPlace),
      };
    default:
      return state;
  }
};
