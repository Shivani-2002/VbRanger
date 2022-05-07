import React from "react";
import logo from "../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { IoSearch, IoMoon, IoSunny, IoAdd, IoLogOut } from "react-icons/io5";
import {
  useColorModeValue,
  useColorMode,
  Flex,
  Image,
  InputGroup,
  InputLeftElement,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
const Navbar = ({ user }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("gray.600", "gray.300");
  const navigate = useNavigate();
  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      width={"100vw"}
      p={4} //padding
    >
      <Link to={"/"}>
        <Image src={logo} width={"70px"}></Image>
      </Link>

      <InputGroup mx={6} width="60vw">
        <InputLeftElement
          pointerEvents={"none"}
          children={<IoSearch fontSize={25} />}
        />
        <Input
          type="text"
          placeholder="Search..."
          fontSize={18}
          fontWeight="medium"
          variant={"filled"}
        />
      </InputGroup>

      <Flex justifyContent={"center"} alignItems={"center"}>
        <Flex
          width={"40px"}
          height={"40px"}
          justifyContent={"center"}
          alignItems={"center"}
          cursor={"pointer"}
          borderRadius="5px"
          onClick={toggleColorMode}
        >
          {colorMode === "light" ? (
            <IoMoon fontSize={25} />
          ) : (
            <IoSunny fontSize={25} />
          )}
        </Flex>

        {/* Create button */}
        <Link to={"/create"}>
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            bg={bg}
            width="35px"
            height="35px"
            borderRadius={"50px"}
            mx={6}
            cursor="pointer"
            _hover={{ shadow: "lg" }}
            transition="ease-in-out"
            transitionDuration={"0.3s"}
          >
            <IoAdd
              fontSize={25}
              color={`${colorMode === "dark" ? "#111" : "#f1f1f1"}`}
            />
          </Flex>
        </Link>

        <Menu>
          <MenuButton>
            <Image
              src={user?.photoURL}
              width="40px"
              height="40px"
              rounded="full"
            />
          </MenuButton>
          <MenuList shadow={"lg"}>
            <Link to={`/userDetail/${user?.uid}`}>
              <MenuItem>My Account</MenuItem>
            </Link>
            <MenuItem
              flexDirection={"row"}
              alignItems="center"
              gap={4}
              onClick={() => {
                localStorage.clear();
                navigate("/login", { replace: true });
              }}
            >
              Logout <IoLogOut fontSize={20} />
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default Navbar;
