import React from "react";
import { Button, ButtonGroup, Box } from "@chakra-ui/react";

const QuizChoices = React.memo(
  ({ quizQueue, judge, isWrong, counter, kanaType }) => {
    return (
      <>
        <ButtonGroup>
          {quizQueue.choices[counter].map((choice) => (
            <Button
              p={7}
              w="122px"
              fontSize="19px"
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
