// Helper functions
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];

  // Loop over the suits array
  for (var i = 0; i < suits.length; i += 1) {
    // Store the current suit in a variable
    var currentSuit = suits[i];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (var rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;
      var rankCounter2 = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
        var rankCounter2 = 11;
      } else if (cardName == 11) {
        cardName = "jack";
        var rankCounter2 = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        var rankCounter2 = 10;
      } else if (cardName == 13) {
        cardName = "king";
        var rankCounter2 = 10;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter2
      };

      // Add the new card to the deck
      cardDeck.push(card);
    }
  }

  // Return the completed card deck
  return cardDeck;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

// Summation of player's/dealer's hand
var sumOfHand = function (input) {
  var sum = 0;
  for (var index = 0; index < input.length; index += 1) {
    sum = sum + input[index].rank;
  }
  return sum;
};

// Display of player's/dealer's hand
var displayHand = function (input) {
  // Initialise index to 0 to start from the beginning of the array
  var index = 0;
  // Create an empty array for card display
  var displayCard = [];
  // Define loop condition to loop until index is the length of cardDeck
  for (var index = 0; index < input.length; index += 1) {
    // Construct a string using attributes of each card object
    var card = `${input[index].name} of ${input[index].suit}`;
    // Store card in an array
    displayCard.push(card);
    // Increment the card index
  }
  return displayCard;
};

// Global variables
var playerHand = [];
var dealerHand = [];
var mode = "";
var cardDeck = makeDeck();
var shuffledDeck = shuffleCards(cardDeck);

// Main function
var main = function (input) {
  // User clicks Submit to deal cards.
  if (!mode) {
    if (!input) {
      // Store player/dealer hand in the form of objects in array
      playerHand.push(shuffledDeck.pop(), shuffledDeck.pop());
      dealerHand.push(shuffledDeck.pop(), shuffledDeck.pop());

      // The cards are displayed to the user.
      var myOutputValue = `You just drew ${playerHand[0].name} of ${playerHand[0].suit} and ${playerHand[1].name} of ${playerHand[1].suit}. <br>`;
    }

    // The cards are analysed for game winning conditions, e.g. Blackjack.
    if (
      // Both dealer and player have blackjack
      ((dealerHand[0].rank == 11 && dealerHand[1].rank == 10) ||
        (dealerHand[0].rank == 10 && dealerHand[1].rank == 11)) &&
      ((playerHand[0].rank == 11 && playerHand[1].rank == 10) ||
        (playerHand[0].rank == 10 && playerHand[1].rank == 11))
    ) {
      return (
        myOutputValue +
        `The computer drew ${dealerHand[0].name} of ${dealerHand[0].suit} and ${dealerHand[1].name} of ${dealerHand[1].suit}. <br>
        It's a tie as both the player and the dealer have Blackjack.`
      );
    } else if (
      // Dealer has blackjack
      (dealerHand[0].rank == 11 && dealerHand[1].rank == 10) ||
      (dealerHand[0].rank == 10 && dealerHand[1].rank == 11)
    ) {
      return (
        myOutputValue +
        `The computer drew ${dealerHand[0].name} of ${dealerHand[0].suit} and ${dealerHand[1].name} of ${dealerHand[1].suit}. <br>
      You lose. The dealer has a Blackjack.`
      );
    } else if (
      // Player has blackjack
      (playerHand[0].rank == 11 && playerHand[1].rank == 10) ||
      (playerHand[0].rank == 10 && playerHand[1].rank == 11)
    ) {
      return (
        myOutputValue +
        `The computer drew ${dealerHand[0].name} of ${dealerHand[0].suit} and ${dealerHand[1].name} of ${dealerHand[1].suit}. <br>
      You win. You got a Blackjack.`
      );
    }
  }

  // The user decides whether to hit or stand, using the submit button to submit their choice.
  // Input validation
  if (input == "hit") {
    mode = "hit";
  } else if (input == "stand") {
    mode = "stand";
  } else if (input !== "hit" && input !== "stand" && input !== "") {
    return "Wrong input. Please type in either 'hit' or 'stand'"; // Early return
  }

  // Implement game mode to toggle between hit and stand
  if (mode == "hit") {
    var playerHitCard = shuffledDeck.pop();
    playerHand.push(playerHitCard);

    return `
    You just drew ${playerHitCard.name} of ${playerHitCard.suit}. <br>
    Your hand: ${displayHand(playerHand)}`;
  }

  if (mode == "stand") {
    // Calculate summation of both player's and dealer's hand
    var playerSum = sumOfHand(playerHand);
    var dealerSum = sumOfHand(dealerHand);

    // The value of ACE could be either 1 or 11.
    // Make use of for loop to locate ACE, the second and subsequent ACEs must be 1.
    // Default ACE value set is 11.
    for (var i = 0; i < playerHand.length; i += 1) {
      if (playerHand[i].rank == 11 && playerSum > 21) {
        // playerHand[i].rank == 1; // How to reassign a value?
        playerSum = playerSum - 10;
      }
    }

    // The computer decides to hit or stand automatically based on game rules.
    for (dealerSum; dealerSum < 17; ) {
      dealerHand.push(shuffledDeck.pop());
      dealerSum = sumOfHand(dealerHand);

      // Dealer's ACE.
      for (var i = 0; i < dealerHand.length; i += 1) {
        if (dealerHand[i].rank == 11 && dealerSum > 21) {
          // dealerHand[i].rank == 1; // How to reassign a value?
          dealerSum = dealerSum - 10;
          // Dealer's hand: ace of diamonds,3 of diamonds,jack of hearts,ace of clubs, Total = 25.
        }
      }
    }

    // Check if player/dealer gots bust
    if (playerSum > 21 && dealerSum <= 21) {
      return `
      You lose with a bust. <br>
      Your hand: ${displayHand(playerHand)}, Total = ${playerSum}. <br>
      Dealer's hand: ${displayHand(dealerHand)}, Total = ${dealerSum}.`;
    } else if (playerSum <= 21 && dealerSum > 21) {
      return `
      You win. The dealer has a bust. <br>
      Your hand: ${displayHand(playerHand)}, Total = ${playerSum}. <br>
      Dealer's hand: ${displayHand(dealerHand)}, Total = ${dealerSum}.`;
    } else if (playerSum > 21 && dealerSum > 21) {
      return `
      It's a tie. Both the dealer and you have a bust. <br>
      Your hand: ${displayHand(playerHand)}, Total = ${playerSum}. <br>
      Dealer's hand: ${displayHand(dealerHand)}, Total = ${dealerSum}.`;
    }

    // The user's cards are analysed for winning or losing conditions.
    if (playerSum < dealerSum) {
      myOutputValue = `
      You lose. <br>
      Your hand: ${displayHand(playerHand)}, Total = ${playerSum}. <br>
      Dealer's hand: ${displayHand(dealerHand)}, Total = ${dealerSum}.`;
    } else if (playerSum > dealerSum) {
      myOutputValue = `
      You win. <br>
      Your hand: ${displayHand(playerHand)}, Total = ${playerSum}. <br>
      Dealer's hand: ${displayHand(dealerHand)}, Total = ${dealerSum}.`;
    } else {
      myOutputValue = `
      It's a tie. <br>
      Your hand: ${displayHand(playerHand)}, Total = ${playerSum}. <br>
      Dealer's hand: ${displayHand(dealerHand)}, Total = ${dealerSum}.`;
    }
  }

  return myOutputValue;
};
