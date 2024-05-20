import axios from 'axios';

const BASE_URL = 'https://opentdb.com/api.php?amount=10&type=multiple';
export const getQuestions = async ({ category, difficulty }) => {
  const { data } = await axios.get(`${BASE_URL}&categories=${category}&difficulty=${difficulty}`);
  return data
}

export const categories = [
  { label: 'General Knowledge', value: 9 },
  { label: 'Entertaiment: Music', value: 12 },
  { label: 'Science and Nature', value: 17 },
  { label: 'Sports', value: 21 },
  { label: 'Geography', value: 22 },
  { label: 'History', value: 23 },
]

export const difficulty = [
  { label: 'Easy', value: 'Easy' },
  { label: 'Medium', value: 'Medium' },
  { label: 'Hard', value: 'Hard' },
]


