import {
  Box,
  Button,
  Heading,
  HStack,
  Spacer,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
} from "@chakra-ui/react";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../firebase";
import React, { useState } from "react";

const Header = ({ isAuthState }) => {
  const [isAuth, setIsAuth] = isAuthState;
  const [userName, setUserName] = useState("");
  const [userIcon, setUserIcon] = useState("");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserName(user.displayName);
      setUserIcon(user.photoURL);
    }
  });

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then(() => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
    });
  };

  const signOutFromGoogle = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
    });
  };

  return (
    <Box w="100%" borderBottom="0.5px solid #ababab">
      <HStack m={1}>
        <Heading size="md">都道府県クイズ</Heading>
        <Spacer />
        {!isAuth ? (
          <Button
            size="sm"
            colorScheme="teal"
            variant="ghost"
            onClick={signInWithGoogle}
          >
            ログイン
          </Button>
        ) : (
          <Flex>
            <Menu>
              <MenuButton>
                <Image
                  borderRadius="full"
                  boxSize="30px"
                  src={userIcon}
                  alt="user icon"
                />
              </MenuButton>
              <MenuList>
                <MenuItem>{userName}さん</MenuItem>
                <MenuItem color="red" onClick={signOutFromGoogle}>
                  ログアウト
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        )}
      </HStack>
    </Box>
  );
};

export default Header;
