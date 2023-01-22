import Title from "./Title";
import Quiz from "./Quiz";
import { useState, useReducer } from "react";
import { Center } from "@chakra-ui/react";
import { createQuiz } from "../helpers";

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const initQuizState = {
    quizType: "",
    quizSize: 0,
  };
  const modeReducer = (state, action) => {
    setIsStarted((flag) => !flag);
    switch (action) {
      case "single10":
        return { ...state, quizType: "imgSingle", quizSize: 10 };
      case "single47":
        return { ...state, quizType: "imgSingle", quizSize: 47 };
      case "country10":
        return { ...state, quizType: "imgCountry", quizSize: 10 };
      case "country47":
        return { ...state, quizType: "imgCountry", quizSize: 47 };
      default:
        return state;
    }
  };
  const [quizState, dispatch] = useReducer(modeReducer, initQuizState);

  const [quizQueue, setQuizQueue] = useState(createQuiz());

  return (
    <Center h="600px" w="800px">
      {isStarted ? (
        <Quiz
          setIsStarted={setIsStarted}
          quizQueueState={[quizQueue, setQuizQueue]}
          quizState={quizState}
        />
      ) : (
        <Title dispatch={dispatch} />
      )}
    </Center>
  );
}

export default App;
