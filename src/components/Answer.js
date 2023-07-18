const Answer = ( {answerText, onSelectAnswer, index, currentAnswer, correctAnswer} ) => {
    // Líp mě to mapování nenapadlo
    const greekLetters = ['α', 'β', 'γ', 'δ'];
    // Tohle jsem taky někde viděl a přišlo mi to jako zajímavý řešení (možná bad practice)
    const isCorrectAnswer = currentAnswer && answerText === correctAnswer;
    const isWrongAnswer = currentAnswer === answerText && currentAnswer !== correctAnswer;
    const correctClass = isCorrectAnswer ? 'correct-answer' : '';
    const wrongClass = isWrongAnswer ? 'wrong-answer' : '';
    const disabledClass = currentAnswer ? 'disabled-answer' : '';
    return (
        <div className={`answer ${correctClass} ${wrongClass} ${disabledClass}`} onClick={() => onSelectAnswer(answerText)}>
            <div className="answer-letter">{greekLetters[index]}</div>
            <div className="answer-text">{answerText}</div>
        </div>
    )
}

export default Answer;