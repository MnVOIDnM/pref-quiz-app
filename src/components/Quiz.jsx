import { Button, Heading, HStack, VStack, Image, Box } from "@chakra-ui/react";
import { prefData } from "../prefData";
import { useState } from "react";
import Stopwatch from "./Stopwatch";
import { useStopwatch } from "react-timer-hook";

const Quiz = ({ setIsStarted }) => {
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
  for (let i = 0; i < quizSize; i++) {
    const shuffledData = shuffle(prefData);
    const choices = shuffledData.slice(0, 4);
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
        console.log("timer working");
      }, 400);
    } else {
      setIsWrongAnswer((prev) => !prev);
      setTimeout(() => {
        setIsWrongAnswer((prev) => !prev);
        console.log("timer working");
      }, 800);
    }
  };

  return (
    <HStack>
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
      </VStack>
      <VStack>
        <Box boxSize="md" margin={2}>
          <Image src={quizQueue[0][answer].imgSingle} />
        </Box>
        <HStack>
          {quizQueue[0].map((choice) => (
            <Button
              fontSize="2xl"
              width="130px"
              padding={8}
              key={choice.id}
              isDisabled={isWrongAnswer}
              onClick={() => judge(choice.name)}
            >
              {choice.name}
            </Button>
          ))}
        </HStack>
      </VStack>
      {!isRunning && (
        <Button
          margin="6"
          size="lg"
          colorScheme="blue"
          onClick={() => setIsStarted((isStarted) => !isStarted)}
        >
          ホーム画面に戻る
        </Button>
      )}
    </HStack>
  );
};

export default Quiz;
