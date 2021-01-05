import React, { createContext, useReducer } from "react";

const initialState = {
  searchTerm: "",
  searchResults: [],
  nominees: JSON.parse(localStorage.getItem('nominees')) || [],
  isLoading: false,
  error: "",
  banner: "",
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    let newNominees = [];
    switch (action.type) {
      case "UPDATE_RESULTS":
        const newState = { ...state, searchResults: action.payload };
        return newState;
      case "SET_TERM":
        return { ...state, searchTerm: action.payload };
      case "ADD_NOMINEE":
        // Not allow more than 5 nominations
        if (state.nominees.length > 4) {
          // alert("You cannot nominate more than 5 movies");
          return { ...state, error: "You cannot nominate more than 5 movies" };
        }
        let b = "";
        if (state.nominees.length === 4) {
          b = "You  have completed your nominations...";
        }

        // check for dupicate nomination
        for (let i = 0; i < state.nominees.length; i++) {
          if (state.nominees[i].imdbID === action.payload.imdbID) {
            return { ...state, error: "You already Nominated this movie" };
          }
        }

        newNominees = [...state.nominees, action.payload];

        localStorage.setItem("nominees", JSON.stringify(newNominees));

        return { ...state, nominees: newNominees, banner: b };
      case "REMOVE_NOMINEE":
        newNominees = state.nominees.filter(
          (n) => n.imdbID !== action.payload
        );
        localStorage.setItem("nominees", JSON.stringify(newNominees));
        return { ...state, nominees: [...newNominees], banner: "" };
      case "TOGGLE_LOADING":
        return { ...state, isLoading: action.payload };
      case "SET_ERROR":
        return { ...state, error: action.payload };
      case "SET_BANNER":
        return { ...state, banner: action.payload };

      default:
        return state;
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
