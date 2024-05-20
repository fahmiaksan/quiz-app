import { Route, Routes } from "react-router-dom"
import Homepage from "./pages/Homepage"
import QuizPage from "./pages/QuizPage"
import MenuPage from "./pages/MenuPage"
import LoginPage from "./pages/LoginPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/quiz" element={<MenuPage />} />
      <Route path="/quiz/:category/:difficulty" element={<QuizPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
}

export default App
