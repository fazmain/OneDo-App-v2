// src/components/TaskInfo.js

import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  HStack,
  IconButton,
  useToast,
  Text,
  Select,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

const TaskInfo = ({ onSubmit }) => {
  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [subtasks, setSubtasks] = useState([]);
  const [subtask, setSubtask] = useState("");
  const [priority, setPriority] = useState("Moderate"); // Default priority

  const toast = useToast();

  const addSubtask = () => {
    if (!subtask.trim()) {
      toast({
        title: "Subtask can't be empty",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setSubtasks([...subtasks, subtask]);
    setSubtask("");
  };

  const removeSubtask = (index) => {
    setSubtasks(subtasks.filter((_, subtaskIndex) => subtaskIndex !== index));
  };

  const handleSubmit = () => {
    if (!taskName.trim()) return;

    const newTask = {
      name: taskName,
      dueDate: dueDate,
      priority: priority,
      subtasks: subtasks,
      isComplete: false,
    };

    onSubmit(newTask);
    setTaskName("");
    setDueDate("");
    setPriority("Moderate");
    setSubtasks([]);
  };
  return (
    <VStack spacing={4} align="stretch">
      <FormControl>
        <Input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Enter task name"
        />
      </FormControl>
    <FormControl id="priority">
        <Select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
        >
            <option value="Urgent">Urgent</option>
            <option value="Moderate">Moderate</option>
            <option value="Chill">Chill</option>
        </Select>
    </FormControl>
      <FormControl>
        
        <Input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <HStack>
          <Input
            type="text"
            value={subtask}
            onChange={(e) => setSubtask(e.target.value)}
            placeholder="Enter Subtasks"
          />
          <Button onClick={addSubtask}>Add</Button>
        </HStack>
        <VStack mt={2}>
          {subtasks.map((subtask, index) => (
            <HStack key={index} justifyContent="space-between">
              <Text>{subtask}</Text>
              <IconButton
                aria-label="Remove subtask"
                icon={<CloseIcon />}
                onClick={() => removeSubtask(index)}
              />
            </HStack>
          ))}
        </VStack>
      </FormControl>

      <Button colorScheme="cyan" onClick={handleSubmit}>
        Add Task
      </Button>
    </VStack>
  );
};

export default TaskInfo;
