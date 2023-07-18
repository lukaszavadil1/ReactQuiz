import { useContext } from "react";
import Answer from "./Answer";
import { QuizContext } from "../context";

const Question = () => { 
    const [quizState, dispatch] = useContext(QuizContext);
    const currentQuestion = quizState.questions[quizState.currentQuestionIndex]
    return (
        <div>
            <div className="question">{currentQuestion.question}</div>
            <div className="answers">
                {quizState.answers.map((answer, index) => (
                    <Answer 
                        answerText={answer} 
                        key={index} // Tohle idk, jinak mi řvala konzole xd
                        index={index}
                        currentAnswer={quizState.currentAnswer}
                        correctAnswer={currentQuestion.correctAnswer}
                        onSelectAnswer={(answerText) => 
                            // Tímhle komunikuju s kontextem
                            // Ke konci to byl trochu zmatek, tak možná někde posílám něco zbytečně
                            dispatch({type: "SELECT_ANSWER", payload: answerText})
                        }
                    />
                ))}
            </div>
        </div>
    )
}

export default Question;