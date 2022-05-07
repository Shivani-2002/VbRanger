import {
  Box,
  Flex,
  Tooltip,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Category = ({ data }) => {
  const { colorMode } = useColorMode();
  const bg = useColorModeValue("gray.600", "gray.300");

  return (
    <Flex cursor={"pointer"} my="5">
      {/* data.name comes from the categories in data.js */}
      <Link to={`/category/${data.name}`}>
        <Tooltip
          hasArrow
          placement="right"
          arrowSize={6}
          label={data.name}
          bg={bg}
        >
          {/* Box is nothing but a dvision */}
          <Box>{data.iconSrc}</Box>
        </Tooltip>
      </Link>
    </Flex>
  );
};

export default Category;
