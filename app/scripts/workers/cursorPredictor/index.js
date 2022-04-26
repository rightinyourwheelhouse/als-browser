const PromiseWorker = require('promise-worker');
const worker = require('worker-loader!./worker');
const workerTest = new worker();
const promiseWorker = new PromiseWorker(workerTest);const getCursorprediction = (inputArray) => promiseWorker.postMessage({
  type: 'inputs', inputArray
});export default { getCursorprediction }