import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Button,
  HStack,
  Box,
  VStack,
} from "@chakra-ui/react";
import {
  collection,
  orderBy,
  query,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";
import HomeButton from "./HomeButton";
import RankingTable from "./RankingTable";
import ScoreGrid from "./ScoreGrid";
import RankRegistrationForm from "./RankRegistrationForm";
import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { isAuthState, userIdState } from "../../recoil_state";

const ResultModal = ({
  disclosure,
  repeatQuiz,
  score,
  time,
  incorrectCount,
  quizState,
}) => {
  const { isOpen, onClose } = disclosure;
  const isAuth = useRecoilValue(isAuthState);
  const userId = useRecoilValue(userIdState);
  const [userData, setUserData] = useState([]);
  const [currentUserData, setCurrentUserData] = useState({});

  useEffect(() => {
    const q = query(
      collection(db, quizState.currentMode),
      orderBy("score", "desc"),
      limit(20)
    );
    const unsub = onSnapshot(
      q,
      (querySnapshot) => {
        const dataWithID = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setUserData(dataWithID);
      },
      (err) => {
        console.error(err);
      }
    );
    const filteredUserData = userData.filter((user) => user.id == userId);
    setCurrentUserData(filteredUserData);
    console.log(userData[0].id);
    return () => unsub();
  }, []);

  const isBestScore = score > currentUserData.score;

  return (
    <Modal
      scrollBehavior="inside"
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent minW="800px" minH="50vh">
        <ModalBody>
          <HStack>
            <ScoreGrid
              score={score}
              incorrectCount={incorrectCount}
              time={time}
            />
            <RankingTable userData={userData} />
          </HStack>
        </ModalBody>
        <ModalFooter>
          <VStack>
            {isAuth && isBestScore && (
              <RankRegistrationForm quizState={quizState} score={score} />
            )}
            <Box>
              <HomeButton m={3} />
              <Button
                m={3}
                px={1}
                variant="outline"
                onClick={() => {
                  onClose();
                  repeatQuiz();
                }}
              >
                もう一度する
              </Button>
            </Box>
          </VStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ResultModal;
