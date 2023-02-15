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
import HomeButton from "./HomeButton";
import RankingTable from "./RankingTable";
import ScoreGrid from "./ScoreGrid";
import RankRegistrationForm from "./RankRegistrationForm";
import { useRecoilValue } from "recoil";
import { isAuthState } from "../../recoil_state";

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
            <RankingTable />
          </HStack>
        </ModalBody>
        <ModalFooter>
          <VStack>
            {/* {isAuth && (
              <RankRegistrationForm quizState={quizState} score={score} />
            )} */}
            <RankRegistrationForm quizState={quizState} score={score} />
            <Box>
              <HomeButton m={3} />
              <Button m={3} px={1} variant="outline" onClick={repeatQuiz}>
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
