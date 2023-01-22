import { prefData } from "./prefData";

const shuffle = ([...arr]) => {
  for (let i = arr.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const createQuiz = () => {
  const quizChoices = [];
  const answerRow = shuffle(prefData);

  for (let i = 0; i < 47; i++) {
    let choices = [];
    const answer = answerRow[i];
    const restData = answerRow.filter((_, index) => index !== i);

    const dummyData = shuffle(restData);
    const dummyChoices = dummyData.slice(0, 3);

    dummyChoices.forEach((choice) => {
      choices.push(choice);
    });
    choices.push(answer);
    quizChoices.push(shuffle(choices));
  }
  const queue = {
    choices: quizChoices,
    answer: answerRow,
  };
  console.log("createQuiz excuted");
  return queue;
};
