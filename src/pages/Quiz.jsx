import React, { useEffect, useState } from "react";
import {
  HStack,
  VStack,
  Box,
  useDisclosure,
  Flex,
  Square,
  Spacer,
} from "@chakra-ui/react";
import HomeButton from "../components/quiz/HomeButton";
import DisplayJudge from "../components/quiz/DisplayJudge";
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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isWrong, setIsWrong] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [fixedQuizSize] = useState(quizState.quizSize);
  const [restQuiz, setRestQuiz] = useState(quizState.quizSize);
  const counter = fixedQuizSize - restQuiz;

  const [score, setScore] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [time, setTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] =
    useRecoilState(isTimerRunningState);

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!isTimerRunning) {
      clearInterval(interval);
    }
    console.log("timer called");
    return () => {
      clearInterval(interval);
    };
  }, [isTimerRunning]);

  const updateQuiz = () => {
    if (restQuiz > 1) {
      setRestQuiz((prev) => prev - 1);
    } else if (restQuiz == 1) {
      onOpen();
      setIsTimerRunning(false);
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
  };

  return (
    <VStack w="100vw" h="100vh">
      <Flex>
        <Box mt={1} mr={5}>
          <HomeButton />
        </Box>
        <Square size="85vh" mt={1}>
          <QuizImage counter={counter} quizState={quizState} />
        </Square>
      </Flex>
      <Flex h="15vh" w="100%" bg="whatsapp.100" justifyContent="right">
        <QuizChoices judge={judge} isWrong={isWrong} counter={counter} />
      </Flex>
      {isOpen && (
        <ResultModal
          repeatQuiz={repeatQuiz}
          disclosure={{ isOpen, onOpen, onClose }}
          userData={userData}
        />
      )}
    </VStack>
  );
};
export default Quiz;
