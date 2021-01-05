import React from "react";
import Error from "./Error";
import Nominees from "./Nominees";
import Results from "./Results";
import Search from "./Search";
import ShareButton from "./ShareButton";

export default function Home() {
  return (
    <div className="home">
      <h1>The Shoppies</h1>
      <Search />
      <Error />
      <div className="main_container">
        <Results />
        <Nominees />
      </div>
      <ShareButton />
    </div>
  );
}
