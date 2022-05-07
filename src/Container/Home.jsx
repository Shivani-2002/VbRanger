import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import {
  Category,
  Create,
  Navbar,
  Search,
  Videopin,
  Feed,
  VideoPinDetail,
  UserProfile,
} from "../Components";
import { categories } from "../data";

const Home = ({ user }) => {
  //console.log(user);

  return (
    <>
      <Navbar user={user} />
      <Flex width={"100vw"}>
        <Flex
          direction={"column"}
          justifyContent={"start"}
          alignItems={"center"}
          width="8%"
        >
          {/* If there are categories,then map */}
          {categories &&
            categories.map((data) => <Category key={data.id} data={data} />)}
        </Flex>

        <Flex
          width={"95%"}
          px={4}
          justifyContent="center"
          alignItems={"center"}
        >
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/category/:categoryId" element={<Feed />} />
            <Route path="/create" element={<Create />} />
            <Route path="/videoDetail/:videoId" element={<VideoPinDetail />} />
            <Route path="/search" element={<Search />} />
            <Route path="/userDetail/:userId" element={<UserProfile />} />
          </Routes>
        </Flex>
      </Flex>
    </>
  );
};

export default Home;
