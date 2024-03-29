import {
  Heading,
  VStack,
  HStack,
  Image,
  Switch,
  FormLabel,
  FormControl,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import coverImage from "../images/japanIllust.png";
import ModeSelectButton from "../components/title/ModeSelectButton";
import { useRecoilState, useSetRecoilState } from "recoil";
import { isKanaState, kanaTypeState, userDataState } from "../recoil_state";
import RankingModal from "../components/title/RankingModal";
import { collection, orderBy, query, limit, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Title = React.memo(({ dispatch, quizState }) => {
  const [isKana, setIsKana] = useRecoilState(isKanaState);
  const setKanaType = useSetRecoilState(kanaTypeState);
  const setUserData = useSetRecoilState(userDataState);

  const { isOpen, onOpen, onClose } = useDisclosure();
  // useEffect(() => {
  //   console.log("called just once");
  // }, []);

  const q = query(
    collection(db, quizState.currentMode),
    orderBy("score", "desc"),
    limit(1)
  );
  const getRanking = async (query) => {
    const querySnapshot = await getDocs(query);
    const dataWithID = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setUserData(dataWithID);
  };

  const onClickRanking = () => {
    getRanking(q);
    onOpen();
  };

  const onChange = () => {
    setIsKana((prev) => !prev);
    if (isKana) {
      setKanaType("name");
    } else {
      setKanaType("nameKana");
    }
  };

  return (
    <VStack maxW="100vh" maxh="90vh">
      {/* <Header /> */}
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
        <VStack>
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
              onChange={onChange}
            />
          </FormControl>
          <Button colorScheme="red" onClick={onClickRanking}>
            ランキング
          </Button>
          <RankingModal
            disclosure={{ isOpen, onClose }}
            quizState={quizState}
            getRanking={getRanking}
          />
        </VStack>
        <ModeSelectButton dispatch={dispatch} />
      </HStack>
    </VStack>
  );
});

export default Title;
