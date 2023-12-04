// src/components/RoutineInfo.js

import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
} from '@chakra-ui/react';

const RoutineInfo = ({ onAddRoutine }) => {
  const [routineName, setRoutineName] = useState('');
  const [routineTime, setRoutineTime] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddRoutine = () => {
    if (routineName === '' || routineTime === '') {
      setErrorMessage('Cannot add an empty routine');
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
      {errorMessage && <p>{errorMessage}</p>}
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
      <Button colorScheme="blue" onClick={handleAddRoutine}>
        Add Time Note
      </Button>
    </VStack>
  );
};

export default RoutineInfo;
