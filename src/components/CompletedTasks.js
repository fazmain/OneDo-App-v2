// src/components/CompletedTasks.js

import React from "react";
import { VStack, Box, Text, Heading } from "@chakra-ui/react";

const CompletedTaskItem = ({ task }) => {
  return (
    <Box p={2} bg="green.800" borderRadius="lg" boxShadow="md" width="100%">
      <Text as="del" fontSize="lg" color="white">
        {task.name}
      </Text>
    </Box>
  );
};

const CompletedTasks = ({ tasks }) => {
  if (tasks.length === 0) {
    return (
      <Heading size="lg" pb={4}>
        No Completed Tasks
      </Heading>
    );
  }

  return (
    <Box mt={4} borderRadius={"lg"}>
      <Heading size="lg" pb={4}>
        Completed Tasks
      </Heading>
      <VStack spacing={2}>
        {tasks.map((task, index) => (
          <CompletedTaskItem key={index} task={task} />
        ))}
      </VStack>
    </Box>
  );
};

export default CompletedTasks;
