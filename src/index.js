import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import { connect } from "react-redux";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// class List extends React.Component {
//   render() {
//     return (
//       <ol>
//         <li>hello1</li>
//         <li>hello2</li>
//       </ol>
//     );
//   }
// }

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();