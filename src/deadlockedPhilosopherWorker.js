import { setTimeout } from "core-js";

// philosopherWorker.js

// @args: You can pass your worker parameters on initialisation
export default function deadlockedPhilosopherWorker(args) {
  let state = {};
  let forks = [];
  let speed = 1000;

  const start = () => {
    setInterval(() => {
      const leftFork = forks[state.leftFork];
      const rightFork = forks[state.rightFork];

      if (state.thinking) {
        if (leftFork.color === "black") {
          postMessage({
            changeFork: { index: state.leftFork, value: { color: state.color } }
          });
        } else if (
          leftFork.color === state.color &&
          rightFork.color === "black"
        ) {
          postMessage({
            changeFork: {
              index: state.rightFork,
              value: { color: state.color }
            }
          });
        } else if (
          leftFork.color === state.color &&
          rightFork.color === state.color
        ) {
          postMessage({
            changeState: {
              index: state.color,
              value: { ...state, thinking: false, eating: true }
            }
          });
        }
      } else if (state.eating) {
        return;
      }
    }, speed);
  };

  this.onmessage = e => {
    const msg = e.data;

    if (msg.state) {
      state = msg.state;
    }
    if (msg.forks) {
      forks = msg.forks;
    }
    if (msg.speed) {
      speed = msg.speed;
    }
    if (msg.start) {
      start();
    }
  };
}
