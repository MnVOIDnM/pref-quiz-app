import React from "react";
import { Image, Box } from "@chakra-ui/react";

const QuizImage = React.memo(({ quizQueue, counter, quizState }) => {
  return (
    <Box boxSize="lg">
      <Image src={quizQueue.answer[counter][quizState.quizType]} />
    </Box>
  );
});

export default QuizImage;
