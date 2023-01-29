import React from "react";
import { Image } from "@chakra-ui/react";

const QuizImage = React.memo(({ quizQueue, counter, quizState }) => {
  return (
    <Image
      src={quizQueue.answer[counter][quizState.quizType]}
      w="80%"
      h="80%"
      minW="300px"
    />
  );
});

export default QuizImage;
