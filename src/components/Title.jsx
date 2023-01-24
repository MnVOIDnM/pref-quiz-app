import {
  Heading,
  VStack,
  HStack,
  Image,
  Box,
  Switch,
  FormLabel,
  FormControl,
} from "@chakra-ui/react";
import React from "react";
import coverImage from "../images/japanIllust.png";
import ModeSelectButton from "./ModeSelectButton";

const Title = React.memo(({ dispatch, isKanaState, setKanaType }) => {
  const [isKana, setIsKana] = isKanaState;
  return (
    <VStack>
      <Box boxSize="md">
        <Heading
          size="3xl"
          align="center"
          w="50%"
          pos="absolute"
          top="30%"
          textShadow="1px 1px 0 yellow, -1px -1px 0 yellow,
          -1px 1px 0 yellow, 1px -1px 0 yellow,
          0px 1px 0 yellow,  0-1px 0 yellow,
          -1px 0 0 yellow, 1px 0 0 yellow"
          textColor="red.400"
        >
          都道府県クイズ
        </Heading>
        <Image src={coverImage} alt="japan" />
      </Box>
      <HStack>
        <FormControl align="center">
          <FormLabel w="100%" htmlFor="kanaMode">
            <Heading fontSize="lg" align="center">
              ひらがな
            </Heading>
          </FormLabel>
          <Switch
            size="lg"
            colorScheme="green"
            id="kanaMode"
            isChecked={isKana}
            onChange={() => {
              setIsKana((prev) => !prev);
              if (isKana) {
                setKanaType("name");
              } else {
                setKanaType("nameKana");
              }
            }}
          />
        </FormControl>
        <ModeSelectButton dispatch={dispatch} />
      </HStack>
    </VStack>
  );
});

export default Title;
