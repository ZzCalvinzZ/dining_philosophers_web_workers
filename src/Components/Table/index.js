import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Table.css";
import Philosopher from "../Philosopher/";
import Fork from "../Fork/";
import deadlockedPhilosopherWorker from "../../deadlockedPhilosopherWorker";
import nonDeadlockedPhilosopherWorker from "../../nonDeadlockedPhilosopherWorker";
import WebWorker from "../../WebWorker";

class Table extends Component {
  static propTypes = {
    philosophers: PropTypes.array,
    forks: PropTypes.array
  };

  constructor(props) {
    super(props);
    const { philosophers, forks, solution } = props;
    this.state = {
      philosophers: [...philosophers],
      forks: [...forks]
    };

    const workers = philosophers.map(p => {
      let worker;

      if (solution === "deadlock") {
        worker = new WebWorker(deadlockedPhilosopherWorker);
      } else if (solution === "no-deadlock") {
        worker = new WebWorker(nonDeadlockedPhilosopherWorker);
      }

      worker.addEventListener(
        "message",
        e => {
          const msg = e.data;
          if (msg.changeFork) {
            console.log("changing state", msg.changeFork);

            this.setState(state => {
              const newForks = state.forks.map((f, i) => {
                if (i === msg.changeFork.index) {
                  return msg.changeFork.value;
                } else return f;
              });

              workers.map(w => {
                w.postMessage({ forks: newForks });
              });

              return { forks: newForks };
            });
          }
          if (msg.changeState) {
            this.setState(state => {
              const newPhilosophers = state.philosophers.map(p => {
                if (p.color === msg.changeState.index) {
                  return msg.changeFork.value;
                } else return p;
              });
              workers.map((w, i) => {
                w.postMessage({ state: newPhilosophers[i] });
              });

              return { philosophers: newPhilosophers };
            });
          }
        },
        false
      );

      worker.postMessage({ state: p, forks: forks, start: true });

      return worker;
    });
  }
  render() {
    const { speed, solution } = this.props;
    const { philosophers, forks } = this.state;

    const diameter = philosophers.length * 100;
    const radius = diameter / 2;


    return (
      <div
        className={"table"}
        style={{
          width: diameter,
          height: diameter
        }}
      >
        <Philosopher
          style={{ left: "54px", top: "170px", fill: philosophers[0].color }}
        />
        <Philosopher
          style={{ left: "210px", top: "25px", fill: philosophers[1].color }}
        />
        <Philosopher
          style={{ left: "376px", top: "170px", fill: philosophers[2].color }}
        />
        <Philosopher
          style={{ left: "125px", top: "340px", fill: philosophers[3].color }}
        />
        <Philosopher
          style={{ left: "300px", top: "338px", fill: philosophers[4].color }}
        />
        <Fork style={{ left: "127px", top: "104px", fill: forks[0].color }} />
        <Fork style={{ left: "320px", top: "110px", fill: forks[1].color }} />
        <Fork style={{ left: "86px", top: "280px", fill: forks[2].color }} />
        <Fork style={{ left: "228px", top: "400px", fill: forks[3].color }} />
        <Fork style={{ left: "366px", top: "283px", fill: forks[4].color }} />
      </div>
    );
  }
}
export default Table;
