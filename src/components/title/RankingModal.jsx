import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalFooter,
  ModalBody,
  Button,
  Select,
} from "@chakra-ui/react";
import RankingTable from "../quiz/RankingTable";
import { collection, limit, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";

const RankingModal = ({ disclosure, quizState, getRanking }) => {
  const { isOpen, onClose } = disclosure;
  const [selected, setSelected] = useState("country10");

  const onChangeSelect = (e) => {
    setSelected(e.target.value);
  };

  useEffect(() => {
    const q = query(
      collection(db, selected),
      orderBy("score", "desc"),
      limit(1)
    );
    getRanking(q);
  }, [selected]);

  return (
    <Modal scrollBehavior="inside" isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent minW="350px" minH="50vh">
        <ModalHeader textAlign="center">
          ランキング-{quizState.displayName}-
        </ModalHeader>
        <ModalBody>
          <RankingTable />
        </ModalBody>
        <ModalFooter>
          <Select value={selected} onChange={onChangeSelect}>
            <option value="country10">全体モード(10問)</option>
            <option value="country47">全体モード(47問)</option>
            <option value="single10">一部モード(10問)</option>
            <option value="single47">一部モード(47問)</option>
          </Select>
          <Button colorScheme="blue" mx={2} onClick={onClose}>
            閉じる
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RankingModal;
