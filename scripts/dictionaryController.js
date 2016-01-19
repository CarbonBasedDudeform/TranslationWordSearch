function addWords(){
  var subjectWord = document.getElementsByName("subjectLangWord")[0].value;
  var targetWord = document.getElementsByName("targetLangWord")[0].value;
  if (AreValidWords(subjectWord, targetWord)) {
    alert("awesome");
  } else {
    alert("Sorry, no punctuation allowed. Please only use letters.")
  }
}

function AreValidWords(subject, target) {
  var regEx = /^[A-Za-z]+$/;
  return regEx.test(subject) && regEx.test(target);
}
