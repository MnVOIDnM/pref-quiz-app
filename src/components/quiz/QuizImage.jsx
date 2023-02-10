import React from "react";
import { Image } from "@chakra-ui/react";
import { quizQueueState } from "../../recoil_state";
import { useRecoilValue } from "recoil";

const QuizImage = React.memo(({ counter, quizState }) => {
  const quizQueue = useRecoilValue(quizQueueState);

  return <Image src={quizQueue.answer[counter][quizState.quizType]} />;
});

export default QuizImage;
