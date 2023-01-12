import { Button, Heading, HStack, VStack, Image, Box } from "@chakra-ui/react";
import { prefData } from "../prefData";
import { useState } from "react";
import Stopwatch from "./Stopwatch";
import { useStopwatch } from "react-timer-hook";

const Quiz = ({ setIsStarted, quizType }) => {
  const shuffle = ([...arr]) => {
    for (let i = arr.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };
  const { seconds, minutes, pause, isRunning } = useStopwatch({
    autoStart: true,
  });
  const [quizSize, setQuizSize] = useState(10);
  const [answer, setAnswer] = useState(Math.floor(Math.random() * 4));
  const [isWrongAnswer, setIsWrongAnswer] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);

  const initQuiz = [];
  const shuffledData = shuffle(prefData);
  for (let i = 0; i < quizSize; i++) {
    const choices = shuffledData.slice(i * 4, i * 4 + 4);
    initQuiz.push(choices);
  }
  const [quizQueue, setQuizQueue] = useState(initQuiz);

  const updateQuiz = () => {
    if (quizQueue.length > 1) {
      setAnswer(() => Math.floor(Math.random() * 4));
      setQuizQueue(quizQueue.filter((quiz, index) => index !== 0));
    } else if ((quizQueue.length = 1)) {
      pause();
    } else {
      throw new Error("error");
    }
  };
  const judge = (selectedChoice) => {
    if (selectedChoice == quizQueue[0][answer].name) {
      setIsCorrectAnswer((prev) => !prev);
      updateQuiz();
      setTimeout(() => {
        setIsCorrectAnswer((prev) => !prev);
      }, 400);
    } else {
      setIsWrongAnswer((prev) => !prev);
      setTimeout(() => {
        setIsWrongAnswer((prev) => !prev);
      }, 800);
    }
  };

  return (
    <HStack>
      <Box m={8} boxSize="sm">
        <VStack>
          <Stopwatch useStopwatchState={{ seconds, minutes }} />
          <Heading>{`残り${quizQueue.length}問`}</Heading>
          <Box h="10px">
            {isWrongAnswer && (
              <Heading color="blue" padding={10} fontSize="100px">
                X
              </Heading>
            )}
            {isCorrectAnswer && (
              <Heading color="red" padding={10} fontSize="100px">
                ○
              </Heading>
            )}
          </Box>
          {!isRunning && (
            <Button
              margin="6"
              size="lg"
              colorScheme="blue"
              onClick={() => setIsStarted((flag) => !flag)}
            >
              ホーム画面に戻る
            </Button>
          )}
        </VStack>
      </Box>
      <VStack>
        <Box boxSize={["sm", "md", "lg", "xl"]}>
          <Box margin={1}>
            <Image src={quizQueue[0][answer][quizType]} />
          </Box>
          <HStack>
            {quizQueue[0].map((choice) => (
              <Button
                fontSize="2xl"
                padding={8}
                key={choice.id}
                isDisabled={isWrongAnswer}
                onClick={() => judge(choice.name)}
              >
                {choice.name}
              </Button>
            ))}
          </HStack>
        </Box>
      </VStack>
    </HStack>
  );
};

export default Quiz;
