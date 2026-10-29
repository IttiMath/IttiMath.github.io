// A session is a collection of games
// A game is a collection of problems
// Each time the user clicks on "start" a new session is created
// Each time the user clicks on "next"/ or when the next game automatically starts
// a new game is created within the current session



// app config
window.NumberProglemsPerSession = 8;

// session config
window.operator = ["plus", "minus", "multiply", "divide"][0];
window.numberRange = ["5", "10", "20", "50", "100", "200", "500", "1000"][4]
window.difficulty = [1,2,3][0]

// session history
window.SessionHistory = [];

// current game (set of problems)
window.ProblemsInGame = []

// counters
window.GameIndex = -1;
window.ProblemIndex = -1;


// temporary variables for the current game
window.maxNumber = -1;
