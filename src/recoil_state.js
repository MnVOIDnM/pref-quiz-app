import { atom } from "recoil";

export const isKanaState = atom({
  key: "isKana",
  default: false,
});

export const isStartedState = atom({
  key: "isStarted",
  default: false,
});

export const kanaTypeState = atom({
  key: "kanaType",
  default: "name",
});

export const quizQueueState = atom({
  key: "quizQueue",
  default: [],
});

export const isTimerRunningState = atom({
  key: "isTimerRunning",
  default: false,
});
