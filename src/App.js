import React, { Component } from "react";
import PropTypes from "prop-types";
import Table from "./Components/Table/";
import "./App.css";

class App extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
  };

  state = {
    forks: [
      { color: "black" },
      { color: "black" },
      { color: "black" },
      { color: "black" },
      { color: "black" }
    ],
    philosophers: [
      {
        color: "red",
        leftFork: 0,
        rightFork: 2,
        thinking: true,
        eating: false
      },
      {
        color: "blue",
        leftFork: 1,
        rightFork: 0,
        thinking: true,
        eating: false
      },
      {
        color: "green",
        leftFork: 4,
        rightFork: 1,
        thinking: true,
        eating: false
      },
      {
        color: "yellow",
        leftFork: 2,
        rightFork: 3,
        thinking: true,
        eating: false
      },
      {
        color: "purple",
        leftFork: 3,
        rightFork: 4,
        thinking: true,
        eating: false
      }
    ],
    speed: 10,
    solution: "deadlock"
  };

  render() {
    const { forks, philosophers, solution, speed } = this.state;
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
        {solution === "deadlock" && (
          <Table
            forks={forks}
            philosophers={philosophers}
            solution={solution}
          />
        )}
        {solution === "no-deadlock" && (
          <Table
            forks={forks}
            philosophers={philosophers}
            solution={solution}
          />
        )}
      </div>
    );
  }
}

export default App;
