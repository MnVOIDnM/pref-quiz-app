import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/react";
import HomeButton from "./HomeButton";

const ResultModal = ({ setIsStarted, setQuizQueue, disclosure }) => {
  const { isOpen, onClose } = disclosure;
  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody></ModalBody>
        <ModalFooter>
          <HomeButton setIsStarted={setIsStarted} setQuizQueue={setQuizQueue} />
          {/* <Button size="lg" variant="outline" onClick={onClose}>
            とじる
          </Button> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ResultModal;
