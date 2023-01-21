import Title from "./Title";
import Quiz from "./Quiz";
import { prefData } from "../prefData";
import { useState, useEffect } from "react";
import { Center } from "@chakra-ui/react";

const shuffle = ([...arr]) => {
  for (let i = arr.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

function App() {
  const [quizSize, setQuizSize] = useState(10);
  const [isStarted, setIsStarted] = useState(false);
  const [quizType, setQuizType] = useState("");
  const singleMode10 = () => {
    setQuizSize(10);
    setIsStarted((flag) => !flag);
    setQuizType("imgSingle");
  };
  const singleMode47 = () => {
    setQuizSize(47);
    setIsStarted((flag) => !flag);
    setQuizType("imgSingle");
  };
  const countryMode10 = () => {
    setQuizSize(10);

    setIsStarted((flag) => !flag);
    setQuizType("imgCountry");
  };
  const countryMode47 = () => {
    setQuizSize(47);

    setIsStarted((flag) => !flag);
    setQuizType("imgCountry");
  };

  const [quizQueue, setQuizQueue] = useState([]);
  const shuffledData = shuffle(prefData);
  const [answerRow, setAnswerRow] = useState(shuffledData);

  useEffect(() => {
    for (let i = 0; i < 47; i++) {
      let quizChoices = [];
      const answer = answerRow[i];
      const restData = answerRow.filter((data, index) => index != i);
      const dummyData = shuffle(restData);
      const dummyChoices = dummyData.slice(0, 3);
      dummyChoices.forEach((choice) => {
        quizChoices.push(choice);
      });
      quizChoices.push(answer);
      quizQueue.push(shuffle(quizChoices));
    }
  }, []);

  return (
    <Center h="600px" w="800px">
      {isStarted ? (
        <Quiz
          setIsStarted={setIsStarted}
          quizType={quizType}
          quizQueue={quizQueue}
          answerRow={answerRow}
          quizSizeState={[quizSize, setQuizSize]}
        />
      ) : (
        <Title
          countryMode10={countryMode10}
          countryMode47={countryMode47}
          singleMode10={singleMode10}
          singleMode47={singleMode47}
        />
      )}
    </Center>
  );
}

export default App;
