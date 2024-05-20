import { useQuery } from "@tanstack/react-query";
import { getQuestions } from "../utils/request";
export const useGetQuestion = (category, difficulty) => useQuery({
  queryKey: ['question'],
  queryFn: () => getQuestions({ category, difficulty }),
});