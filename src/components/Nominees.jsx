import React, { useContext } from "react";
import { store } from "../store";
import { CSSTransition, TransitionGroup } from "react-transition-group";


export default function Nominees() {
  const globalState = useContext(store);
  const {
    state: { nominees },
    dispatch,
  } = globalState;

  const handleRemove = (id) => {
    dispatch({ type: "REMOVE_NOMINEE", payload: id });
  };
  return (
    <div className="nominees_container">
      <h2>Nominees</h2>
      <hr />
      <ol>
        <TransitionGroup>
          {nominees.map((n) => {
            return (
              <CSSTransition key={n.imdbID} timeout={500} classNames="item">
                <li key={n.imdbID}>
                  <LI title={n.Title} poster={n.Poster} remove={() => handleRemove(n.imdbID)} />
                </li>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </ol>
    </div>
  );
}

function LI({ title, remove, poster }) {
  return (
      <>
        <img className="poster" src={poster} alt={title} />
        <p>{title}</p>
        <span>
          <button className="btn_danger" onClick={remove}>
            Remove
          </button>
        </span>
      </>
  );
}
