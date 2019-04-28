// philosopherWorker.js

// @args: You can pass your worker parameters on initialisation
export default function philosopherWorker(args) {
  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const eat = () => {
    postMessage({ status: "eating" });
    setTimeout(() => {
      postMessage({ status: "done_eating" });
    }, getRandomInt(3, 13));
  };

  const think = () => {
    postMessage({ status: "thinking" });
    setTimeout(() => {
      postMessage({ status: "done_thinking" });
    }, getRandomInt(1, 10));
  };

  this.onmessage = e => {
    const message = e.data;
    if (message === "eat") eat();
    if (message === "think") think();
  };
}
