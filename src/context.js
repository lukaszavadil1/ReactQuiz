import { createContext, useReducer } from "react";
import { normalizeQuestions, shuffleAnswers } from "./idkjustworkpls";

// State objekt, snad to může být takhle na tvrdo
const initialState = {
    currentQuestionIndex: 0,
    questions: [],
    showResults: false,
    answers: [],
    currentAnswer: '',
    correctAnswersCount: 0
};
// Asi třetí iterace, v nějakým yt videu bylo krásně ukázaná state management flow, tak jsem to ukradl xd
const reducer = (state, action) => {
    switch (action.type) {
        case "NEXT_QUESTION": {
            // Rozdělění na stav run / endgame screen
            const showResults = state.currentQuestionIndex === state.questions.length - 1;
            const currentQuestionIndex = showResults ? state.currentQuestionIndex : state.currentQuestionIndex + 1;
            const answers = showResults ? [] : shuffleAnswers(state.questions[currentQuestionIndex]);
            return {
                ...state,
                currentQuestionIndex,
                showResults,
                answers,
                currentAnswer: ''
            };
        }
        case "SELECT_ANSWER" : {
            const correctAnswersCount = action.payload === state.questions[state.currentQuestionIndex].correctAnswer ? state.correctAnswersCount + 1 : state.correctAnswersCount 
            return {
                ...state,
                currentAnswer: action.payload,
                correctAnswersCount
            };
        }
        case "RESTART": {
            return initialState;
        }
        case "LOAD_DATA": {
            // Weird magic xd
            const normalizedQuestions = normalizeQuestions(action.payload);
            return {
                ...state,
                questions: normalizedQuestions,
                answers: shuffleAnswers(normalizedQuestions[0])
            }
        }
        default: {
            return state;
        }
    }
}

export const QuizContext = createContext();

// Tohle mě porazilo, že si můžu pěkně wrapnout App komponentu a řešity states jakoby 'nad' tím
export const QuizProvider = ({children}) => {
    const value = useReducer(reducer, initialState);
    console.log('state', value)
    return <QuizContext.Provider value={value}> {children} </QuizContext.Provider>
}