import { useState } from "react";
import { collection, setDoc, doc, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Input, Button, FormControl, FormErrorMessage } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { userIdState } from "../../recoil_state";

const RankRegistrationForm = ({ quizState, score }) => {
  const [showingRegistrationForm, setShowingRegistrationForm] = useState(true);
  const [nickname, setNickname] = useState("");
  // const userId = useRecoilValue(userIdState);

  const isNicknameError = nickname === "";

  const registerRank = (e) => {
    e.preventDefault();
    try {
      // use signed in user ID
      // const docRef = doc(collection(db, quizState.currentMode), `${userId}`);
      // setDoc(docRef, {
      //   name: nickname,
      //   score: score,
      // });

      // use random ID
      addDoc(collection(db, quizState.currentMode), {
        name: nickname,
        score: score,
      });
    } catch (err) {
      console.error(err);
    }
    setNickname("");
    setShowingRegistrationForm(false);
  };

  return (
    <>
      {showingRegistrationForm && (
        <FormControl isInvalid={isNicknameError}>
          {isNicknameError && (
            <FormErrorMessage>ニックネームを入れてね</FormErrorMessage>
          )}
          <Input
            placeholder="ニックネーム"
            value={nickname}
            type="text"
            maxLength={10}
            onChange={(e) => setNickname(e.target.value)}
          />
          <Button
            colorScheme="red"
            isDisabled={isNicknameError}
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
