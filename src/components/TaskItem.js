// src/components/TaskItem.js

import React from "react";
import {
  Box,
  Text,
  VStack,
  Checkbox,
  List,
  ListItem,
  Badge,
  HStack,
} from "@chakra-ui/react";

const TaskItem = ({ task, onTaskComplete, onSubtaskComplete }) => {
  const handleSubtaskCheckbox = (subtaskIndex, isChecked) => {
    onSubtaskComplete(task.name, subtaskIndex, isChecked);
  };

  const getPriorityColorScheme = (priority) => {
    switch (priority) {
      case "Urgent":
        return "red";
      case "Moderate":
        return "orange";
      case "Chill":
        return "green";
      default:
        return "gray";
    }
  };

  const formatDate = (date) => {
    const options = { month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <Box p={4} bg="gray.700" borderWidth = "1px" boxShadow = "lg" borderRadius="lg" width="100%">
      <VStack align="stretch">
        <Checkbox
          isChecked={task.isComplete}
          onChange={(e) => onTaskComplete(task.name, e.target.checked)}
        >
          <HStack>
            <Text fontSize="lg" fontWeight="bold" color="white">
              {task.name}
            </Text>
            {task.dueDate && <Badge bg = "blue.600" p = {1}> Due: {formatDate(task.dueDate)}</Badge>}
            <Badge colorScheme={getPriorityColorScheme(task.priority)}>
              {task.priority}
            </Badge>
          </HStack>
        </Checkbox>
        {/* Render Subtasks */}
        {task.subtasks && task.subtasks.length > 0 && (
          <List spacing={2} pl={5}>
            {task.subtasks.map((subtask, index) => (
              <ListItem key={index}>
                <Checkbox
                  isChecked={subtask.isComplete}
                  onChange={(e) =>
                    handleSubtaskCheckbox(index, e.target.checked)
                  }
                >
                  <Text
                    fontSize="sm"
                    color={subtask.isComplete ? "gray.500" : "white"}
                  >
                    {subtask.name}
                  </Text>
                </Checkbox>
              </ListItem>
            ))}
          </List>
        )}
      </VStack>
    </Box>
  );
};

export default TaskItem;
