import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Button,
} from "@chakra-ui/react";
import HomeButton from "./HomeButton";

const ResultModal = ({
  setIsStarted,
  setQuizQueue,
  disclosure,
  repeatQuiz,
}) => {
  const { isOpen, onClose } = disclosure;

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody></ModalBody>
        <ModalFooter>
          <HomeButton
            m={3}
            setIsStarted={setIsStarted}
            setQuizQueue={setQuizQueue}
          />
          <Button
            m={3}
            size="lg"
            variant="outline"
            onClick={() => {
              onClose();
              repeatQuiz();
            }}
          >
            もう一度する
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ResultModal;
