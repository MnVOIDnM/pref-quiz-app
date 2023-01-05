import Title from "./Title";
import Quiz from "./Quiz";
import { useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  const [isStarted, setIsStarted] = useState(false);

  return (
    <ChakraProvider>
      {isStarted ? (
        <Quiz setIsStarted={setIsStarted} />
      ) : (
        <Title setIsStarted={setIsStarted} />
      )}
    </ChakraProvider>
  );
}

export default App;
