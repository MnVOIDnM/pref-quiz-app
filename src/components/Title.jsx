import { Button, Heading, VStack, Image, Box } from "@chakra-ui/react";

const Title = ({ setIsStarted }) => {
  return (
    <VStack>
      <Heading padding={3} margin={3} size="2xl">
        都道府県クイズ
      </Heading>
      <Box boxSize="sm">
        <Image src={`${process.env.PUBLIC_URL}/img.japan.日本列島.png`} alt="japan" />
      </Box>
      <Button
        size="lg"
        width="30%"
        colorScheme="twitter"
        onClick={() => setIsStarted((flag) => !flag)}
      >
        スタート
      </Button>
    </VStack>
  );
};

export default Title;
