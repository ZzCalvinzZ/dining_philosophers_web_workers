import { setTimeout } from "core-js";

// philosopherWorker.js

// @args: You can pass your worker parameters on initialisation
export default function deadlockedPhilosopherWorker(args) {
  let state = {};
  let forks = [];
  let speed = 100;

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const eat = () => {
    postMessage({
      changeState: {
        index: state.color,
        value: Object.assign({}, state, { thinking: false, eating: true })
      }
    });
    setTimeout(() => {
      think();
    }, getRandomInt(1000, 5000));
  };

  const think = () => {
    postMessage({
      changeState: {
        index: state.color,
        value: Object.assign({}, state, { thinking: true, eating: false })
      }
    });
    postMessage({
      changeFork: {
        index: state.rightFork,
        value: { color: "black" }
      }
    });
    postMessage({
      changeFork: {
        index: state.leftFork,
        value: { color: "black" }
      }
    });
    setTimeout(() => {
      stopThinking();
    }, getRandomInt(1000, 5000));
  };

  const stopThinking = () => {
    postMessage({
      changeState: {
        index: state.color,
        value: Object.assign({}, state, { thinking: false, eating: false })
      }
    });
  };

  const start = () => {
    setInterval(() => {
      if (state.eating || state.thinking) {
        return;
      }

      const leftFork = forks[state.leftFork];
      const rightFork = forks[state.rightFork];
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
        eat();
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
