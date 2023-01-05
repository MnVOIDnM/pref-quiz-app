import { Heading } from "@chakra-ui/react";

const Stopwatch = ({ useStopwatchState }) => {
  const { seconds, minutes } = useStopwatchState;

  return (
    <Heading p={8} size="4xl">
      {`00${minutes}`.slice(-2)}:{`00${seconds}`.slice(-2)}
    </Heading>
  );
};

export default Stopwatch;