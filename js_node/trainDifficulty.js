import brain from 'brain.js';

// Create a feedforward neural network
const net = new brain.NeuralNetwork({ hiddenLayers: [12,12] });

const rawData = [
    { range: 5, a: 1, b: 1, difficulty: 1 },
    { range: 5, a: 1, b: 2, difficulty: 1 },
    { range: 5, a: 1, b: 3, difficulty: 1 },
    { range: 5, a: 1, b: 4, difficulty: 1 },
    { range: 5, a: 2, b: 1, difficulty: 1 },
    { range: 5, a: 3, b: 1, difficulty: 1 },
    { range: 5, a: 4, b: 1, difficulty: 1 },
    { range: 5, a: 2, b: 2, difficulty: 2 },
    { range: 5, a: 3, b: 2, difficulty: 3 },
    { range: 5, a: 2, b: 3, difficulty: 3 },

    // // range 10 (1)
    // { range: 10, a: 1, b: 1, difficulty: 1 },
    // { range: 10, a: 1, b: 2, difficulty: 1 },
    // { range: 10, a: 2, b: 1, difficulty: 1 },
    // { range: 10, a: 2, b: 2, difficulty: 1 },
    // { range: 10, a: 3, b: 2, difficulty: 1 },
    // { range: 10, a: 2, b: 3, difficulty: 1 },
    // { range: 10, a: 3, b: 3, difficulty: 2 },
    // { range: 10, a: 4, b: 3, difficulty: 2 },
    // { range: 10, a: 3, b: 4, difficulty: 2 },
    // { range: 10, a: 4, b: 5, difficulty: 3 },
    // { range: 10, a: 5, b: 4, difficulty: 3 },
    // { range: 10, a: 5, b: 5, difficulty: 1 },

    // // range 200 (5)
    // { range: 200, a: 163, b: 45, difficulty: 2 },
    // { range: 200, a: 154, b: 34, difficulty: 2 },
    // { range: 200, a: 112, b: 76, difficulty: 2 },
    // { range: 200, a: 176, b: 10, difficulty: 1 }
]

let rangeNorm = {
    '5': 1 / 8,
    '10': 2 / 8,
    '20': 3 / 8,
    '50': 4 / 8,
    '100': 5 / 8,
    '200': 6 / 8,
    '500': 7 / 8,
    '1000': 8 / 8
};

let trainingData = []
for (let item of rawData) {
    trainingData.push({
        input: {
            range: rangeNorm[item.range],
            a: item.a / item.range,
            b: item.b / item.range
        },
        output: {
            ["d" + String(item.difficulty)]: 1
        }
    });
}


// Train the network
net.train(trainingData, {
    iterations: 20000,
    errorThresh: 0.005,
    log: true
});

// Export the trained weights/structure as JSON
const weights = net.toJSON();

import fs from 'fs';

fs.writeFileSync('weights.js', 'const trainedWeights = '+ JSON.stringify(weights, null, 2) + ';', 'utf-8');

console.log(JSON.stringify(weights));