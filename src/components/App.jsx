import Title from "./Title";
import Quiz from "./Quiz";
import { useState } from "react";
import { Center } from "@chakra-ui/react";

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [quizType, setQuizType] = useState("")
  const singleMode = () => {
    setIsStarted(flag => !flag)
    setQuizType("imgSingle")
  }
  const countryMode = () => {
    setIsStarted(flag => !flag)
    setQuizType("imgCountry")
  }

  return (
    <>
      {isStarted ? (
        <Center>
          <Quiz setIsStarted={setIsStarted} quizType={quizType} />
        </Center>
      ) : (
        <Title countryMode={countryMode} singleMode={singleMode} />
      )}
    </>
  );
}

export default App;
