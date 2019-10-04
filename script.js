//object to create a candidate

var makeCandidate = function (candidateName, partyColor) {

    var candidate = {};
    candidate.name = candidateName;
    candidate.electionResults = null;
    candidate.totalVotes = 0;
    candidate.partyColor = partyColor;


    candidate.addTotalVotes = function () {

        this.totalVotes = 0;
        for (var i = 0; i < this.electionResults.length; i++) {
            this.totalVotes = this.totalVotes + this.electionResults[i];
        }
    }
    return candidate;
};

//make new 'objects' -- candidates, in this case 

var candidate1 = makeCandidate("Goldielocks", [132, 17, 11]);
var candidate2 = makeCandidate("Grainger", [245, 141, 136]);

//passing in results from each state

candidate1.electionResults = [5, 1, 7, 2, 33, 6, 4, 2, 1, 14, 8, 3, 11, 11, 1, 0, 5,
    3, 3, 3, 7, 4, 8, 9, 3, 7, 2, 2, 4, 2, 8, 3, 15, 15, 2,
    12, 0, 4, 13, 1, 3, 2, 8, 21, 3, 2, 11, 1, 3, 7, 2];

candidate2.electionResults = [4, 2, 4, 4, 22, 3, 3, 1, 2, 15, 8, 1, 3, 9, 0, 6, 1, 5,
    5, 1, 3, 7, 8, 1, 3, 3, 1, 3, 2, 2, 6, 2, 14, 0, 1, 6, 7,
    3, 7, 3, 6, 1, 3, 17, 3, 1, 2, 11, 2, 3, 1];

//updates to results - changes to the array

candidate1.electionResults[9] = 1;
candidate2.electionResults[9] = 28;

candidate1.electionResults[4] = 17;
candidate2.electionResults[4] = 38;

candidate1.electionResults[43] = 11;
candidate2.electionResults[43] = 27;

//function to determine each state's winner

var setStateResults = function (state) {
    theStates[state].winner = null;

        if (candidate1.electionResults[state]> candidate2.electionResults[state]) {
        theStates[state].winner = candidate1;
        }   else if (candidate2.electionResults[state] > candidate1.electionResults[state]) {
        theStates[state].winner = candidate2;
    }

    var stateWinner = theStates[state].winner;

        if (stateWinner !== null) {
        theStates[state].rgbColor = stateWinner.partyColor;
        }   else {
        theStates[state].rgbColor = [11, 32, 57];
    }

    //Populates state result table as you mouse over a state
    var stateInfoTable = document.getElementById('stateResults');

    var header = stateInfoTable.children[0];
    var body = stateInfoTable.children[1];

    var stateName = header.children[0].children[0];
    var abbrev = header.children[0].children[1];
    var candidate1Name = body.children[0].children[0];
    var candidate2Name = body.children[1].children[0];
    var candidate1Results = body.children[0].children[1];
    var candidate2Results = body.children[1].children[1];
    var winnerName = body.children[2].children[1];

    stateName.innerText = theStates[state].nameFull;
    abbrev.innerText = "(" + theStates[state].nameAbbrev + ")";

    candidate1Name.innerText = candidate1.name;
    candidate2Name.innerText = candidate2.name;

    candidate1Results.innerText = candidate1.electionResults[state];
    candidate2Results.innerText = candidate2.electionResults[state];

    if (theStates[state].winner === null) {
        winnerName.innerText = "DRAW";
    } else {
        winnerName.innerText = theStates[state].winner.name;
    }
}

candidate1.addTotalVotes();
candidate2.addTotalVotes();

var winner = "TBD";
if (candidate1.totalVotes > candidate2.totalVotes) {
    winner = "Goldielocks";

} else if (candidate2.totalVotes > candidate1.totalVotes) {
    winner = "Grainger";
} else {
    winner = "It's' is a tie!";
}
console.log("The next President of the United States is" + " " + winner + "!" + " Congratulations!");

//Populates table at top of page - overall results for the election
var countryInfoTable = document.getElementById('countryResults');
var row = countryInfoTable.children[0].children[0];

row.children[0].innerText = candidate1.name;
row.children[1].innerText = candidate1.totalVotes;
row.children[2].innerText = candidate2.name;
row.children[3].innerText = candidate2.totalVotes;
row.children[5].innerText = winner;


