const net = new brain.NeuralNetwork();
net.fromJSON(trainedWeights);

function determineDifficulty(problem) {
    let numberRange = window.numberRange
    let a = problem.a;
    let b = problem.b;
    
    const opMap = { 'plus': 0.25, 'minus': 0.5, 'multiply': 0.75, 'divide': 1 };
    const rangeMap = { '5': 1/8, '10': 2/8, '20': 3/8, '50': 4/8, '100': 5/8, '200': 6/8, '500': 7/8, '1000': 1 };
    const inputVector = {
        range: rangeMap[numberRange],
        a: a / parseInt(numberRange),
        b: b / parseInt(numberRange),
    };

    let output = net.run(inputVector)
    let values = [output.d1, output.d2, output.d3];
    // get the index of the highest output value
    output = values.indexOf(Math.max(...values))
    
    let difficulty = [1,2,3][output]

    // machine learning

    return difficulty;
}
