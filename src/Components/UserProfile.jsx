import { Flex, Image } from "@chakra-ui/react";
import { getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firebaseApp } from "../firebase-config";
import Spinner from "./Spinner";
import { getUserInfo, userUploadedVideos } from "../utils/fetchData";
import RecommendedVideos from "./RecommendedVideos";

const randomImage =
  "https://source.unsplash.com/1600x900/?nature,photography,technology";

const UserProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [feeds, setFeeds] = useState(null);
  const fireStoreDb = getFirestore(firebaseApp);

  const { userId } = useParams();
  useEffect(() => {
    setIsLoading(true);
    if (userId) {
      getUserInfo(fireStoreDb, userId).then((user) => {
        setUserInfo(user);
      });
      userUploadedVideos(fireStoreDb, userId).then((feed) => {
        setFeeds(feed);
      });
      setIsLoading(false);
    }
  }, []);

  if (isLoading) return <Spinner />;
  return (
    <Flex
      width={"fill"}
      height="auto"
      alignItems={"center"}
      justifyContent={"center"}
      p={2}
      direction={"column"}
    >
      <Flex
        width={"fill"}
        position={"relative"}
        alignItems={"center"}
        justifyContent={"center"}
        direction={"column"}
      >
        <Image
          src={randomImage}
          height={"320px"}
          width="full"
          objectFit={"cover"}
          borderRadius={"md"}
        />

        <Image
          src={userInfo?.photoURL}
          width="120px"
          objectFit={"cover"}
          borderColor={"gray.100"}
          border="2px"
          rounded={"full"}
          shadow={"lg"}
          mt="-16"
        />
      </Flex>
      {feeds && (
        <Flex direction={"column"} width={"full"} my={6}>
          <RecommendedVideos feeds={feeds} />
        </Flex>
      )}
    </Flex>
  );
};

export default UserProfile;
