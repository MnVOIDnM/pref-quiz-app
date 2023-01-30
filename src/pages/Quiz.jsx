import React, { useState } from "react";
import { HStack, VStack, Box, useDisclosure, Spacer } from "@chakra-ui/react";
import { useStopwatch } from "react-timer-hook";
import Stopwatch from "../components/quiz/Stopwatch";
import HomeButton from "../components/quiz/HomeButton";
import DisplayJudge from "../components/quiz/DisplayJudge";
import DisplayRestQuiz from "../components/quiz/DisplayRestQuiz";
import QuizChoices from "../components/quiz/QuizChoices";
import QuizImage from "../components/quiz/QuizImage";
import ResultModal from "../components/quiz/ResultModal";
import { createQuiz } from "../helpers";

const Quiz = React.memo(
  ({ setIsStarted, quizQueueState, quizState, kanaType }) => {
    const [quizQueue, setQuizQueue] = quizQueueState;
    const { seconds, minutes, pause, reset } = useStopwatch({
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

    const repeatQuiz = () => {
      setRestQuiz(fixedQuizSize);
      setQuizQueue(createQuiz());
      reset();
    };

    return (
      <VStack maxW="100vh" maxh="95vh">
        <HStack>
          <VStack w="20%" h="85%" minW="160px">
            <HomeButton
              setIsStarted={setIsStarted}
              setQuizQueue={setQuizQueue}
            />
            <Stopwatch useStopwatchState={{ seconds, minutes }} />
            <DisplayRestQuiz counter={counter} fixedQuizSize={fixedQuizSize} />
            <Spacer />
            <Box h="150px">
              <DisplayJudge isCorrect={isCorrect} isWrong={isWrong} />
            </Box>
          </VStack>
          <QuizImage
            quizQueue={quizQueue}
            counter={counter}
            quizState={quizState}
          />
        </HStack>
        <QuizChoices
          quizQueue={quizQueue}
          judge={judge}
          isWrong={isWrong}
          counter={counter}
          kanaType={kanaType}
        />
        {isOpen && (
          <ResultModal
            setIsStarted={setIsStarted}
            setQuizQueue={setQuizQueue}
            repeatQuiz={repeatQuiz}
            disclosure={{ isOpen, onOpen, onClose }}
          />
        )}
      </VStack>
    );
  }
);
export default Quiz;
