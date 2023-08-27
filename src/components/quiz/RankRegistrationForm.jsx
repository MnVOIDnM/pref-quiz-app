import { useEffect, useState } from "react";
import {
  collection,
  setDoc,
  doc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";
import { Input, Button, FormControl, FormErrorMessage } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { userIdState } from "../../recoil_state";

const RankRegistrationForm = ({ quizState, score }) => {
  const [showingRegistrationForm, setShowingRegistrationForm] = useState(true);
  const [nickname, setNickname] = useState("");
  const userId = useRecoilValue(userIdState);

  const isNicknameError = nickname === "";
  const ngWords = ["💩"];
  const [isInappropriateNickname, setIsInappropriateNickname] = useState(false);

  useEffect(() => {
    const checkInappropriateNickname = () => {
      ngWords.forEach((value) => {
        if (nickname.indexOf(value) != -1) {
          setIsInappropriateNickname(true);
        }
      });
    };
    checkInappropriateNickname();
  }, [nickname]);

  const registerRank = (e) => {
    e.preventDefault();
    try {
      // // use signed in user ID
      // const docRef = doc(collection(db, quizState.currentMode), `${userId}`);
      // setDoc(docRef, {
      //   name: nickname,
      //   score: score,
      // });

      // use random ID
      addDoc(collection(db, quizState.currentMode), {
        name: nickname,
        score: score,
        timestamp: serverTimestamp(),
      });
    } catch (err) {
      console.error(err);
    }
    setNickname("");
    setShowingRegistrationForm(false);
  };

  const onChange = (e) => {
    setIsInappropriateNickname(false);
    setNickname(e.target.value);
  };

  return (
    <>
      {showingRegistrationForm && (
        <FormControl isInvalid={isNicknameError || isInappropriateNickname}>
          {isNicknameError && (
            <FormErrorMessage>ニックネームを入れてね</FormErrorMessage>
          )}
          {isInappropriateNickname && (
            <FormErrorMessage>ちがう名前にしてね</FormErrorMessage>
          )}
          <Input
            placeholder="ニックネーム"
            value={nickname}
            type="text"
            maxLength={10}
            onChange={onChange}
          />
          <Button
            colorScheme="red"
            isDisabled={isNicknameError || isInappropriateNickname}
            onClick={registerRank}
          >
            ランキングにとうろく
          </Button>
        </FormControl>
      )}
    </>
  );
};

export default RankRegistrationForm;
