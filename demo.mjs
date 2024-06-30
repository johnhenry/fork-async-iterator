import forkAsyncIterator from "./index.mjs";
const exampleAsyncGenerator = async function* (n) {
  for (let i = 0; i < n; i++) {
    yield i;
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
};
const [queueA, queueB] = forkAsyncIterator(exampleAsyncGenerator(3));
const read = async (queue) => {
  for await (const item of queue) {
    console.log(item);
  }
  console.log("queue has ended.");
};
const readNegative = async (queue) => {
  for await (const item of queue) {
    console.log(item * -1);
  }
  console.log("negative queue has ended.");
};

read(queueA);
setTimeout(() => readNegative(queueB), 5000);
