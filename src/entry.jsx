import React from "react";
import {render} from "react-dom";

class App extends React.Component {
  render () {
    return <p> Hey man!</p>;
  }
}

render(<App/>, document.getElementById("main"));

module.hot.accept();
