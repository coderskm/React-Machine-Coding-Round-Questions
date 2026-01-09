import React, { useEffect, useState } from "react";

function ToDoList() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("to-do-tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  }); // Array to hold tasks
  const [newTask, setNewTask] = useState(""); // New task input

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  useEffect(() => {
    localStorage.setItem("to-do-tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask() {
    if (newTask.trim().length !== 0) {
      setTasks((oldTasks) => [...oldTasks, newTask]);
      setNewTask("");
    }
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function moveTaskUp(taskIndex) {
    if (taskIndex > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[taskIndex], updatedTasks[taskIndex - 1]] = [updatedTasks[taskIndex - 1], updatedTasks[taskIndex]];
      setTasks(updatedTasks);
    }
  }
  function moveTaskDown(taskIndex) {
    if (taskIndex < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[taskIndex], updatedTasks[taskIndex + 1]] = [updatedTasks[taskIndex + 1], updatedTasks[taskIndex]];
      setTasks(updatedTasks);
    }
  }
  return (
    <div className="to-do-list">
      <h1>REACT TODO LIST APP</h1>
      <div>
        <input type="text" placeholder="Enter a task..." value={newTask} onChange={handleInputChange} />
        <button className="add-button" onClick={addTask}>
          Add
        </button>
      </div>
      <ol>
        {tasks.map((task, index) => (
          <li className="task-list" key={index}>
            <span className="text">{task}</span>
            <div className="button-container">
              <button className="delete-button" onClick={() => deleteTask(index)}>
                Delete
              </button>
              <button className="move-button" onClick={() => moveTaskUp(index)}>
                👆
              </button>
              <button className="move-button" onClick={() => moveTaskDown(index)}>
                👇
              </button>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ToDoList;
