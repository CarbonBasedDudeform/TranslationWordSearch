function dictionaryController() {
  this.addWord = function(subjectWord, targetWord){
    if (AreValidWords(subjectWord, targetWord)) {
      localStorage.setItem(subjectWord, targetWord);
      return true;
    }

    return false;
  }

  this.addWords = function() {
    var subjectWord = document.getElementsByName("subjectLangWord")[0].value;
    var targetWord = document.getElementsByName("targetLangWord")[0].value;
    let succesfullyAddedWord = this.addWord(subjectWord, targetWord);
    if (succesfullyAddedWord == false) {
      alert("Sorry, no punctuation allowed. Please only use letters.")
    }
  }

  function AreValidWords(subject, target) {
    var regEx = /^[A-Za-z]+$/;
    return regEx.test(subject) && regEx.test(target);
  }

  this.loadTargetWords = function() {
    console.log("Loading words");
    var wordsToUse = [];
    //for now, use basic "grab first 10 words" algorithm.
    //in the future, will want to spice it up a bit.
    var amountToGrab = Math.min(localStorage.length, 10);
    for(var i = 0; i < amountToGrab; i++) {
      wordsToUse.push(localStorage.key(i));
    }

    return wordsToUse;
  }

  this.loadSubjectWords = function(targetWords) {
    var subjectWords = [];
    targetWords.forEach(function(word){
      subjectWords.push(localStorage[word]);
    });

    return subjectWords;
  }

  this.getWordToFind = function(wordAsArray) {
    var word = wordAsArray.join('');
    return [localStorage[word]];
  }
}
