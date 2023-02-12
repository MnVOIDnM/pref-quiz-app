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
import singleImage from "../../images/iconSingle.png";
import countryImage from "../../images/iconCountry.png";
import { useSetRecoilState } from "recoil";
import { isStartedState, isTimerRunningState } from "../../recoil_state";

const ModeSelectButton = React.memo(({ dispatch }) => {
  const setIsStarted = useSetRecoilState(isStartedState);
  const setIsTimerRunning = useSetRecoilState(isTimerRunningState);

  const startGame = () => {
    setIsStarted(true);
    setIsTimerRunning(true);
  };

  const modeSelect = (mode) => {
    dispatch(mode);
    startGame();
  };

  return (
    <>
      <Center p={1}>
        <Popover placement="top">
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
                全体モード
              </Heading>
            </Box>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverHeader>日本全体が表示されるよ</PopoverHeader>
            <PopoverBody>
              <ButtonGroup gap="2">
                <Button onClick={() => modeSelect("country10")}>１０問</Button>
                <Button onClick={() => modeSelect("country47")}>４７問</Button>
              </ButtonGroup>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Center>
      <Center p={1}>
        <Popover placement="top">
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
                一部モード
              </Heading>
            </Box>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverHeader>1つの都道府県だけが表示されるよ</PopoverHeader>
            <PopoverBody>
              <ButtonGroup gap="2">
                <Button onClick={() => modeSelect("single10")}>１０問</Button>
                <Button onClick={() => modeSelect("single47")}>４７問</Button>
              </ButtonGroup>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Center>
    </>
  );
});

export default ModeSelectButton;
