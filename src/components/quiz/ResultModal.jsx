import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import HomeButton from "./HomeButton";

const ResultModal = ({ disclosure, repeatQuiz, userData }) => {
  const { isOpen, onClose } = disclosure;

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th isNumeric>No.</Th>
                  <Th>ニックネーム</Th>
                  <Th isNumeric>スコア</Th>
                </Tr>
              </Thead>
              <Tbody>
                {userData.map((user, index) => (
                  <Tr key={user.id}>
                    <Td>{index + 1}</Td>
                    <Td>{user.name}</Td>
                    <Td isNumeric>{user.score}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </ModalBody>
        <ModalFooter>
          <HomeButton m={3} />
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
