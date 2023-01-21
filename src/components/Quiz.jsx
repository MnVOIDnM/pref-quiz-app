import {
  Button,
  ButtonGroup,
  Heading,
  HStack,
  VStack,
  Image,
  Box,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Stopwatch from "./Stopwatch";
import { useStopwatch } from "react-timer-hook";

const Quiz = ({
  setIsStarted,
  quizType,
  quizQueue,
  answerRow,
  quizSizeState,
}) => {
  const [quizSize, setQuizSize] = quizSizeState;
  const { seconds, minutes, pause, isRunning } = useStopwatch({
    autoStart: true,
  });
  const [isWrong, setIsWrong] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [fixedQuizSize, setfixedQuizSize] = useState(quizSize);

  const counter = fixedQuizSize - quizSize;

  const updateQuiz = () => {
    if (quizSize > 1) {
      setQuizSize((prev) => --prev);
    } else if (quizSize == 1) {
      pause();
    } else {
      throw new Error("error");
    }
  };
  const judge = (selectedChoice) => {
    if (selectedChoice == answerRow[counter].name) {
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
  };

  return (
    <HStack>
      <VStack>
        <Button
          m={5}
          size="lg"
          colorScheme="blue"
          onClick={() => setIsStarted((flag) => !flag)}
        >
          ホーム画面に戻る
        </Button>
        <Box>
          <Stopwatch useStopwatchState={{ seconds, minutes }} />
        </Box>
        <Heading size="2xl">{`${counter + 1}/${fixedQuizSize}`}</Heading>
        <Box h="150px">
          {isWrong && (
            <Heading color="blue" fontSize="100px">
              X
            </Heading>
          )}
          {isCorrect && (
            <Heading color="red" fontSize="100px">
              ○
            </Heading>
          )}
        </Box>
      </VStack>
      <VStack>
        <Box>
          <Box boxSize="lg">
            <Image src={answerRow[counter][quizType]} />
          </Box>
          <HStack m={3}>
            <ButtonGroup gap="2">
              {quizQueue[counter].map((choice) => (
                <Button
                  size="lg"
                  w="110px"
                  key={choice.id}
                  isDisabled={isWrong}
                  onClick={() => judge(choice.name)}
                >
                  {choice.name}
                </Button>
              ))}
            </ButtonGroup>
          </HStack>
        </Box>
      </VStack>
    </HStack>
  );
};
export default Quiz;
