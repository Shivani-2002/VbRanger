import { Button, Flex, HStack, Image } from "@chakra-ui/react";
import React from "react";

import Blog from '../images/blog.png';
import { FcGoogle } from "react-icons/fc";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { firebaseApp } from "../firebase-config";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const firebaseAuth = getAuth(firebaseApp);
  const provider = new GoogleAuthProvider();
  const firebaseDb = getFirestore(firebaseApp);
 
  const navigate = useNavigate();

  const login = async () => {
    const {user} = await signInWithPopup(firebaseAuth, provider);
    const {refreshToken ,providerData} = user;
    //console.log(refreshToken , providerData);
    
    //push all these details to the local storage once the user has successfully logged in
    //Developer Tools -> Application -> Local storage -> localhost
    localStorage.setItem('user' , JSON.stringify(providerData));
    localStorage.setItem('accessToken',JSON.stringify(refreshToken));

    await setDoc(
      doc(firebaseDb, 'users', providerData[0].uid), 
      providerData[0]
      );

      //push the user to the home screen
      navigate('/',{replace:true});
  };

  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      width={"100vw"}
      height={"100vh"}
      position={"relative"}
    >
      <Image src={Blog} objectFit="contain" width={"full"} height={"full"} />
      <Flex
        position={"absolute"}
        width={"100vw"}
        height={"100vh"}
        bg={"blackAlpha.600"}
        top={0}
        left={0}
        justifyContent="center"
        alignItems={"center"}
      >
        <HStack>
          <Button
            leftIcon={<FcGoogle fontSize={25} />}
            colorScheme="whiteAlpha"
            shadow={"lg"}
            onClick={() => login()}
            color="#f1f1f1"
          >
            Signin with Google
          </Button>
        </HStack>
      </Flex>
    </Flex>
  );
};

export default Login;