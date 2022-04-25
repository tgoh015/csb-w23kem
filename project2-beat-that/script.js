var rollDice = function () {
  return Math.floor(Math.random() * 6) + 1;
};

var userName1 = "";
var userName2 = "";
var mode = "";
var playerOneInput = "";
var playerTwoInput = "";

var main = function (input) {
  // Username collection
  if (!userName1) {
    if (!input) {
      return `Please enter Player 1's username.`;
    }
    userName1 = input;
    return `Thanks for joining the game, ${userName1}. <br>
    Now, please enter Player 2's username.`;
  }

  if (!userName2) {
    if (!input) {
      return `Please enter Player 2's username.`;
    }
    userName2 = input;
    return `Thanks for joining the game, ${userName2}. <br>
    Now, click the submit button to roll both dices for ${userName1}.`;
  }

  //Default mode is 'roll'
  var mode = "roll";

  // Click submit to roll both dices for Player 1
  if (mode == "roll") {
    if (!input) {
      var diceOne = rollDice();
      var diceTwo = rollDice();
      var myOutputValue = `${userName1} rolled ${diceOne} for Dice 1 and ${diceTwo} for Dice 2! Pick the order of the dice you want by simply input the Dice you want to be the 1st numeral.`;
    }
  }

  // Select which dice to be first (Player 1)
  if (mode == "pick") {
    if (input == "1") {
      playerOneInput = `${diceOne} + ${diceTwo}`;
      var myOutputValue = `${userName1} selected ${playerOneInput}. Now, ${userName2} clicks submit button to roll 2 dice to beat ${playerOneInput}.`;
    }
    if (input == "2") {
      playerOneInput = diceTwo + diceOne;
      var myOutputValue = `${userName1} selected ${playerOneInput}. Now, ${userName2} clicks submit button to roll 2 dice to beat ${playerOneInput}.`;
    }
  }

  return myOutputValue;
};
