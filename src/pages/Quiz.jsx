import React, { useEffect, useState } from "react";
import { VStack, Box, useDisclosure, Flex, Square } from "@chakra-ui/react";
import HomeButton from "../components/quiz/HomeButton";
import QuizChoices from "../components/quiz/QuizChoices";
import QuizImage from "../components/quiz/QuizImage";
import ResultModal from "../components/quiz/ResultModal";
import { createQuiz } from "../helpers";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  isTimerRunningState,
  kanaTypeState,
  quizQueueState,
} from "../recoil_state";

const Quiz = ({ quizState, userData }) => {
  const kanaType = useRecoilValue(kanaTypeState);
  const [quizQueue, setQuizQueue] = useRecoilState(quizQueueState);

  const [isButtonDisabled, setisButtonDisabled] = useState(false);
  const [choiceButtonColor, setChoiceButtonColor] = useState("gray");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fixedQuizSize] = useState(quizState.quizSize);
  const [restQuiz, setRestQuiz] = useState(quizState.quizSize);
  const counter = fixedQuizSize - restQuiz;

  const [score, setScore] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useRecoilState(isTimerRunningState);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!isRunning) {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  const updateQuiz = () => {
    if (restQuiz > 1) {
      setRestQuiz((prev) => prev - 1);
    } else if (restQuiz == 1) {
      const scoreThisTime = Math.floor(
        ((1000000 - time) * (1 - incorrectCount / 100)) / 1000
      );
      setScore(scoreThisTime);
      setIsRunning(false);
      onOpen();
    } else {
      throw new Error("error");
    }
  };

  const judge = (select) => {
    if (select == quizQueue.answer[counter][kanaType]) {
      setisButtonDisabled(true);
      setChoiceButtonColor("green");
      setTimeout(() => {
        setisButtonDisabled(false);
        setChoiceButtonColor("gray");
      }, 200);
      updateQuiz();
    } else {
      setisButtonDisabled(true);
      setChoiceButtonColor("red");
      setIncorrectCount((prev) => prev + 1);
      setTimeout(() => {
        setisButtonDisabled(false);
        setChoiceButtonColor("gray");
      }, 600);
    }
  };

  const repeatQuiz = () => {
    setRestQuiz(fixedQuizSize);
    setIsRunning(true);
    setIncorrectCount(0);
    setTime(0);
    setQuizQueue(createQuiz());
  };

  return (
    <VStack w="100vw" h="95vh">
      <Flex>
        <Box mt={1} mr={5}>
          <HomeButton />
        </Box>
        <Square size="85vh" mt={1}>
          <QuizImage counter={counter} quizState={quizState} />
        </Square>
      </Flex>
      <Flex h="15vh" w="100%" justifyContent="right">
        <QuizChoices
          judge={judge}
          counter={counter}
          choiceButtonColor={choiceButtonColor}
          isButtonDisabled={isButtonDisabled}
        />
      </Flex>
      <ResultModal
        repeatQuiz={repeatQuiz}
        disclosure={{ isOpen, onClose }}
        userData={userData}
        score={score}
        time={time}
        incorrectCount={incorrectCount}
      />
    </VStack>
  );
};
export default Quiz;
