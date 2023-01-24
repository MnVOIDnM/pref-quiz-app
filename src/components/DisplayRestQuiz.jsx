import { Heading, Box } from "@chakra-ui/react";

const DisplayRestQuiz = ({ counter, fixedQuizSize }) => {
  return (
    <Heading fontFamily="monospace" size="2xl">{`${
      counter + 1
    }/${fixedQuizSize}`}</Heading>
  );
};

export default DisplayRestQuiz;
