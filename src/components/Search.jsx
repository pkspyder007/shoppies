import axios from "axios";
import React, { useState, useContext } from "react";
import { store } from "../store";

export default function Search() {
  const [term, setTerm] = useState("");
  const globalState = useContext(store);
  const {
    dispatch,
    state: { isLoading, banner },
  } = globalState;

  const handleChange = (e) => {
    setTerm(e.target?.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch({ type: "SET_TERM", payload: term });
    // Update Error Message
    if (!term) {
      dispatch({ type: "SET_ERROR", payload: "Please enter title." });
      return;
    } else {
      dispatch({ type: "SET_ERROR", payload: "" });
    }

    dispatch({ type: "TOGGLE_LOADING", payload: true });

    // Fetch list of movies
    const query = `https://omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${term}&type=movie`;
    axios
      .get(query)
      .then(({ data }) => {
        if (data.Response === "False") {
          dispatch({ type: "TOGGLE_LOADING", payload: false });
          dispatch({ type: "SET_ERROR", payload: data.Error });
          return;
        }
        dispatch({ type: "TOGGLE_LOADING", payload: false });
        dispatch({ type: "UPDATE_RESULTS", payload: data.Search });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: "UPDATE_RESULTS", payload: [] });
        dispatch({ type: "TOGGLE_LOADING", payload: false });
      });
  };

  return (
    <>
      {banner && <div className="banner">{banner}</div>}
      <div className="search_container">
        <h3>Movie Title</h3>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Movie Title"
            onChange={handleChange}
          />
          <button type="submit">Search</button>
        </form>
        {isLoading && (
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
      </div>
    </>
  );
}
