import React from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";

const QuizChoices = React.memo(
  ({ quizQueue, judge, isWrong, counter, kanaType }) => {
    return (
      <>
        <ButtonGroup w="100%" h="20%" display="flex" justifyContent="right">
          {quizQueue.choices[counter].map((choice) => (
            <Button
              px={12}
              py={8}
              fontSize="1.7rem"
              w="23%"
              key={choice.id}
              isDisabled={isWrong}
              onClick={() => judge(choice[kanaType])}
            >
              {choice[kanaType]}
              {/* {console.log("choice btn rendered")} */}
            </Button>
          ))}
        </ButtonGroup>
      </>
    );
  }
);

export default QuizChoices;
