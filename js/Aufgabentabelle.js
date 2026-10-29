const AUFGABENTABELLEX = {
    "multiply": (() => {
        const problems = [];
        for (let a = 2; a * a <= 1000; a++) {
            for (let b = a; a * b <= 1000; b++) {
                problems.push({ "a": a, "b": b, "result": a * b, "weight": 1 });
            }
        }
        return problems;
    })(),
};


const AUFGABENTABELLE = {
    "multiply": {
        "10": [
            { a: 2, b: 2, result: 4, weight: 2, difficulty: 1},
            { a: 2, b: 3, result: 6, weight: 2, difficulty: 1},
            { a: 2, b: 4, result: 8, weight: 2, difficulty: 1},
            { a: 2, b: 5, result: 10, weight: 2, difficulty: 1},
            { a: 3, b: 3, result: 9, weight: 3, difficulty: 1},
        ],
        "20": [
            { a: 2, b: 6, result: 12, weight: 2, difficulty: 1},
            { a: 2, b: 7, result: 14, weight: 2, difficulty: 1},
            { a: 2, b: 8, result: 16, weight: 2, difficulty: 1},
            { a: 2, b: 9, result: 18, weight: 2, difficulty: 1},
            { a: 2, b: 10, result: 20, weight: 2, difficulty: 1},
            { a: 3, b: 4, result: 12, weight: 3, difficulty: 1},
            { a: 3, b: 5, result: 15, weight: 3, difficulty: 1},
            { a: 3, b: 6, result: 18, weight: 3, difficulty: 1},
            { a: 4, b: 4, result: 16, weight: 4, difficulty: 1},
            { a: 4, b: 5, result: 20, weight: 4, difficulty: 1},
        ],
        "50": (() => {
            const problems = [];
            for (let a = 2; a * a <= 50; a++) {
                for (let b = a; a * b <= 50; b++) {
                    if (a * b <= 20) continue;
                    problems.push({ "a": a, "b": b, "result": a * b, "weight": Math.min(a, b), "difficulty": 1});
                }
            }
            return problems;
        })(),
        "100": (() => {
            const problems = [];
            for (let a = 2; a * a <= 100; a++) {
                for (let b = a; a * b <= 100; b++) {
                    if (a * b <= 50) continue;
                    problems.push({ "a": a, "b": b, "result": a * b, "weight": Math.min(a, b), "difficulty": 1 });
                }
            }
            return problems;
        })(),
        "200": (() => {
            const problems = [];
            for (let a = 2; a * a <= 200; a++) {
                for (let b = a; a * b <= 200; b++) {
                    if (a * b <= 100) continue;
                    problems.push({ "a": a, "b": b, "result": a * b, "weight": Math.min(a, b), "difficulty": 1 });
                }
            }
            return problems;
        })(),
        "500": (() => {
            const problems = [];
            for (let a = 2; a * a <= 500; a++) {
                for (let b = a; a * b <= 500; b++) {
                    if (a * b <= 200) continue;
                    problems.push({ "a": a, "b": b, "result": a * b, "weight": Math.min(a, b), "difficulty": 1 });
                }
            }
            return problems;
        })(),
        "1000": (() => {
            const problems = [];
            for (let a = 2; a * a <= 1000; a++) {
                for (let b = a; a * b <= 1000; b++) {
                    if (a * b <= 500) continue;
                    problems.push({ "a": a, "b": b, "result": a * b, "weight": Math.min(a, b), "difficulty": 1 });
                }
            }
            return problems;
        })()
    }
}