// src/components/Routines.js

import React from "react";
import {
  Box,
  Text,
  Heading,
  Checkbox,
} from "@chakra-ui/react";

const Routines = ({ routines, onDeleteRoutine }) => {
  return (
    <Box
      borderRadius="lg"
      maxH="400px"
      overflowY="auto" // Enable vertical scrolling
      w="100%"
      borderWidth={1}
      p={4}
      // CSS for multi-column layout
      columnCount={{ base: 1, md: 2 }} // Adjust column count based on responsiveness
      columnGap="4"
    >
      <Heading size="lg" pb={4}>
        Time Notes
      </Heading>
      {routines.map((routine, index) => (
        <Checkbox
          key={index}
          p={2}
          mr = {2}
          mb = {2}
          colorScheme="cyan"
          borderWidth={1}
          borderColor="cyan.500"
          borderRadius="lg"
          onChange={() => onDeleteRoutine(index)}
        >
          {!routine.time ? (
            <Text fontSize="lg">{routine.name}</Text>
          ) : (
            <Text fontSize="lg">
              {routine.name} at {routine.time}
            </Text>
          )}
        </Checkbox>
      ))}
    </Box>
  );
};

export default Routines;
