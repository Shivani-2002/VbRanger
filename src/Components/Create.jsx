import {
  Button,
  Box,
  Flex,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState, useRef } from "react";
import {
  IoChevronDown,
  IoLocation,
  IoCloudUpload,
  IoTrash,
  IoCheckmark,
  IoWarning,
} from "react-icons/io5";
import { categories } from "../data";
import AlertMsg from "./AlertMsg";
import Spinner from "./Spinner";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { firebaseApp } from "../firebase-config";
import { Editor } from "@tinymce/tinymce-react";
import { fetchUserInfo } from "../utils/fetchUser";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const { colorMode } = useColorMode();
  const bg = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.900", "gray.50");

  const editorRef = useRef(null);

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("Choose a category");
  const [videoAsset, setVideoAsset] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(1);

  const [alert, setAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const [alertIcon, setAlertIcon] = useState(null);

  const [description, setDescription] = useState("");

  const [userInfo] = fetchUserInfo();
  const navigate = useNavigate();

  //get the firebase storage access
  const storage = getStorage(firebaseApp);
  const firebaseDb = getFirestore(firebaseApp);

  const uploadImage = (e) => {
    setLoading(true);
    const videoFile = e.target.files[0];
    const storageRef = ref(storage, `Videos/${Date.now()}-${videoFile.name}`);

    const uploadTask = uploadBytesResumable(storageRef, videoFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(uploadProgress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setVideoAsset(downloadURL);
          setLoading(false);
          setAlert(true);
          setAlertStatus("success");
          setAlertIcon(<IoCheckmark fontSize={25} />);
          setAlertMsg("Your video is successfully uploaded");
          setTimeout(() => {
            setAlert(false);
          }, 4000);
        });
      }
    );
  };

  const deleteImage = () => {
    const deleteRef = ref(storage, videoAsset);
    deleteObject(deleteRef)
      .then(() => {
        setVideoAsset(null);
        setAlert(true);
        setAlertStatus("error");
        setAlertIcon(<IoWarning fontSize={25} />);
        setAlertMsg("Your video is successfully removed");
        setTimeout(() => {
          setAlert(false);
        }, 4000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getDescriptionValue = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
      setDescription(editorRef.current.getContent());
    }
  };

  const uploadDetails = async () => {
    try {
      setLoading(true);
      if (!title && !category && !videoAsset) {
        setAlert(true);
        setAlertStatus("error");
        setAlertIcon(<IoWarning fontSize={25} />);
        setAlertMsg("Required fields are missing");
        setTimeout(() => {
          setAlert(false);
        }, 4000);
        setLoading(false);
      } else {
        const data = {
          id: `${Date.now()}`,
          title: title,
          userId: userInfo?.uid,
          category: category,
          location: location,
          videoUrl: videoAsset,
          description: description,
        };

        await setDoc(doc(firebaseDb, "videos", `${Date.now()}`), data);
        setLoading(false);
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, [title, location, description, category]);

  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      width={"full"}
      minHeight="100vh"
      p={10}
    >
      <Flex
        width={"80%"}
        height={"full"}
        border={"1px"}
        borderColor="gray.300"
        borderRadius={"md"}
        p={"4"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={2}
      >
        {alert && (
          <AlertMsg status={alertStatus} msg={alertMsg} icon={alertIcon} />
        )}
        <Input
          variant={"flushed"}
          placeholder="Title"
          focusBorderColor="gray.400"
          isRequired
          errorBorderColor="red"
          type={"text"}
          _placeholder={{ color: "gray.500" }}
          fontSize={20}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Flex
          justifyContent={"space-between"}
          width={"full"}
          alignItems={"center"}
          gap={8}
          my={4}
        >
          <Menu>
            <MenuButton
              width={"full"}
              colorScheme="blue"
              as={Button}
              rightIcon={<IoChevronDown fontSize={25} />}
            >
              {category}
            </MenuButton>
            <MenuList zIndex={101} width={"md"} shadow="xl">
              {categories &&
                categories.map((data) => (
                  <MenuItem
                    key={data.id}
                    _hover={{ bg: "blackAlpha.300" }}
                    fontSize={20}
                    px={4}
                    onClick={() => setCategory(data.name)}
                  >
                    {data.iconSrc}{" "}
                    <Text fontSize={18} ml={4}>
                      {data.name}
                    </Text>
                  </MenuItem>
                ))}
            </MenuList>
          </Menu>

          <InputGroup>
            <InputLeftElement
              pointerEvents={"none"}
              children={
                <IoLocation
                  fontSize={20}
                  color={`${colorMode == "dark" ? "#f1f1f1" : "#111"}`}
                />
              }
            />
            <Input
              variant={"flushed"}
              placeholder="Location"
              focusBorderColor="gray.400"
              isRequired
              errorBorderColor="red"
              type={"text"}
              _placeholder={{ color: "gray.500" }}
              fontSize={20}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </InputGroup>
        </Flex>

        {/* File selection */}
        <Flex
          border={"1px"}
          borderColor="gray.500"
          height={"400px"}
          borderStyle="dashed"
          width={"full"}
          borderRadius={"md"}
          overflow="hidden"
          position={"relative"}
        >
          {!videoAsset ? (
            <FormLabel width={"full"}>
              <Flex
                direction={"column"}
                alignItems={"center"}
                justifyContent="center"
                height="full"
                width="full"
              >
                <Flex
                  direction={"column"}
                  alignItems={"center"}
                  justifyContent="center"
                  height="full"
                  width="full"
                  cursor={"pointer"}
                >
                  {loading ? (
                    <>
                      <Spinner
                        msg={"Uploading you video"}
                        progress={progress}
                      />
                    </>
                  ) : (
                    <>
                      <IoCloudUpload
                        fontSize={50}
                        color={`${
                          colorMode == "dark"
                            ? "rgb(120,200,245)"
                            : "rgb(40,120,255)"
                        }`}
                      />
                      <Text mt={5} fontSize={20} color={textColor}>
                        Click to upload
                      </Text>
                    </>
                  )}
                </Flex>
              </Flex>

              {!loading && (
                <input
                  type={"file"}
                  name="upload-image"
                  onChange={uploadImage}
                  style={{ width: 0, height: 0 }}
                  accept="video/mp4,video/x-m4v,video/*,"
                ></input>
              )}
            </FormLabel>
          ) : (
            <Flex
              alignItems={"center"}
              justifyContent="center"
              height="full"
              width="full"
              bg="black"
              position={"relative"}
            >
              <Flex
                alignItems={"center"}
                justifyContent="center"
                height="40px"
                width="40px"
                rounded={"full"}
                bg="red"
                top={5}
                right={5}
                cursor={"pointer"}
                position={"absolute"}
                zIndex={10}
                onClick={deleteImage}
              >
                <IoTrash fontSize={20} color="white" />
              </Flex>
              <video
                src={videoAsset}
                controls
                style={{ width: "100%", height: "100%" }}
              />
            </Flex>
          )}
        </Flex>

        <Editor
          onChange={getDescriptionValue}
          onInit={(evt, editor) => (editorRef.current = editor)}
          apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
          init={{
            height: 500,
            width: "100%",
            menubar: false,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
              "undo redo | formatselect | " +
              "bold italic backcolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            content_css: "dark",
            skin: "oxide-dark",
          }}
        />
        <Button
          isLoading={loading}
          loadingText="Uploading"
          colorScheme={"linkedin"}
          variant={`${loading ? "outline" : "solid"}`}
          width={"s"}
          _hover={{ shadow: "lg" }}
          fontSize={20}
          onClick={() => uploadDetails()}
        >
          Upload
        </Button>
      </Flex>
    </Flex>
  );
};

export default Create;
