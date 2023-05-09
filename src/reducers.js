import {
  FAV_ADD,
  FAV_REMOVE,
  FETCH_SUCCESS,
  FETCH_LOADING,
  FETCH_ERROR,
  GET_FAVS_FROM_LS,
} from "./actions";

const initial = {
  favs: readFavsFromLocalStorage(),
  current: null,
  error: null,
  loading: true,
};

function writeFavsToLocalStorage(state) {
  localStorage.setItem("s10g4", JSON.stringify(state.favs));
}

function readFavsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("s10g4")) || [];
}

export function myReducer(state = initial, action) {
  switch (action.type) {
    case FAV_ADD:
      const newState = {
        ...state,
        favs: [...state.favs, action.payload]
      };
      writeFavsToLocalStorage(newState);
      return newState;
    case FAV_REMOVE:
      const newState2 = {
        ...state,
        favs: state.favs.filter((fav) => fav.key !== action.payload)
      };
      writeFavsToLocalStorage(newState2);
      return newState2;

    case FETCH_SUCCESS:
      return state;

    case FETCH_LOADING:
      return state;

    case FETCH_ERROR:
      return state;

    case GET_FAVS_FROM_LS:
      return readFavsFromLocalStorage();

    default:
      return state;
  }
}
