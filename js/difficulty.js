

function determineDifficulty(problem) {
    if (window.operator == "plus" || window.operator == "minus") {
        return determineDifficultyPlus(problem);
    }

    if (window.operator == "multiply" || window.operator == "divide") {
        return determineDifficultyMultiply(problem);
    }
}

function determineDifficultyPlus(problem) {
    // machine learning based difficulty determination for plus problems
    const numberRange = window.numberRange;
    const rangeMap = { '5': 1/8, '10': 2/8, '20': 3/8, '50': 4/8, '100': 5/8, '200': 6/8, '500': 7/8, '1000': 1 };
    const inputVector = {
        range: rangeMap[numberRange],
        a: problem.a / parseInt(numberRange),
        b: problem.b / parseInt(numberRange),
    };

    let net = new brain.NeuralNetwork();
    net.fromJSON(trainedWeights_Plus);
    let output = net.run(inputVector)
    let values = [output.d1, output.d2, output.d3];
    // get the index of the highest output value
    output = values.indexOf(Math.max(...values))
    
    let difficulty = [1,2,3][output]

    return difficulty;
}

function determineDifficultyMultiply(problem) {
        // based on single factors
        if (problem.a == 0 || problem.b == 0 ||
            problem.a == 1 || problem.b == 1 ||
            problem.a == 2 || problem.b == 2 ||
            problem.a == 5 || problem.b == 5 ||
            problem.a == 10 || problem.b == 10 ||
            problem.a == 11 || problem.b == 11 ||
            problem.a == 20 || problem.b == 20 ||
            problem.a == 30 || problem.b == 30 ||
            problem.a == 40 || problem.b == 40 ||
            problem.a == 50 || problem.b == 50
        ) {
            return 1;}

        // based on combination of factors
        if ((problem.a == 3 && problem.b == 25) ||
            (problem.a == 25 && problem.b == 3) ||
            (problem.a == 4 && problem.b == 25) ||
            (problem.a == 25 && problem.b == 4)
        ) {
            return 1;
        }

        let range = window.numberRange;
        if (range == "5" || range == "10" || range == "20") {
            return 1;
        }
        if (range == "50" || range == "100") {
            if (problem.a > 11 || problem.b > 11) 
                return 3;
            if (problem.a > 7 || problem.b > 7)
                return 2;
            return 1;
        }
}
