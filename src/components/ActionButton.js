import React from "react";
import { Button } from "@chakra-ui/react";

const ActionButton = ({ text, onClick }) => {
  return (
    <Button
      color="white"
      bg="primary"
      borderRadius="lg"
      boxShadow="base"
      onClick={onClick}
      width="100%"
      maxWidth="200px" // adjust as needed
    >
      {text}
    </Button>
  );
};

export default ActionButton;
