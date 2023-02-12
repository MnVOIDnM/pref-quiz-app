import React, { useEffect, useState } from "react";
import { VStack, Box, useDisclosure, Flex, Square } from "@chakra-ui/react";
import HomeButton from "../components/quiz/HomeButton";
import QuizChoices from "../components/quiz/QuizChoices";
import QuizImage from "../components/quiz/QuizImage";
import ResultModal from "../components/quiz/ResultModal";
import { createQuiz } from "../helpers";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  isTimerRunningState,
  kanaTypeState,
  quizQueueState,
  userDataState,
} from "../recoil_state";
import { collection, orderBy, query, limit, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Quiz = ({ quizState }) => {
  const kanaType = useRecoilValue(kanaTypeState);
  const [isRunning, setIsRunning] = useRecoilState(isTimerRunningState);
  const [quizQueue, setQuizQueue] = useRecoilState(quizQueueState);
  const setUserData = useSetRecoilState(userDataState);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isButtonDisabled, setisButtonDisabled] = useState(false);
  const [choiceButtonColor, setChoiceButtonColor] = useState("gray");
  const [fixedQuizSize] = useState(quizState.quizSize);
  const [restQuiz, setRestQuiz] = useState(quizState.quizSize);
  const [score, setScore] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [time, setTime] = useState(0);
  const counter = fixedQuizSize - restQuiz;

  useEffect(() => {
    const q = query(
      collection(db, quizState.currentMode),
      orderBy("score", "desc"),
      limit(20)
    );
    const getRanking = async () => {
      const querySnapshot = await getDocs(q);
      const dataWithID = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUserData(dataWithID);
    };
    getRanking();
  }, []);

  useEffect(() => {
    let interval;
    let innerTime = 0;
    if (isRunning) {
      interval = setInterval(() => {
        innerTime += 10;
      }, 10);
    } else if (!isRunning) {
      clearInterval(interval);
    }
    return () => {
      const scoreThisTime = Math.floor(
        (1000 / innerTime) * (100 - incorrectCount) * 10
      );
      setTime(innerTime);
      setScore(scoreThisTime);
      onOpen();
      clearInterval(interval);
    };
  }, [isRunning]);

  const updateQuiz = () => {
    if (restQuiz > 1) {
      setRestQuiz((prev) => prev - 1);
    } else if (restQuiz == 1) {
      setIsRunning(false);
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
    setQuizQueue(createQuiz());
  };

  return (
    <VStack w="100vw" h="100vh">
      <Flex h="85%">
        <Box mt={1} mr={5}>
          <HomeButton />
        </Box>
        <Square size="85vh" mt={1}>
          <QuizImage counter={counter} quizState={quizState} />
        </Square>
      </Flex>
      <Flex h="15%" w="100%" justifyContent="right">
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
        score={score}
        time={time}
        incorrectCount={incorrectCount}
        quizState={quizState}
      />
    </VStack>
  );
};
export default Quiz;
