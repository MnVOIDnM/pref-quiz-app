import React from "react";
import { Heading, Box } from "@chakra-ui/react";

const DisplayJudge = ({ isCorrect, isWrong }) => {
  return (
    <Box h="150px">
      {isWrong && (
        <Heading color="blue" fontSize="100px">
          X
        </Heading>
      )}
      {isCorrect && (
        <Heading color="red" fontSize="100px">
          ○
        </Heading>
      )}
    </Box>
  );
};

export default DisplayJudge;
