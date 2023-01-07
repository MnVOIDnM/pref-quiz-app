import Title from "./Title";
import Quiz from "./Quiz";
import { useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";

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
    <ChakraProvider>
      {isStarted ? (
        <Quiz setIsStarted={setIsStarted} quizType={quizType} />
      ) : (
        <Title countryMode={countryMode} singleMode={singleMode} />
      )}
    </ChakraProvider>
  );
}

export default App;
