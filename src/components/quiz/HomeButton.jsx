import React from "react";
import { Button } from "@chakra-ui/react";
import { createQuiz } from "../../helpers";

const HomeButton = React.memo(({ setIsStarted, setQuizQueue }) => {
  return (
    <Button
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
