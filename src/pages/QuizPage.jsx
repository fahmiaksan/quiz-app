import { useNavigate, useParams } from "react-router-dom";
import { QuizContext } from "../utils/config";
import QuizHeader from "../components/quiz-header/QuizHeader";
import { useContext, useEffect, useRef, useState } from "react";
import NavbarComponent from "../components/navbar/Index";
import { Button, Progress, Skeleton, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import Question from "../components/question/Question";
import { useGetQuestion } from "../hook/get-question-data";

export default function QuizPage() {
  const { score, scoreDispatch, quizType, typeQuestion, quizTypeDispatch, typeQuestionDispatch } = useContext(QuizContext);
  const navigate = useNavigate();
  const { category, difficulty } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const { isLoading, data } = useGetQuestion(category, difficulty);
  const savedDataQuiz = JSON.parse(localStorage.getItem('quiz-state'));
  const [timer, setTimer] = useState(savedDataQuiz?.timer || 60);
  const user = localStorage.getItem('user');
  const [totalAnswers, setTotalAnswers] = useState([{
    correct: 0,
    incorrect: 0
  }]);
  const timerIntervalIdRef = useRef(null);
  const nextQuestion = (e) => {
    e.preventDefault();
    if (score === null) {
      scoreDispatch({ type: 'SET_SCORE', payload: 0 });
    }
    setCurrentQuestion((prev) => prev + 1);
    setIsAnswered(false);
    const newState = {
      currentQuestion: currentQuestion + 1,
      isAnswered,
      scoreAnswer: totalAnswers.map(({ correct, incorrect }) => ({ correct, incorrect })),
      timer
    };
    localStorage.setItem('quiz-state', JSON.stringify(newState));
  }
  useEffect(() => {
    if (!user) {
      return navigate('/');
    }
    if (savedDataQuiz && savedDataQuiz.category === category && savedDataQuiz.difficulty === difficulty) {
      setCurrentQuestion(savedDataQuiz.currentQuestion);
      setIsAnswered(savedDataQuiz.isAnswered);
    }
    if (!quizType) {
      quizTypeDispatch({ type: 'SET_TYPE', payload: [{ category, difficulty }] });
      localStorage.setItem('quiz-type', JSON.stringify({ category, difficulty }));
    }
    if (!typeQuestion) {
      typeQuestionDispatch({ type: 'SET_TYPE', payload: [{ category, difficulty }] });
      localStorage.setItem('type-quiz', JSON.stringify({ category, difficulty }));
    }
  }, []);

  useEffect(() => {
    if (timer <= 0) {
      clearInterval(timerIntervalIdRef.current);
      setShowResults(true);
      return
    }
    if (currentQuestion + 1 > data?.results?.length) {
      setShowResults(true);
      clearInterval(timerIntervalIdRef.current);
      setTimer(0);
      return
    }
  }, [timer]);

  useEffect(() => {
    if (currentQuestion + 1 > data?.results?.length) {
      setShowResults(true);
      clearInterval(timerIntervalIdRef);
      localStorage.removeItem('quiz-state');
      localStorage.removeItem('type-quiz');
      localStorage.removeItem('quiz-type');
      typeQuestionDispatch({ type: 'RESET_TYPE' });
    } else if (currentQuestion + 1 <= data?.results?.length) {
      localStorage.setItem('type-quiz', JSON.stringify({
        category,
        difficulty
      }));
    }
  }, [showResults]);

  useEffect(() => {
    if (!isLoading || data?.results?.length > 0) {
      setShowResults(false);
      timerIntervalIdRef.current = setInterval(() => {
        setTimer((prev) => prev > 0 ? prev - 1 : prev);
      }, 1000);

      return () => {
        if (timer <= 0) {
          clearInterval(timerIntervalIdRef.current);
          setShowResults(true);
        }
      }
    }
  }, [isLoading]);
  return (
    <>
      <NavbarComponent />
      <QuizHeader timer={timer} />
      <div className="lg:w-9/12 md:w-[90%] w-[95%] mx-auto mt-9 flex flex-col space-y-6 h-[100vh]">
        {isLoading && (
          <>
            <div className="w-full flex flex-col space-y-5">
              <div className="flex  justify-between">
                <Skeleton className="h-10 w-28 rounded-lg"></Skeleton>
                <Skeleton className="h-10 w-28 rounded-lg"></Skeleton>
              </div>
              <Skeleton
                className="h-3 w-full rounded-lg"
              />
              <Skeleton className="h-3 w-20 rounded-lg"></Skeleton>
            </div>
            <div className="w-full flex flex-col space-y-5">
              <Skeleton className="h-8 w-3/4 rounded-lg"></Skeleton>
              <div className="w-full space-y-4">
                <Skeleton className="h-11 w-full rounded-lg"></Skeleton>
                <Skeleton className="h-11 w-full rounded-lg"></Skeleton>
                <Skeleton className="h-11 w-full rounded-lg"></Skeleton>
              </div>
              <div className="w-full flex justify-end">
                <Skeleton className="h-10 w-28 rounded-lg"></Skeleton>
              </div>
            </div>
          </>
        )
        }

        {
          !isLoading && !showResults &&
          (
            <>
              <div className="w-full flex flex-col space-y-5">
                <div className="flex  justify-between">
                  <span className="px-4 py-2 rounded-lg bg-yellow-600">{category}</span>
                  <span className="px-4 py-2 rounded-lg bg-blue-600">{String(difficulty).split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1))}</span>
                </div>
                <Progress
                  aria-label="question"
                  size="md"
                  value={Math.round(((currentQuestion + 1) / 10) * 100)}
                  color="success"
                  showValueLabel={true}
                  className="w-full"
                />
                <span>Question {currentQuestion + 1} / 10</span>
              </div>
              <form onSubmit={nextQuestion} className="w-full flex flex-col space-y-5">
                {
                  data?.results[currentQuestion] !== undefined && (
                    <>
                      <Question
                        data={data?.results[currentQuestion]}
                        isAnswered={isAnswered}
                        setIsAnswered={setIsAnswered}
                        setTotalAnswers={setTotalAnswers}
                      />
                      <div type="submit" className="w-full flex justify-end">
                        <Button
                          type="submit"
                          className="w-16"
                          disabled={isAnswered ? false : true}
                        >
                          {
                            currentQuestion + 1 === data?.results?.length ? 'Finish' : 'Next'
                          }
                        </Button>
                      </div>
                    </>

                  )
                }
              </form>
            </>
          )}
        {
          showResults && (
            <div className="w-full flex flex-col space-y-5">
              <h1 className={`text-3xl font-bold text-center md:mt-20 mt-10 lg:mt-30  ${score === 0 ? 'text-red-500' : 'text-green-500'}`}>
                {score === 0 ? 'Your score is 0' : `Your score is ${score * 10}`}
              </h1>
              {
                totalAnswers.map((item, index) => (
                  <div
                    key={index}
                    className="w-full flex flex-col space-y-5"
                  >
                    <Table aria-label="Score Statik">
                      <TableHeader>
                        <TableColumn>Total question</TableColumn>
                        <TableColumn>You have answered {item.correct + item.incorrect === 1 ? 'question' : 'questions'}</TableColumn>
                        <TableColumn>Correct</TableColumn>
                        <TableColumn>Incorrect</TableColumn>
                      </TableHeader>
                      <TableBody>
                        <TableRow key='1'>
                          <TableCell>{data?.results?.length}</TableCell>
                          <TableCell>{item.incorrect + item.correct}</TableCell>
                          <TableCell>{item.correct}</TableCell>
                          <TableCell>{item.incorrect}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    <Button onClick={() => navigate('/quiz')} className="w-30" color="danger">
                      Return to menu
                    </Button>
                    <Button onClick={() => window.location.reload()} className="w-30" color="success">
                      Try again
                    </Button>
                  </div>
                ))
              }
            </div>
          )
        }
      </div>
    </>
  )
}

