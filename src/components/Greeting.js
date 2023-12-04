import React, { useState, useEffect } from "react";
import { VStack, Heading, Text, Box } from "@chakra-ui/react";

const Greeting = ({ username }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update time every second

    return () => clearInterval(timer); // Clean up the interval on component unmount
  }, []);

  const formatDay = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <Box p = {3} borderRadius={"lg"} bg="blue.900">
    <VStack
      align="flex-start"
      width="100%"
      maxWidth="400px" // adjust as needed for your layout
    >
      <Box>
        <Heading>{formatTime(currentTime)}</Heading>
      </Box>
      <Heading size="lg">Hello, {username}</Heading>
      <Heading size="md">{formatDay(currentTime)}</Heading>
      <Text size="md">{formatDate(currentTime)}</Text>
    </VStack>
    </Box>
  );
};

export default Greeting;
