import { Heading, Box } from "@chakra-ui/react";

const DisplayRestQuiz = ({ counter, fixedQuizSize }) => {
  return (
    <Box>
      <Heading size="2xl">{`${counter + 1}/${fixedQuizSize}`}</Heading>
    </Box>
  );
};

export default DisplayRestQuiz;
