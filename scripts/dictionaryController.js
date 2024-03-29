function dictionaryController() {

  this.checkStartingConditionsCallback = function() {};
  
  this.addWord = function(subjectWord, targetWord) {
    if (AreValidWords(subjectWord, targetWord)) {
      localStorage.setItem(subjectWord, targetWord);
      return true;
    }

    return false;
  }

  this.addWords = function() {
    const subjectWord = document.getElementsByName("subjectLangWord")[0].value;
    const targetWord = document.getElementsByName("targetLangWord")[0].value;
    const addedWordResult = this.addWord(subjectWord, targetWord);
    const failedToAddWord = addedWordResult == false;
    if (failedToAddWord) {
      alert("Sorry, no punctuation allowed. Please only use letters.")
    }

    this.checkStartingConditionsCallback();
  }

  function AreValidWords(subject, target) {
    const regEx = /^[A-Za-z]+$/;
    return regEx.test(subject) && regEx.test(target);
  }

  this.loadTargetWords = function() {
    console.log("Loading words");
    let wordsToUse = [];
    //for now, use basic "grab first 10 words" algorithm.
    //in the future, will want to spice it up a bit.
    const amountToGrab = Math.min(localStorage.length, 10);
    for(let i = 0; i < amountToGrab; i++) {
      wordsToUse.push(localStorage.key(i));
    }

    return wordsToUse;
  }

  this.loadSubjectWords = function(targetWords) {
    let subjectWords = [];
    targetWords.forEach(function(word){
      subjectWords.push(localStorage[word]);
    });

    return subjectWords;
  }

  this.getWordToFind = function(wordAsArray) {
    let word = wordAsArray.join('');
    return [localStorage[word]];
  }
}
