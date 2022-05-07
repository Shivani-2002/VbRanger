import {
  Flex,
  Image,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { getFirestore } from "firebase/firestore";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { firebaseApp } from "../firebase-config";
import { getUserInfo } from "../utils/fetchData";

const Videopin = ({ data }) => {
  const { colorMode } = useColorMode();
  const bg = useColorModeValue("gray.600", "gray.900");
  const textColor = useColorModeValue("gray.100", "gray.100");

  const firestoreDb = getFirestore(firebaseApp);

  const [userInfo, setUserInfo] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (data) setUserId(data.userId);
    if (userId)
      getUserInfo(firestoreDb, userId).then((data) => {
        setUserInfo(data);
      });
  }, [userId]);

  return (
    <Flex
      justifyContent={"space-between"}
      alignItems="center"
      direction={"column"}
      cursor="pointer"
      shadow={"lg"}
      _hover={{ shadow: "x1" }}
      rounded="md"
      overflow={"hidden"}
      maxWidth={"300px"}
    >
      <Link to={`/videoDetail/${data?.id}`}>
        <video
          src={data.videoUrl}
          muted
          onMouseOver={(e) => e.target.play()}
          onMouseOut={(e) => e.target.pause()}
        />
      </Link>

      <Flex
        position={"relative"}
        bottom="0"
        left="0"
        p={2}
        bg={bg}
        width="full"
        direction={"column"}
      >
        <Flex
          width={"full"}
          justifyContent="space-between"
          alignItems={"center"}
        >
          {/* isTruncated: If the length of the title is too long, then it will automatically add dots at the end */}
          <Text color={textColor} isTruncated fontSize={20}>
            {data.title}
          </Text>
          <Link to={`/userDetail/${userId}`}>
            <Image
              src={userInfo?.photoURL}
              rounded="full"
              width={"50px"}
              height="50px"
              border={"2px"}
              borderColor={bg}
              mt={-10}
              minHeight={"50px"}
              minWidth={"50px"}
            />
          </Link>
        </Flex>

        <Text fontSize={12} color={textColor} ml="auto">
          {moment(new Date(parseInt(data.id)).toISOString()).fromNow()}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Videopin;