import { SimpleGrid } from "@chakra-ui/react";
import React from "react";
import Videopin from "./Videopin";

const RecommendedVideos = ({ feeds }) => {
  return (
    <SimpleGrid
      minChildWidth={"300px"}
      spacing="15px"
      width={"full"}
      autoColumns={"max-content"}
      px="2"
      overflow={"hidden"}
    >
      {feeds &&
        feeds.map((data) => (
          <Videopin key={data.id} maxWidth={420} height="80px" data={data} />
        ))}
    </SimpleGrid>
  );
};
export default RecommendedVideos;
