import React from "react";
import { Button, Box } from "@chakra-ui/react";
import { createQuiz } from "../helpers";

const HomeButton = React.memo(({ setIsStarted, setQuizQueue }) => {
  return (
    <Button
      m={5}
      size="lg"
      colorScheme="blue"
      onClick={() => {
        setIsStarted((flag) => !flag);
        setQuizQueue(createQuiz());
      }}
    >
      ホーム画面に戻る
    </Button>
  );
});

export default HomeButton;
