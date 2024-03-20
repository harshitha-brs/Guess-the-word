document.getElementById("submit").addEventListener("click", function() {
  const secret = document.getElementById("secretInput").value;
  const wordInput = document.getElementById("wordInput").value;
  const words = wordInput.split(",");
  const allowedGuesses = parseInt(document.getElementById("guessInput").value);

  const master = {
    secret: secret,
    guessCount: 0,
    guess: function(word) {
      if (this.guessCount >= allowedGuesses) {
        return -1; // Return -1 if the allowed number of guesses has been exceeded
      }
      this.guessCount++;
      let matches = 0;
      for (let i = 0; i < this.secret.length; i++) {
        if (this.secret[i] === word[i]) {
          matches++;
        }
      }
      return matches;
    }
  };

  const result = findSecretWord(words, master);
  if (!result) {
    document.getElementById("output").innerText = "Secret word not found.";
  } else {
    document.getElementById("output").innerText =
      "You guessed the secret word correctly.";
  }
});

document
  .getElementById("secretInput")
  .addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      document.getElementById("submit").click();
    }
  });

document
  .getElementById("wordInput")
  .addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      document.getElementById("submit").click();
    }
  });

document
  .getElementById("guessInput")
  .addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      document.getElementById("submit").click();
    }
  });

// Function to find the secret word
const findSecretWord = (wordlist, master) => {
  const getMostCommonWord = wordlist => {
    const count = Array(6)
      .fill()
      .map(() => Array(26).fill(0));
    for (const word of wordlist) {
      for (const [idx, char] of word.split("").entries()) {
        count[idx][char.charCodeAt(0) - 97]++;
      }
    }

    let mostCommonWord = "";
    let maxScore = 0;
    for (const word of wordlist) {
      let score = 0;
      for (const [idx, char] of word.split("").entries()) {
        score += count[idx][char.charCodeAt(0) - 97];
      }
      if (score > maxScore) {
        maxScore = score;
        mostCommonWord = word;
      }
    }

    return mostCommonWord;
  };

  const getNewWordlist = (wordlist, target, cnt) => {
    return wordlist.filter(word => {
      let c = 0;
      for (const [idx, char] of word.split("").entries()) {
        if (char === target[idx]) c++;
      }
      return c === cnt;
    });
  };

  while (wordlist.length > 0) {
    const mostCommonWord = getMostCommonWord(wordlist);
    const cnt = master.guess(mostCommonWord);
    if (cnt === 6) return mostCommonWord;
    wordlist = getNewWordlist(wordlist, mostCommonWord, cnt);
  }
};

// Add this script to clear the input field on page load
document.addEventListener("DOMContentLoaded", function() {
  var secretInput = document.getElementById("secretInput");
  var wordInput = document.getElementById("wordInput");
  var guessInput = document.getElementById("guessInput");
  secretInput.value = ""; // Set the input value to an empty string
  wordInput.value = "";
  guessInput.value = "";
});
