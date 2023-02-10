import React, { useRef, useState } from "react";
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
  HStack,
  Grid,
  GridItem,
  Heading,
  Text,
  Input,
  Box,
  VStack,
} from "@chakra-ui/react";
import HomeButton from "./HomeButton";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";

const ResultModal = ({
  disclosure,
  repeatQuiz,
  userData,
  score,
  time,
  incorrectCount,
}) => {
  const { isOpen, onClose } = disclosure;
  const [nickname, setNickname] = useState("");

  const registerRank = (e) => {
    e.preventDefault();
    try {
      const docRef = collection(db, "ranking");
      addDoc(docRef, {
        name: nickname,
        score: score,
      });
    } catch (err) {
      console.log(err);
    }
    setNickname("");
  };

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
            <Grid
              h="160px"
              w="280px"
              m={3}
              mt={20}
              mr={20}
              border="1px solid #ababab"
              borderRadius={10}
              templateRows="repeat(5, 1fr)"
              templateColumns="repeat(2, 1fr)"
            >
              <GridItem
                rowSpan={3}
                colSpan={2}
                borderBottom="1px solid #ababab"
              >
                <Heading textAlign="center">スコア</Heading>
                <Text fontSize="4xl" textAlign="center">
                  {score}
                </Text>
              </GridItem>
              <GridItem rowSpan={2} colSpan={1} borderRight="1px solid #ababab">
                <Heading size="md" textAlign="center">
                  はやさ
                </Heading>
                <Text fontSize="2xl" textAlign="center">
                  {`${time / 1000}s`}
                </Text>
              </GridItem>
              <GridItem rowSpan={2} colSpan={1}>
                <Heading size="md" textAlign="center">
                  まちがえた数
                </Heading>
                <Text fontSize="2xl" textAlign="center">
                  {incorrectCount}
                </Text>
              </GridItem>
            </Grid>
            <TableContainer maxH="400px" minW="350px" overflowY="auto">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th isNumeric>No.</Th>
                    <Th>名前</Th>
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
          </HStack>
        </ModalBody>
        <ModalFooter>
          <VStack>
            <Box>
              <Input
                placeholder="ニックネーム"
                value={nickname}
                type="text"
                onChange={(e) => setNickname(e.target.value)}
              />
              <Button onClick={registerRank}>とうろく</Button>
            </Box>
            <Box>
              <HomeButton m={3} />
              <Button m={3} px={1} colorScheme="red">
                ランキング登録
              </Button>
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
