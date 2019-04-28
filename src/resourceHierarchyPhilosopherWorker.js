// philosopherWorker.js

// @args: You can pass your worker parameters on initialisation
export default function philosopherWorker(args) {
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

      // always go for the small fork first which will leave one fork always available
      const smallForkIndex =
        state.leftFork < state.rightFork ? state.leftFork : state.rightFork;
      const bigForkIndex =
        state.leftFork < state.rightFork ? state.rightFork : state.leftFork;

      const smallFork = forks[smallForkIndex];
      const bigFork = forks[bigForkIndex];

      if (smallFork.color === "black") {
        postMessage({
          changeFork: {
            index: smallForkIndex,
            value: { color: state.color }
          }
        });
      } else if (smallFork.color === state.color && bigFork.color === "black") {
        postMessage({
          changeFork: {
            index: bigForkIndex,
            value: { color: state.color }
          }
        });
      } else if (
        smallFork.color === state.color &&
        bigFork.color === state.color
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
