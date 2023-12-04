// src/components/RoutineInfo.js

import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Text
} from '@chakra-ui/react';

const RoutineInfo = ({ onAddRoutine }) => {
  const [routineName, setRoutineName] = useState('');
  const [routineTime, setRoutineTime] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddRoutine = () => {
    if (routineName === '') {
      setErrorMessage('Cannot add an empty note');
      return;
    }

    const newRoutine = {
      name: routineName,
      time: routineTime,
      isComplete: false,
      nextDisplay: new Date().toISOString() // Set initial display to current time
    };

    onAddRoutine(newRoutine);
    setRoutineName('');
    setRoutineTime('');
    setErrorMessage('');
  };

  return (
    <VStack spacing={4} align="stretch">
      <FormControl>
        <FormLabel>Add a note with a time</FormLabel>
        <Input
          type="text"
          value={routineName}
          onChange={(e) => setRoutineName(e.target.value)}
          placeholder="Enter Note"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Time</FormLabel>
        <Input
          type="time"
          value={routineTime}
          onChange={(e) => setRoutineTime(e.target.value)}
        />
      </FormControl>
      {errorMessage && <Text color='red.500' align={"center"} borderRadius={"lg"}>{errorMessage}</Text>}
      <Button colorScheme="blue" onClick={handleAddRoutine}>
        Add Time Note
      </Button>
    </VStack>
  );
};

export default RoutineInfo;
