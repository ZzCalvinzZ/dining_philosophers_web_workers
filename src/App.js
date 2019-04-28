import React, { Component } from "react";
import PropTypes from "prop-types";
import Table from "./Components/Table/";
import Fork from "./Components/Fork/";
import Philosopher from "./Components/Philosopher/";
import philosopherWorker from "./philosopherWorker";
import WebWorker from "./WebWorker";
import "./App.css";

class App extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
  };

  state = {
    forks: [Fork, Fork, Fork, Fork, Fork],
    philosophers: [
      Philosopher,
      Philosopher,
      Philosopher,
      Philosopher,
      Philosopher
    ],
    speed: 10,
    solution: "deadlock"
  };

  render() {
    const { forks, philosophers, solution, speed } = this.state;
    const colors = ["red", "blue", "green", "yellow", "purple"];
    const workers = philosophers.map(p => {
      return new WebWorker(philosopherWorker);
    });

    workers[0].addEventListener("message", e => console.log(e.data), false);
    workers[0].postMessage("eat");

    // if (solution === "deadlock") {
    // }

    // if (solution === "no-deadlock") {
    // }

    return (
      <div className="app">
        <button
          className="deadlock-btn"
          onClick={() => this.setState({ solution: "deadlock" })}
        >
          Deadlock Solution
        </button>
        <button
          className="no-deadlock-btn"
          onClick={() => this.setState({ solution: "no-deadlock" })}
        >
          No Deadlock Solution
        </button>
        <div>{solution}</div>
        <Table forks={forks} philosophers={philosophers} />
      </div>
    );
  }
}

export default App;
