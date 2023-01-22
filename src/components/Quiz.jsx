import { HStack, VStack, Box } from "@chakra-ui/react";
import React, { useState, useCallback } from "react";
import Stopwatch from "./Stopwatch";
import { useStopwatch } from "react-timer-hook";
import HomeButton from "./HomeButton";
import DisplayJudge from "./DisplayJudge";
import DisplayRestQuiz from "./DisplayRestQuiz";
import QuizChoices from "./QuizChoices";
import QuizImage from "./QuizImage";

const Quiz = React.memo(({ setIsStarted, quizQueueState, quizState }) => {
  const [quizQueue, setQuizQueue] = quizQueueState;
  const { seconds, minutes, pause, isRunning } = useStopwatch({
    autoStart: true,
  });
  const [isWrong, setIsWrong] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [fixedQuizSize] = useState(quizState.quizSize);
  const [restQuiz, setRestQuiz] = useState(quizState.quizSize);

  const counter = fixedQuizSize - restQuiz;

  const updateQuiz = () => {
    if (restQuiz > 1) {
      setRestQuiz((prev) => prev - 1);
    } else if (restQuiz == 1) {
      pause();
    } else {
      throw new Error("error");
    }
  };
  const judge = useCallback(
    (selectedChoice) => {
      if (selectedChoice == quizQueue.answer[counter].name) {
        setIsCorrect((prev) => !prev);
        setTimeout(() => {
          setIsCorrect((prev) => !prev);
        }, 400);
        updateQuiz();
      } else {
        setIsWrong((prev) => !prev);
        setTimeout(() => {
          setIsWrong((prev) => !prev);
        }, 800);
      }
    },
    [isCorrect, isWrong]
  );

  return (
    <HStack>
      <VStack>
        <HomeButton setIsStarted={setIsStarted} setQuizQueue={setQuizQueue} />
        <Box>
          <Stopwatch useStopwatchState={{ seconds, minutes }} />
        </Box>
        <DisplayRestQuiz counter={counter} fixedQuizSize={fixedQuizSize} />
        <DisplayJudge isCorrect={isCorrect} isWrong={isWrong} />
      </VStack>
      <VStack>
        <Box>
          <QuizImage
            quizQueue={quizQueue}
            counter={counter}
            quizState={quizState}
          />
          <QuizChoices
            quizQueue={quizQueue}
            judge={judge}
            isWrong={isWrong}
            counter={counter}
          />
        </Box>
      </VStack>
    </HStack>
  );
});
export default Quiz;
