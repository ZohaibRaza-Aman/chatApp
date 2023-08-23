import React from "react";
import { HStack, Avatar, Text } from "@chakra-ui/react";

export const Message = ({ text, uri, user = "other" }) => {
  return (
    <HStack
      alignSelf={user === "me" ? "flex-end" : "flex-start"}
      borderRadius={"base"}
      bg={"red.100"}
      paddingY={2}
      paddingX={user === "me" ? "4" : "2"}
    >
      {user === "other" && <Avatar src={uri} />}
      <Text>{text}</Text>
      {user === "me" && <Avatar src={uri} />}
    </HStack>
  );
};
