import React, { useContext } from "react";
import { store } from "../store";

export default function Error() {
  const globalContext = useContext(store);
  const {
    state: { error },
  } = globalContext;
  return (
      error && (
      <div className="error">
        <strong>{error}</strong>
      </div>
      )
  );
}
