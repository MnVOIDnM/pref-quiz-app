import { useState, useEffect, useReducer } from "react";
import { Center } from "@chakra-ui/react";
import Title from "./Title";
import Quiz from "./Quiz";
import { createQuiz } from "../helpers";
import {
  collection,
  orderBy,
  query,
  limit,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isStartedState, quizQueueState } from "../recoil_state";

function App() {
  const isStarted = useRecoilValue(isStartedState);
  const setQuizQueue = useSetRecoilState(quizQueueState);
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const initQuizState = {
    quizType: "",
    quizSize: 0,
  };
  const modeReducer = (state, action) => {
    switch (action) {
      case "single10":
        return { ...state, quizType: "imgSingle", quizSize: 10 };
      case "single47":
        return { ...state, quizType: "imgSingle", quizSize: 47 };
      case "country10":
        return { ...state, quizType: "imgCountry", quizSize: 10 };
      case "country47":
        return { ...state, quizType: "imgCountry", quizSize: 47 };
      default:
        return state;
    }
  };
  const [quizState, dispatch] = useReducer(modeReducer, initQuizState);

  useEffect(() => {
    setQuizQueue(createQuiz());
  }, []);

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "ranking"),
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
        console.log("unsub");
      },
      (err) => {
        console.error(err);
      }
    );
    return () => unsub();
  }, []);

  return (
    <Center>
      {isStarted ? (
        <Quiz quizState={quizState} userData={userData} />
      ) : (
        <Title dispatch={dispatch} isAuthState={[isAuth, setIsAuth]} />
      )}
    </Center>
  );
}

export default App;
