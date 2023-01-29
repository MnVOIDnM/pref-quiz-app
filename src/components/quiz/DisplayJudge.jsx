import { Heading } from "@chakra-ui/react";

const DisplayJudge = ({ isCorrect, isWrong }) => {
  if (isWrong) {
    return (
      <Heading color="blue" fontSize="80px">
        X
      </Heading>
    );
  } else if (isCorrect) {
    return (
      <Heading color="red" fontSize="80px">
        ○
      </Heading>
    );
  }
};

export default DisplayJudge;
