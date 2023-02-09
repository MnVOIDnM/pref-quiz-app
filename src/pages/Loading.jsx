import { Button, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Loading = ({ isLoadingState, setIsStarted }) => {
  const [isLoading, setIsLoading] = isLoadingState;
  const [loadedSingle, setLoadedSingle] = useState();

  useEffect(() => {
    const t0 = performance.now();
    const getSingleImage = async () => {
      const single = await import("../images/indexSingle.js");
      console.log(single);
      setIsLoading((flag) => !flag);
    };
    getSingleImage();
    const t1 = performance.now();
    console.log(t1 - t0);
  }, []);

  return (
    <>
      {isLoading ? (
        <Heading>ちょっとまってね</Heading>
      ) : (
        <Button
          onClick={() => {
            setIsStarted((flag) => !flag);
            setIsLoading((flag) => !flag);
          }}
        >
          スタート
        </Button>
      )}
    </>
  );
};

export default Loading;
