export const shuffleAnswers = question => {
    const unshuffledAnswers = [
        question.correctAnswer,
        ...question.incorrectAnswers
    ];
    return unshuffledAnswers.map(unshuffledAnswer => ({
        sort: Math.random(), 
        value: unshuffledAnswer
    }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
}; // Shamelessly stolen

// Tohle taky hrozně na sucho xdd
export const normalizeQuestions = backendQuestions => {
    return backendQuestions.map( backendQuestion => {
        const incorrectAnswers = backendQuestion.incorrect_answers.map(incorrectAnswer => decodeURIComponent(incorrectAnswer));
        return {
            correctAnswer: decodeURIComponent(backendQuestion.correct_answer),
            question: decodeURIComponent(backendQuestion.question),
            incorrectAnswers
        };
    });
};