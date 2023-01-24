import React from "react";
import { Button, ButtonGroup, Box, HStack } from "@chakra-ui/react";

const QuizChoices = React.memo(
  ({ quizQueue, judge, isWrong, counter, kanaType }) => {
    return (
      <HStack m={3}>
        <Box>
          <ButtonGroup gap="2">
            {quizQueue.choices[counter].map((choice) => (
              <Button
                size="lg"
                w="110px"
                key={choice.id}
                isDisabled={isWrong}
                onClick={() => judge(choice[kanaType])}
              >
                {choice[kanaType]}
                {/* {console.log("choice btn rendered")} */}
              </Button>
            ))}
          </ButtonGroup>
        </Box>
      </HStack>
    );
  }
);

export default QuizChoices;
