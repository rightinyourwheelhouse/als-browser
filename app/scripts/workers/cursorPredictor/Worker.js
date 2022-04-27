
const tf = require('@tensorflow/tfjs');
const tfnode = require('@tensorflow/tfjs-node');
/**
 * Class used for generating pointer predictions
 * constructor is empty
 * is only accesible by sending and receiving messages 
 */
class PointerPredictor {
  // AI model used for predictions, is loaded by get model in contructor
  model;
  windowSize = 10;
  features = 2;
  //The model Must be saved on a server it seems, this is the url to it's location
  //thx ewout for your hosting services
  modelUrl = "https://ewoutverhamme.be/aimodel/model.json"

  //dummy data used for debugging purposes
  dummyArray =  [
    [0.235, 0.7322222],
    [0.235, 0.7322222],
    [0.236875, 0.7188889],
    [0.244375, 0.68666667],
    [0.25625, 0.6422222],
    [0.271875, 0.58444446],
    [0.29625, 0.5144445],
    [0.324375, 0.43222222],
    [0.3525, 0.35222223],
    [0.385625, 0.28111112],
  ]
  constructor() {
    this.getModel();
  }
  /**tries to get model from server and load it 
   * uses the dummy data to check if it is working properly
  */
  async getModel() {
    const input = tf.expandDims(
      tf.tensor(this.dummyArray,[10, 2]
      )
    );        
    try{
    const handler = tfnode.io.fileSystem('app/scripts/1DCNNLSTMAbsolute/model.json');
    this.model = await tf.loadLayersModel(handler);
    console.log("Model loaded")
    }catch(e){
      console.error('Unable to load model', e);
    }
  };
  /**
   * @param {A set of XY coordinates (and possibly features) in a [windowsize,features] array} coordinates 
   * makes a tensor of the coordinates and makes a prediction
   * sends prediction to sendPrediction Function
   */
  async makePrediction(coordinates){
    const input =   tf.expandDims(tf.tensor(coordinates,[this.windowSize, this.features]))
    if(!this.model){
      await this.getModel()
    }
    const prediction  = this.model.predict(input).arraySync();
    return [coordinates, prediction]
  }
}  

const pointerPredictor= new PointerPredictor();



const registerPromiseWorker = require('promise-worker/register');
registerPromiseWorker((message) => {
  if(message.type === 'getCursorPredictor') {
    let inputArray = message.inputArray;
    let predictionArray = pointerPredictor.makePrediction(inputArray);
    return JSON.stringify({prediction : predictionArray });
  }
});

