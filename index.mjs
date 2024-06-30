import AsyncQueue from "iterqueue";

const forkAsyncIterator = (iterator, num = 2) => {
  const queues = [];
  for (let i = 0; i < num; i++) {
    queues.push(new AsyncQueue());
  }
  (async () => {
    for await (const item of iterator) {
      queues.forEach((queue) => queue.enqueue(item));
    }
    queues.forEach((queue) => queue.end());
  })();
  return queues;
};

export default forkAsyncIterator;
export { forkAsyncIterator };
