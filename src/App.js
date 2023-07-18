import { QuizContext } from "./context";
import Question from "./components/Question";
import { useContext, useEffect } from "react";

const App = () => {
     // Kontext mi přišel docela fajn, předtím jsem používal useState myslím
    const [quizState, dispatch] = useContext(QuizContext);
    // Random api data, tohle upřímně hodně googlení a chatgpt, pomohl dost i s funkcema idkjustworkpls.js
    const apiUrl = 'https://opentdb.com/api.php?amount=8&category=9&difficulty=hard&type=multiple&encode=url3986';
    useEffect(() => {
        if (quizState.questions.length > 0) {
            return;
        }
        fetch(apiUrl)
            .then(res => res.json())
            .then(data => { 
                dispatch({type: "LOAD_DATA", payload: data.results});
            });
    })
    return (
        // Tohle rendrování na základě podmínky mi přišlo celkem fajn, ale nevím jestli tak má vypadat flow
        <div className="quiz">
            {quizState.showResults && (
                <div className="result">
                    <div className="gg">
                        <div>!!!GOOD FUCKING MORNING GODDAMNIT!!!</div>
                        <br></br>
                        <div>GOT {quizState.correctAnswersCount} / {quizState.questions.length} CORRECT</div>
                    </div>
                    <div className="btn" onClick={() => dispatch({ type: "RESTART" })}>
                        RESPAWN
                    </div>
                </div>
            )}
            {!quizState.showResults && quizState.questions.length > 0 && (
                <div>
                    <div className="score">
                        QUESTION {quizState.currentQuestionIndex + 1} / {quizState.questions.length}
                    </div>
                    <Question />
                    <div className="btn" onClick={() => dispatch({ type: "NEXT_QUESTION" })}>
                        NEEEEEEEEXT
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;