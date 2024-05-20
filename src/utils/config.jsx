import { createContext, useReducer } from 'react';

const optionReducer = (state, action) => {
  switch (action.type) {
    case 'SET_OPTION':
      return action.payload;
    default:
      return state;
  }
}

const typeReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TYPE':
      return action.payload
    case 'RESET_TYPE':
      return null
    default:
      return state;
  }
}

const typeReducerQuestion = (state, action) => {
  switch (action.type) {
    case 'SET_TYPE':
      return action.payload
    case 'RESET_TYPE':
      return null
    default:
      return state;
  }
}

const scoreReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SCORE':
      return action.payload;
    case 'RESET_SCORE':
      return null;
    default:
      return state;
  }
}

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [option, optionDispatch] = useReducer(optionReducer, []);
  const [score, scoreDispatch] = useReducer(scoreReducer, []);
  const [typeQuestion, typeQuestionDispatch] = useReducer(typeReducer, []);
  const [quizType, quizTypeDispatch] = useReducer(typeReducerQuestion, []);

  return (
    <QuizContext.Provider value={{ option, optionDispatch, score, scoreDispatch, typeQuestion, typeQuestionDispatch, quizType, quizTypeDispatch }}>
      {children}
    </QuizContext.Provider>
  )
}