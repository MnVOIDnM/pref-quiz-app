import React, { useState, useCallback, useEffect } from "react";
import { HStack, VStack, Box, useDisclosure } from "@chakra-ui/react";
import { useStopwatch } from "react-timer-hook";
import Stopwatch from "./Stopwatch";
import HomeButton from "./HomeButton";
import DisplayJudge from "./DisplayJudge";
import DisplayRestQuiz from "./DisplayRestQuiz";
import QuizChoices from "./QuizChoices";
import QuizImage from "./QuizImage";
import ResultModal from "./ResultModal";

const Quiz = React.memo(
  ({ setIsStarted, quizQueueState, quizState, isKana }) => {
    const [quizQueue, setQuizQueue] = quizQueueState;
    const { seconds, minutes, pause, isRunning } = useStopwatch({
      autoStart: true,
    });
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isWrong, setIsWrong] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [fixedQuizSize] = useState(quizState.quizSize);
    const [restQuiz, setRestQuiz] = useState(quizState.quizSize);

    const counter = fixedQuizSize - restQuiz;

    const updateQuiz = () => {
      if (restQuiz > 1) {
        setRestQuiz((prev) => prev - 1);
      } else if (restQuiz == 1) {
        onOpen();
        pause();
      } else {
        throw new Error("error");
      }
    };
    const judge = (select) => {
      if (
        select == isKana
          ? quizQueue.answer[counter].nameKana
          : quizQueue.answer[counter].name
      ) {
        setIsCorrect((prev) => !prev);
        setTimeout(() => {
          setIsCorrect((prev) => !prev);
        }, 2000);
        updateQuiz();
      } else {
        setIsWrong((prev) => !prev);
        setTimeout(() => {
          setIsWrong((prev) => !prev);
        }, 1000);
      }
    };

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
        {isOpen && (
          <ResultModal
            setIsStarted={setIsStarted}
            setQuizQueue={setQuizQueue}
            disclosure={{ isOpen, onOpen, onClose }}
          />
        )}
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
              isKana={isKana}
            />
          </Box>
        </VStack>
      </HStack>
    );
  }
);
export default Quiz;
