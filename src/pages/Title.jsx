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
import ModeSelectButton from "../components/title/ModeSelectButton";

const Title = React.memo(({ dispatch, isKanaState, setKanaType }) => {
  const [isKana, setIsKana] = isKanaState;
  return (
    <VStack maxW="100vh" maxh="90vh">
      <Heading
        size="3xl"
        pos="absolute"
        w="70%"
        left="30%"
        top="30%"
        textShadow="1px 1px 5px yellow"
        textColor="red.400"
      >
        都道府県クイズ
      </Heading>
      <Image src={coverImage} alt="japan" w="70%" h="70%" />
      <HStack h="20%" mx="auto">
        <FormControl align="center">
          <FormLabel w="100%" htmlFor="kanaMode">
            <Heading fontSize="xl" align="center">
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
