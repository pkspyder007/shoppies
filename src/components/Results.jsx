import React, { useContext } from "react";
import { store } from "../store";

export default function Results() {
  const globalState = useContext(store);
  const {
    state: { searchResults, searchTerm, nominees },
    dispatch,
  } = globalState;

  const addNominee = (nominee) => {
    dispatch({ type: "ADD_NOMINEE", payload: nominee });
  };

  const checkIsNominated = (id) => {
    let check = false;
    for (let i = 0; i < nominees.length; i++) {
      if(nominees[i].imdbID === id) check = true;
    }
    return check;
  }

  return (
    searchResults.length ? <div className="results_container">
      <h2>Results for " {searchTerm} "</h2>
      <hr/>
      <ul>
        {searchResults.map((movie) => {
          return (
            <li key={movie.imdbID}>
              <img src={movie.Poster} alt={movie.Title} className="poster" />
              <strong>
              {movie.Title}{" "} ({movie.Year})
              </strong>
              <span>
                <button
                  className="btn_primary"
                  onClick={() => addNominee(movie)}
                  disabled={checkIsNominated(movie.imdbID)}
                >
                  Nominate
                </button>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
    : ""
  );
}
