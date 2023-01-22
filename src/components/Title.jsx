import {
  Button,
  ButtonGroup,
  Heading,
  VStack,
  HStack,
  Image,
  Box,
} from "@chakra-ui/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import React from "react";

const Title = React.memo(({ dispatch }) => {
  const singleMode10 = () => {
    dispatch("single10");
  };
  const singleMode47 = () => {
    dispatch("single47");
  };
  const countryMode10 = () => {
    dispatch("country10");
  };
  const countryMode47 = () => {
    dispatch("country47");
  };
  return (
    <VStack>
      <Box boxSize="md">
        <Image src="img/japan/日本列島.png" alt="japan" />
      </Box>
      <HStack>
        <Box width="50%">
          <Popover>
            <PopoverTrigger>
              <Box>
                <Image
                  w="20"
                  src="img/imgSingle/hokkaidoSingle.jpg"
                  alt="single mode"
                />
                <Heading size="md">単体モード</Heading>
              </Box>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>1つの都道府県だけが表示されるよ</PopoverHeader>
              <PopoverBody>
                <ButtonGroup gap="2">
                  <Button onClick={singleMode10}>１０問</Button>
                  <Button onClick={singleMode47}>４７問</Button>
                </ButtonGroup>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Box>
        <Box width="50%">
          <Popover>
            <PopoverTrigger>
              <Box>
                <Image
                  w="20"
                  src="img/imgCountry/hokkaidoCountry.jpg"
                  alt="country mode"
                />
                <Heading size="md">全体モード</Heading>
              </Box>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>日本全体が表示されるよ</PopoverHeader>
              <PopoverBody>
                <ButtonGroup gap="2">
                  <Button onClick={countryMode10}>１０問</Button>
                  <Button onClick={countryMode47}>４７問</Button>
                </ButtonGroup>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Box>
      </HStack>
    </VStack>
  );
});

export default Title;
