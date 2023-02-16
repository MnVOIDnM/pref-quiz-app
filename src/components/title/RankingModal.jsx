import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Button,
} from "@chakra-ui/react";
import RankingTable from "../quiz/RankingTable";

const RankingModal = ({ disclosure }) => {
  const { isOpen, onClose } = disclosure;

  return (
    <Modal scrollBehavior="inside" isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent minW="350px" minH="50vh">
        <ModalBody>
          <RankingTable />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RankingModal;
