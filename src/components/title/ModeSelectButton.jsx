import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  Center,
  Box,
  Image,
  Heading,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";
import singleImage from "../../images/hokkaidoSingle.png";
import countryImage from "../../images/hokkaidoCountry.png";

const ModeSelectButton = React.memo(({ dispatch }) => {
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
    <>
      <Center p={1}>
        <Popover>
          <PopoverTrigger>
            <Box
              align="center"
              w="120px"
              rounded="md"
              boxShadow="dark-lg"
              p={1}
            >
              <Image w="80px" h="80px" src={countryImage} alt="country mode" />
              <Heading align="center" fontSize="sm">
                かんたん
              </Heading>
            </Box>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverHeader>日本全体が表示されるよ</PopoverHeader>
            <PopoverBody>
              <ButtonGroup gap="2">
                <Button onClick={countryMode10}>１０問</Button>
                <Button onClick={countryMode47}>４７問</Button>
              </ButtonGroup>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Center>
      <Center p={1}>
        <Popover>
          <PopoverTrigger>
            <Box
              align="center"
              w="120px"
              rounded="md"
              boxShadow="dark-lg"
              p={1}
            >
              <Image w="80px" h="80px" src={singleImage} alt="single mode" />
              <Heading align="center" fontSize="sm">
                むずかしい
              </Heading>
            </Box>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverHeader>1つの都道府県だけが表示されるよ</PopoverHeader>
            <PopoverBody>
              <ButtonGroup gap="2">
                <Button onClick={singleMode10}>１０問</Button>
                <Button onClick={singleMode47}>４７問</Button>
              </ButtonGroup>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Center>
    </>
  );
});

export default ModeSelectButton;
