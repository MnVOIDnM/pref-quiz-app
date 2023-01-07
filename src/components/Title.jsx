import { Button, Heading, VStack, Image, Box } from "@chakra-ui/react";

const Title = ({ countryMode, singleMode }) => {

  return (
    <VStack>
      <Heading padding={3} margin={3} size="2xl">
        都道府県クイズ
      </Heading>
      <Box boxSize="sm">
        <Image src="img/japan/日本列島.png" alt="japan" />
      </Box>
      <Button
        size="lg"
        width="30%"
        onClick={singleMode}
      >
        単体モード
      </Button>
      <Button
        size="lg"
        width="30%"
        onClick={countryMode}
      >
        日本全体モード
      </Button>
    </VStack>
  );
};

export default Title;
