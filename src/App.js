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
        thinking: false,
        eating: false
      },
      {
        color: "blue",
        leftFork: 1,
        rightFork: 0,
        thinking: false,
        eating: false
      },
      {
        color: "green",
        leftFork: 4,
        rightFork: 1,
        thinking: false,
        eating: false
      },
      {
        color: "orange",
        leftFork: 2,
        rightFork: 3,
        thinking: false,
        eating: false
      },
      {
        color: "purple",
        leftFork: 3,
        rightFork: 4,
        thinking: false,
        eating: false
      }
    ],
    speed: 10,
    solution: null
  };

  render() {
    const { forks, philosophers, solution } = this.state;
    return (
      <div className="app">
        <div>
          <button
            className="deadlock-btn"
            onClick={() => this.setState({ solution: "deadlock" })}
          >
            Deadlock Solution
          </button>
          <button
            className="no-deadlock-btn"
            onClick={() => this.setState({ solution: "resource-hierarchy" })}
          >
            Resource Hierarchy Solution
          </button>
          <button
            className="no-deadlock-btn"
            onClick={() => this.setState({ solution: "arbitrator" })}
          >
            Arbitrator Solution
          </button>
        </div>
        <div>
          <h2>{solution}</h2>
        </div>
        {solution === "deadlock" && (
          <Table
            forks={forks}
            philosophers={philosophers}
            solution={solution}
          />
        )}
        {solution === "resource-hierarchy" && (
          <Table
            forks={forks}
            philosophers={philosophers}
            solution={solution}
          />
        )}
        {solution === "arbitrator" && (
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
