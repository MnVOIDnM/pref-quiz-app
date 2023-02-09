import { Heading } from "@chakra-ui/react";

const Stopwatch = ({ useStopwatchState }) => {
  const { seconds, minutes } = useStopwatchState;

  return (
    <Heading fontFamily="monospace" p={8} size={["2xl", "3xl"]}>
      {`0${minutes}`.slice(-2)}:{`0${seconds}`.slice(-2)}
    </Heading>
  );
};

export default Stopwatch;
