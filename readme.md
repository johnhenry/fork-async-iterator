# fork-async-iterator

<img src="./logo.webp" style="width:256px; height:256px">

`fork-async-iterator` is a JavaScript utility for forking an asynchronous iterator into multiple independent asynchronous iterators.
Each forked iterator will receive the same items from the original iterator.

## Features

- **Forking**: Create multiple independent asynchronous iterators from a single source iterator.
- **Asynchronous Support**: Works seamlessly with asynchronous iterators.
- **Buffering**: Buffers items when not being read.

## Installation

You can install `fork-async-iterator` using npm:

```bash
npm install fork-async-iterator
```

## Usage

Below is an example demonstrating how to use the `forkAsyncIterator` function:

```javascript
import forkAsyncIterator from "fork-async-iterator";

const output = document.getElementById("output");
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
```

### `forkAsyncIterator(iterator, num)`

Forks an asynchronous iterator into `num` independent asynchronous iterators.

- **Parameters**:
  - `iterator` (AsyncIterator): The original asynchronous iterator to be forked.
  - `num` (number, optional): The number of forks to create. Default is 2.
- **Returns**: An array of `num` asynchronous iterators.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
