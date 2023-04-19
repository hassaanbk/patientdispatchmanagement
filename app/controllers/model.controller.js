
//
exports.trainAndPredict = function (req, res) {
    const tf = require('@tensorflow/tfjs');
    require('@tensorflow/tfjs-node');
    //load iris training and testing data
    const heart = require('../assets/heart.json');
    const heartTesting = require('../assets/testData.json');
    console.log(heartTesting)
    //
    //

    // convert/setup our data for tensorflow.js
    //
    //tensor of features for training data
    console.log('trainingData')
    const trainingData = tf.tensor2d(heart.map(item => [
        item.age,
        item.sex,
        item.cp,
        item.trestbps,
        item.chol,
        item.fbs,
        item.restecg,
        item.thalach,
        item.exang,
        item.oldpeak,
        item.slope,
        item.ca,
        item.thal,
        item.target
    ]))
    //
    //tensor of output for training data
    //console.log(trainingData.dataSync())
    //
    //tensor of output for training data
    //the values for species will be:
    // target 1:       1,0 //heart disease yes
    // target 0:       0,1 //heart disease no
    const outputData = tf.tensor2d(heart.map(item => [
        item.target === 1 ? 1 : 0,
        item.target === 0 ? 1 : 0
    ]))
    console.log('Output Data: ---------')
    //console.log(outputData.dataSync())
    
    //
    //tensor of features for testing data
    const testingData = tf.tensor2d(heartTesting.map(item => [
        item.age,
        item.sex,
        item.cp,
        item.trestbps,
        item.chol,
        item.fbs,
        item.restecg,
        item.thalach,
        item.exang,
        item.oldpeak,
        item.slope,
        item.ca,
        item.thal,
        item.target
    ]))
    //console.log(testingData.dataSync())
    testingData.array().then(array => {
        //console.log(array)
    })

    // build neural network using a sequential model
    const model = tf.sequential()
    //add the first layer
    model.add(tf.layers.dense({
        inputShape: [14], // 19 input neurons (features)
        activation: "sigmoid",
        units: 30, //dimension of output space (first hidden layer)
    }))
    //add the first hidden layer
    model.add(tf.layers.dense({
        inputShape: [30], //dimension of hidden layer (2/3 rule)
        activation: "sigmoid",
        units: 15, //dimension of second hidden layer
    }))
    //add the second hidden layer
    model.add(tf.layers.dense({
        inputShape: [15], //dimension of hidden layer (2/3 rule)
        activation: "sigmoid",
        units: 2, //dimension of final output (die or live)
    }))
    //add output layer
    model.add(tf.layers.dense({
        activation: "sigmoid",
        units: 2, //dimension of final output
    }))
    //compile the model with an MSE loss function and Adam algorithm
    model.compile({
        //categoricalCrossentropy
        loss: "meanSquaredError",
        optimizer: tf.train.adam(.0003), //is a new algorithm
        metrics: ['accuracy'],
    })
    console.log(model.summary())
    // train/fit the model for the fixed number of epochs
    const startTime = Date.now()
    //
    async function run() {
        const startTime = Date.now()
        //train the model using fit method
        await model.fit(trainingData, outputData,
            {
                epochs: 500, //number of iterations
                callbacks: {
                    onEpochEnd: async (epoch, log) => {
                        console.log(`Epoch ${epoch}: loss = ${log.loss}`);
                        elapsedTime = Date.now() - startTime;
                        console.log('elapsed time: ' + elapsedTime)
                    }
                }
            }

        ) //fit
        // predict using predict method
        const results = model.predict(testingData);
        results.print()
        // get the values from the tf.Tensor
        //var tensorData = results.dataSync();
        results.array().then(array => {
            //console.log(array)
            var resultForTest1 = array[0];
            var dataToSent = {row1: resultForTest1}
            console.log(resultForTest1)
            res.status(200).send(dataToSent);
         
        })
    } //end of run function
    run()
    //

};

