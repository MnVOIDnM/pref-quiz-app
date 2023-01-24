import React, { useState } from "react";
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
  ({ setIsStarted, quizQueueState, quizState, kanaType }) => {
    const [quizQueue, setQuizQueue] = quizQueueState;
    const { seconds, minutes, pause } = useStopwatch({
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
      if (select == quizQueue.answer[counter][kanaType]) {
        setIsCorrect((prev) => !prev);
        setTimeout(() => {
          setIsCorrect((prev) => !prev);
        }, 200);
        updateQuiz();
      } else {
        setIsWrong((prev) => !prev);
        setTimeout(() => {
          setIsWrong((prev) => !prev);
        }, 800);
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
              kanaType={kanaType}
            />
          </Box>
        </VStack>
      </HStack>
    );
  }
);
export default Quiz;
