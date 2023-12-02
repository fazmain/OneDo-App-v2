import React, { useState, useEffect } from "react";
import { Grid, GridItem, Box, VStack, Button, Text } from "@chakra-ui/react";
import Greeting from "./components/Greeting";
import TaskInfo from "./components/TaskInfo";
import Tasks from "./components/Tasks";
import CompletedTasks from "./components/CompletedTasks";
import Routines from "./components/Routines";
import RoutineInfo from "./components/RoutineInfo";

const priorityLevels = {
  Urgent: 1,
  Moderate: 2,
  Chill: 3,
};

function App() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [username, setUsername] = useState("");

  const [routines, setRoutines] = useState([]);

  const addRoutine = (newRoutine) => {
    const updatedRoutines = [...routines, newRoutine];
    setRoutines(updatedRoutines);
    localStorage.setItem("routines", JSON.stringify(updatedRoutines));
  };

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);

    const storedCompletedTasks =
      JSON.parse(localStorage.getItem("completedTasks")) || [];
    setCompletedTasks(storedCompletedTasks);

    const storedRoutines = JSON.parse(localStorage.getItem("routines")) || [];
    setRoutines(storedRoutines);

    askForUsername();
  }, []);

  const askForUsername = () => {
    let storedUsername = localStorage.getItem("username");

    if (!storedUsername) {
      storedUsername = window.prompt("Hey there! Please Enter your name.");
      localStorage.setItem("username", storedUsername);
    }
    setUsername(storedUsername);
  };

  const addTask = (newTask) => {
    const updatedTasks = sortTasks([
      ...tasks,
      {
        ...newTask,
        isComplete: false,
        subtasks: newTask.subtasks.map((subtask) => ({
          name: subtask,
          isComplete: false,
        })),
      },
    ]);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const deleteRoutine = (index) => {
    const updatedRoutines = routines.filter((_, i) => i !== index);
    setRoutines(updatedRoutines);
    localStorage.setItem("routines", JSON.stringify(updatedRoutines));
  };

  const sortTasks = (tasks) => {
    return tasks.sort(
      (a, b) => priorityLevels[a.priority] - priorityLevels[b.priority]
    );
  };

  const handleTaskComplete = (taskName, isComplete) => {
    const updatedTasks = tasks.map((task) => {
      if (task.name === taskName) {
        return { ...task, isComplete };
      }
      return task;
    });

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Update local storage

    if (isComplete) {
      const completedTask = updatedTasks.find((task) => task.name === taskName);
      const updatedCompletedTasks = [...completedTasks, completedTask];
      setCompletedTasks(updatedCompletedTasks);
      localStorage.setItem(
        "completedTasks",
        JSON.stringify(updatedCompletedTasks)
      ); // Save completed tasks
    } else {
      const updatedCompletedTasks = completedTasks.filter(
        (task) => task.name !== taskName
      );
      setCompletedTasks(updatedCompletedTasks);
      localStorage.setItem(
        "completedTasks",
        JSON.stringify(updatedCompletedTasks)
      ); // Update completed tasks
    }
  };
  const clearCompletedTasks = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to clear all completed tasks? This action cannot be undone."
    );

    if (isConfirmed) {
      setCompletedTasks([]);
      localStorage.removeItem("completedTasks"); // Clear from local storage
    }
  };
  const handleSubtaskComplete = (taskName, subtaskIndex, isComplete) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.name === taskName) {
          const updatedSubtasks = task.subtasks.map((subtask, index) => {
            if (index === subtaskIndex) {
              return { ...subtask, isComplete };
            }
            return subtask;
          });

          const isTaskComplete = updatedSubtasks.every(
            (subtask) => subtask.isComplete
          );
          if (isTaskComplete) {
            setCompletedTasks((prevCompleted) => [
              ...prevCompleted,
              { ...task, subtasks: updatedSubtasks },
            ]);
          }
          return {
            ...task,
            subtasks: updatedSubtasks,
            isComplete: isTaskComplete,
          };
        }
        return task;
      })
    );
  };

  return (
    <Box p={{ base: 4, md: 8, lg: 50 }}>
      <Grid
        templateRows={{ base: "repeat(3, 1fr)", md: "repeat(2, 1fr)" }}
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(5, 1fr)" }}
        gap={4}
      >
        <GridItem colSpan={{ base: 1, md: 1 }}>
          <VStack spacing={4} align="stretch">
            <Greeting username={username} />
            <TaskInfo onSubmit={addTask} />
            <RoutineInfo onAddRoutine={addRoutine} />
          </VStack>
        </GridItem>
        <GridItem colSpan={{ base: 1, md: 2 }} colStart={{ lg: 2 }}>
          <Tasks
            tasks={tasks}
            onTaskComplete={handleTaskComplete}
            onSubtaskComplete={handleSubtaskComplete}
          />
        </GridItem>
        <GridItem colSpan={{ base: 1, md: 2 }} colStart={{ lg: 4 }}>
          {routines.length > 0 ? (
            <Routines routines={routines} onDeleteRoutine={deleteRoutine} />
          ) : null}
          {completedTasks.length > 0 ? (
            <CompletedTasks tasks={completedTasks} />
          ) : null}
          {completedTasks.length > 0 ?
          <Button mt={4} color="red.400" onClick={clearCompletedTasks}>
            Clear
          </Button>
          : null }
        </GridItem>
      </Grid>
    </Box>
  );
}

export default App;
