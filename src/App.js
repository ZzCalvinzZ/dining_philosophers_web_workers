import React, { Component } from "react";
import PropTypes from "prop-types";
import Table from "./Components/Table/";
import Fork from "./Components/Fork/";
import Philosopher from "./Components/Philosopher/";
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
    ]
  };

  render() {
    const { forks, philosophers } = this.state;
    return (
      <div className="app">
        <Table forks={forks} philosophers={philosophers} />
      </div>
    );
  }
}

export default App;
