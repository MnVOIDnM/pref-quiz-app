import { useEffect, useReducer } from "react";
import { Center } from "@chakra-ui/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isStartedState, quizQueueState } from "../recoil_state";
import Title from "./Title";
import Quiz from "./Quiz";
import { createQuiz } from "../helpers";

function App() {
  const isStarted = useRecoilValue(isStartedState);
  const setQuizQueue = useSetRecoilState(quizQueueState);

  const initQuizState = {
    quizType: "",
    quizSize: 0,
    currentMode: "country10",
  };
  const modeReducer = (state, action) => {
    switch (action) {
      case "single10":
        return {
          ...state,
          quizType: "imgSingle",
          quizSize: 10,
          currentMode: "single10",
        };
      case "single47":
        return {
          ...state,
          quizType: "imgSingle",
          quizSize: 47,
          currentMode: "single47",
        };
      case "country10":
        return {
          ...state,
          quizType: "imgCountry",
          quizSize: 10,
          currentMode: "country10",
        };
      case "country47":
        return {
          ...state,
          quizType: "imgCountry",
          quizSize: 47,
          currentMode: "country47",
        };
      default:
        return state;
    }
  };
  const [quizState, dispatch] = useReducer(modeReducer, initQuizState);

  useEffect(() => {
    setQuizQueue(createQuiz());
  }, []);

  return (
    <Center>
      {isStarted ? (
        <Quiz quizState={quizState} />
      ) : (
        <Title dispatch={dispatch} />
      )}
    </Center>
  );
}

export default App;
