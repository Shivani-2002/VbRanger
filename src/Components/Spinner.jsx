import React, { useEffect } from "react";
import { Flex, Progress, Text } from "@chakra-ui/react";
import { Circles } from "react-loader-spinner";

const Spinner = ({ msg, progress }) => {
  //   value should be update frequently
  useEffect(() => {}, [progress]);
  return (
    <Flex
      direction={"column"}
      justifyContent="center"
      alignItems={"center"}
      height="full"
      px={10}
    >
      <Circles color="#00BFFF" height={70} width={70} />
      <Text fontSize={25} textAlign="center" px={2}>
        {msg}
      </Text>
      {progress && (
        <Progress
          mt={50} 
          value={Number.parseInt(progress)}
          size="sm"
          colorScheme={"linkedin"}
          hasStripe
          isAnimated
          rounded="lg"
          width={"lg"}
        />
      )}
    </Flex>
  );
};

export default Spinner;
