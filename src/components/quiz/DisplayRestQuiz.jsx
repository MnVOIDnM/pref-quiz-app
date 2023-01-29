import { Heading } from "@chakra-ui/react";

const DisplayRestQuiz = ({ counter, fixedQuizSize }) => {
  return (
    <Heading fontFamily="monospace" size={["md", "lg", "xl"]}>{`${
      counter + 1
    }/${fixedQuizSize}`}</Heading>
  );
};

export default DisplayRestQuiz;
