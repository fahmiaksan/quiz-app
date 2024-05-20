import { categories, difficulty } from "../utils/request";
import { useContext, useEffect, useState } from "react";
import SelectedOption from "../components/select/Index";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "../components/navbar/Index";
import { QuizContext } from "../utils/config";
export default function MenuPage() {
  const [formDataCategory, setFormDataCategory] = useState('General Knowledge' || 'Entertaiment: Music' || 'Science and Nature' || 'Sports' || 'Geography' || 'History');
  const [formDataDifficulty, setFormDataDifficulty] = useState('Easy' || 'Medium' || 'Hard');
  const navigate = useNavigate();
  const user = localStorage.getItem('user');
  const { typeQuestion, typeQuestionDispatch } = useContext(QuizContext);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
    const typeQuiz = localStorage.getItem('type-quiz')
    if (typeQuiz) {
      const { category, difficulty } = JSON.parse(localStorage.getItem('type-quiz'));
      typeQuestionDispatch({ type: 'SET_TYPE', payload: [{ category, difficulty }] })
      return;
    } else {
      return;
    }
  }, []);
  const submitHandler = (e) => {
    e.preventDefault();
    if (formDataCategory.category !== "" && formDataDifficulty.difficulty !== "") {
      typeQuestionDispatch({ type: 'SET_TYPE', payload: [{ category: formDataCategory, difficulty: formDataDifficulty }] })
      navigate(`/quiz/${formDataCategory}/${formDataDifficulty.toLowerCase()}`);
    }
    localStorage.setItem('type-quiz', JSON.stringify({
      category: formDataCategory,
      difficulty: formDataDifficulty.toLocaleLowerCase(),
    }));
  }
  return (
    <div className="w-full h-[100vh]">
      <NavbarComponent />
      <div className="w-full text-center">
        <span className="text-3xl font "><h1>Select difficulty and category</h1></span>
      </div>
      <div className="lg:w-9/12 md:w-[90%] w-[95%] mx-auto mt-9 flex flex-row justify-between items-center">
        <div className="w-full h-full flex justify-center">
          <img src="/banner-quiz.png" className="lg:h-full lg:w-full md:h-45 md:w-45 w-15 h-15 object-contain" alt="banner" />
        </div>
        <form onSubmit={submitHandler} className="w-full space-y-6 h-70 md:h-full lg:h-full my-2 flex flex-col items-center justify-center">
          <div className="flex space-y-5 md:space-y-0 md:space-x-5 items-center sm:flex-col md:flex-row  w-full justify-center">
            <SelectedOption label="Category" data={categories} selectChange={setFormDataCategory} formData={formDataCategory} />
            <SelectedOption label="Difficulty" data={difficulty} selectChange={setFormDataDifficulty} formData={formDataDifficulty} />
          </div>
          <Button type="submit" disabled={localStorage.getItem('type-quiz')?.length} className={`my-2 ${formDataCategory.category === "" || formDataDifficulty.difficulty === "" ? "disabled" : ""}`}>Submit</Button>
          {
            localStorage.getItem('type-quiz')?.length ? <Button type="button" onClick={() => navigate(`/quiz/${typeQuestion[0]?.category}/${typeQuestion[0]?.difficulty.toLowerCase()}`)} className="my-2">Back To Quiz</Button> : ""
          }
        </form>
      </div>
    </div>
  )
}
