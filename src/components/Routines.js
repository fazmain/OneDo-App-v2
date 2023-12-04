// src/components/Routines.js

import React from "react";
import {
  HStack,
  Box,
  Text,
  Heading,
  IconButtonm,
  Checkbox,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

const Routines = ({ routines, onDeleteRoutine }) => {
  return (
    <Box mt={4} borderRadius={"lg"}>
      <Heading size="lg" pb={4}>
        Time Notes
      </Heading>
      <HStack spacing={4}>
        {routines.map((routine, index) => (
          <Checkbox
            key={index}
            p={3}
            colorScheme="cyan"
            borderWidth={1}
            borderColor={"cyan.500"}
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
      </HStack>
    </Box>
  );
};

export default Routines;
