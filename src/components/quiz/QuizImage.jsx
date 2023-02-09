import React from "react";
import { Image } from "@chakra-ui/react";
import { quizQueueState } from "../../recoil_state";
import { useRecoilValue } from "recoil";

const QuizImage = React.memo(({ counter, quizState }) => {
  const quizQueue = useRecoilValue(quizQueueState);

  return (
    <Image
      src={quizQueue.answer[counter][quizState.quizType]}
      // w="75%"
      // h="75%"
      // minW="300px"
      // border="0.5px solid"
    />
  );
});

export default QuizImage;
