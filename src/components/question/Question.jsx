import React, { useContext, useEffect, useState } from "react";
import { QuizContext } from "../../utils/config";
import { Button } from "@nextui-org/react";
import PropTypes from 'prop-types';
import parse from 'html-react-parser'
const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);
const Question = ({ data, isAnswered, setIsAnswered, setTotalAnswers }) => {
  const [selectedOption, setSelectedOption] = useState();
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const { score, scoreDispatch, option, optionDispatch } = useContext(QuizContext);

  useEffect(() => {
    const savedDataQuiz = localStorage.getItem('quiz-state');
    if (savedDataQuiz) {
      const { scoreAnswer } = JSON.parse(savedDataQuiz);
      setTotalAnswers(scoreAnswer);
    }
  }, []);

  useEffect(() => {
    const shuffledOption = shuffle([...data.incorrect_answers, data.correct_answer]);
    optionDispatch({ type: 'SET_OPTION', payload: shuffledOption });
  }, [data]);

  useEffect(() => {
    setTotalAnswers(totalAnswers => [{ correct: correctAnswer, incorrect: incorrectAnswers }]);
  }, [correctAnswer, incorrectAnswers]);
  const selectOption = (option) => {
    setSelectedOption(option);
    if (option === data.correct_answer) {
      setCorrectAnswer((prev) => prev + 1);
      scoreDispatch({ type: 'SET_SCORE', payload: Number(score) + 1 });
    } else {
      setIncorrectAnswers((prev) => prev + 1);
      scoreDispatch({ type: 'SET_SCORE', payload: Number(score) });
    }
    setIsAnswered(true);
  };

  const displayedOptions = option;
  return (
    <>
      <h1 className="text-2xl font-bold">
        {parse(data.question)}
      </h1>
      <div className="w-full space-y-4">
        {
          isAnswered ?
            displayedOptions.map((option, index) => (
              <Button
                key={index}
                className={`w-full py-2 px-4 rounded-full 
                ${option === data.correct_answer && 'bg-green-500 text-black'} 
                ${option === selectedOption && option !== data.correct_answer && 'bg-red-500 text-white'}`}
                disabled
              >
                {parse(option)}
              </Button>
            )) : displayedOptions.map((option, index) => (
              <button
                className="bg-white w-full py-2 px-4 text-black rounded-full"
                key={index}
                onClick={() => selectOption(option)}
              >
                {parse(option)}
              </button>
            ))
        }
      </div>
    </>
  )
}

Question.propTypes = {
  data: PropTypes.object,
  isAnswered: PropTypes.bool,
  setIsAnswered: PropTypes.func,
  setTotalAnswers: PropTypes.func
}

export default Question;