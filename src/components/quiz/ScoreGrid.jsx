import { Grid, GridItem, Heading, Text } from "@chakra-ui/react";

const ScoreGrid = ({ score, incorrectCount, time }) => {
  return (
    <Grid
      h="160px"
      w="280px"
      m={3}
      mt={20}
      mr={20}
      border="1px solid #ababab"
      borderRadius={10}
      templateRows="repeat(5, 1fr)"
      templateColumns="repeat(2, 1fr)"
    >
      <GridItem rowSpan={3} colSpan={2} borderBottom="1px solid #ababab">
        <Heading textAlign="center">スコア</Heading>
        <Text fontSize="4xl" textAlign="center">
          {score}
        </Text>
      </GridItem>
      <GridItem rowSpan={2} colSpan={1} borderRight="1px solid #ababab">
        <Heading size="md" textAlign="center">
          はやさ
        </Heading>
        <Text fontSize="2xl" textAlign="center">
          {`${time / 1000}s`}
        </Text>
      </GridItem>
      <GridItem rowSpan={2} colSpan={1}>
        <Heading size="md" textAlign="center">
          まちがえた数
        </Heading>
        <Text fontSize="2xl" textAlign="center">
          {incorrectCount}
        </Text>
      </GridItem>
    </Grid>
  );
};

export default ScoreGrid;
