import React, { useEffect, useState } from "react";
import { firebaseApp } from "../firebase-config";
import { getFirestore } from "firebase/firestore";
import { categoryFeeds, getAllFeeds } from "../utils/fetchData";
import Spinner from "../Components/Spinner";
import { Box, SimpleGrid } from "@chakra-ui/react";
import Videopin from "./Videopin";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";

const Feed = () => {
  //firestore database instance
  const firestoreDb = getFirestore(firebaseApp);

  const [feeds, setFeeds] = useState(null);
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();

  //renders only one time if nothing in dependency array
  useEffect(() => {
    setLoading(true);
    if (categoryId) {
      categoryFeeds(firestoreDb, categoryId).then((data) => {
        setFeeds(data);
        setLoading(false);
      });
    } else {
      getAllFeeds(firestoreDb).then((data) => {
        setFeeds(data);
        setLoading(false);
      });
    }

    // console.log(feeds);
  }, [categoryId]);

  if (loading) return <Spinner msg={"Loading your feeds"} />;
  if (!feeds?.length > 0) return <NotFound />;
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

export default Feed;
