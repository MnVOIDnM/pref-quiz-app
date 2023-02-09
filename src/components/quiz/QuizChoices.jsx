import React from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { kanaTypeState, quizQueueState } from "../../recoil_state";

const QuizChoices = React.memo(({ judge, isWrong, counter }) => {
  const kanaType = useRecoilValue(kanaTypeState);
  const quizQueue = useRecoilValue(quizQueueState);

  return (
    <>
      <ButtonGroup w="95%" m={1}>
        {quizQueue.choices[counter].map((choice) => (
          <Button
            px={12}
            py={12}
            w="25%"
            fontSize="2.8rem"
            key={choice.id}
            isDisabled={isWrong}
            onClick={() => judge(choice[kanaType])}
          >
            {choice[kanaType]}
          </Button>
        ))}
      </ButtonGroup>
    </>
  );
});

export default QuizChoices;
