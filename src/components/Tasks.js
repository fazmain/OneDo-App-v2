// src/components/Tasks.js

import React from "react";
import { VStack, Box, Heading } from "@chakra-ui/react";
import TaskItem from "./TaskItem";

const Tasks = ({ tasks, onTaskComplete, onSubtaskComplete }) => {
  return (
    <Box
      maxH="700px" 
      overflowY="scroll"
      w="100%"
      p={4}
      bg="gray.700"
      borderRadius="lg"
      boxShadow="md"
    >
      <Heading size="lg" pb={4}>
        Tasks
      </Heading>
      <VStack spacing={4}>
        {tasks
          .filter((task) => !task.isComplete)
          .map((task, index) => (
            <TaskItem
              key={index}
              task={task}
              onTaskComplete={onTaskComplete}
              onSubtaskComplete={onSubtaskComplete}
            />
          ))}
      </VStack>
    </Box>
  );
};

export default Tasks;
