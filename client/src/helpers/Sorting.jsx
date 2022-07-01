function sortQuestion(question) {
  let answerBank = [];
  answerBank.push(question.correctAnswer);
  for (const ans of question.incorrectAnswers) {
    answerBank.push(ans);
  }
  return shuffle(answerBank);
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

export default sortQuestion;
