import React from "react";
import { Button } from "@chakra-ui/react";
import { createQuiz } from "../../helpers";
import { useSetRecoilState } from "recoil";
import { isStartedState, quizQueueState } from "../../recoil_state";
import { ArrowBackIcon } from "@chakra-ui/icons";

const HomeButton = React.memo(() => {
  const setIsStarted = useSetRecoilState(isStartedState);
  const setQuizQueue = useSetRecoilState(quizQueueState);

  return (
    <Button
      colorScheme="facebook"
      onClick={() => {
        setIsStarted(false);
        setQuizQueue(createQuiz());
      }}
    >
      <ArrowBackIcon />
      ホームにもどる
    </Button>
  );
});

export default HomeButton;
