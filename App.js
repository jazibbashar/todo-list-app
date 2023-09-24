import React, { useState, useEffect } from 'react';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import { format } from 'date-fns';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [editingDescription, setEditingDescription] = useState('');
  const [completedTasks, setCompletedTasks] = useState([]);

  // Function to format the current date and time
  const formatCurrentDate = () => {
    return format(new Date(), "dd/MM/yyyy, hh:mma");
  };

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []); // Empty dependency array ensures this runs only once on mount

  // Save tasks to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  const addTask = () => {
    if (inputValue === '') {
      alert('Please enter a task');
      return;
    }

    const newTask = {
      id: Date.now(),
      name: inputValue,
      description: '',
      completed: false,
      createdOn: formatCurrentDate(),
    };

    setTasks([...tasks, newTask]);
    setInputValue('');
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const openEditModal = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    if (taskToEdit) {
      setIsEditing(true);
      setEditingTask(taskId);
      setEditingName(taskToEdit.name);
      setEditingDescription(taskToEdit.description || '');
    }
  };

  const closeEditModal = () => {
    setIsEditing(false);
    setEditingTask(null);
    setEditingName('');
    setEditingDescription('');
  };

  const saveTask = () => {
    if (editingTask === null) return;

    const updatedTasks = tasks.map((task) =>
      task.id === editingTask
        ? { ...task, name: editingName, description: editingDescription }
        : task
    );

    setTasks(updatedTasks);
    closeEditModal();
  };

  const markTaskCompleted = (taskId) => {
    const taskToComplete = tasks.find((task) => task.id === taskId);
    if (taskToComplete) {
      const completedDate = format(new Date(), "dd/MM/yyyy, hh:mma");
      const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, completed: true, completedOn: completedDate } : task
      );

      setTasks(updatedTasks);
      setCompletedTasks([...completedTasks, taskToComplete]);
    }
  };

  return (
    <div className="container">
      <div className="wrapper">
        <h1>Todo List</h1>
        <div className="header">
          <input
            type="text"
            className="add-input"
            placeholder="Please Enter Task"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" className="add-btn" onClick={addTask}>
            Create Task
          </button>
        </div>
        <div className="box" id="container-1">
          <p>Task</p>
          {tasks.map((task) => (
            <div
              className={`container-list1-item ${task.completed ? 'completed' : ''}`}
              key={task.id}
            >
              <h4
                style={
                  task.completed
                    ? { textDecoration: 'line-through', color: 'lightgray', fontWeight: 'bold' }
                    : {}
                }
              >
                {"Task Name"+" "+""+":" +" " + task.name}<br /> 
              </h4>
              <span className="created-date"   style={
                task.completed
                  ? { color: 'lightgray', fontWeight: 'bold' }
                  : {}
              }
>
                Created on: {task.createdOn}
              </span>
              {task.completed ? (
                <div>
                  <p className="completed-date"   style={
                    task.completed
                      ? {  color: 'lightgray', fontWeight: 'bold' }
                      : {}
                  }
  >
                    Ended on: {task.completedOn}
                  </p>
                </div>
              ) : null}
              {task.completed ? null : (
                <p className="description">{task.description}</p>
              )}
              <button className="delete" onClick={() => deleteTask(task.id)}>
                <i className="fa fa-trash-o" aria-hidden="true"></i>
              </button>
              <div className="item-color">
                <button
                  onClick={() => openEditModal(task.id)}
                  className={`edit-task ${task.completed ? 'disabled' : ''}`}
                  disabled={task.completed}
                >
                  <i className="fa fa-pencil" aria-hidden="true"></i>
                </button>
                {task.completed ? (
                  <div>
                    <p style={{ color: 'lightgray' }}>Task Completed, great job ✔ </p>
                  </div>
                ) : (
                  <div>
                    <label>
                      <input
                        type="radio"
                        name={`complete-${task.id}`}
                        onClick={() => markTaskCompleted(task.id)}
                      />
                      Mark as Completed
                    </label>
                    {isEditing ? (
                      <button onClick={saveTask} className="complete-task">
                        Save
                      </button>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {isEditing && (
        <div className="edit-modal">
          <label style={{ display: 'flex', alignItems: 'center', fontWeight: 'bolder' }}>
            Task Name:
          </label>
          <input
            type="text"
            style={{
              width: '30vw',
              height: '4vh',
              border: '3px solid black',
              borderLeft: '2px solid black',
              marginLeft: '3px',
              paddingLeft: '10px',
              fontSize: '20px',
            }}
            value={editingName}
            onChange={(e) => setEditingName(e.target.value)}
          />
          <br />
          <label style={{ display: 'flex', alignItems: 'center', margin: '10px 0px', fontWeight: 'bolder' }}>
            Description:
          </label>
          <textarea
            value={editingDescription}
            style={{
              width: '30vw',
              height: '5vw',
              border: '3px solid black',
              borderLeft: '2px solid black',
              marginLeft: '3px',
              paddingLeft: '10px',
              fontSize: '25px',
            }}
            onChange={(e) => setEditingDescription(e.target.value)}
          />
          <br />
          <br />
          <button onClick={saveTask} className="btn">
            Save
          </button>
          <button onClick={closeEditModal} className="btn" id="close-btn">
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
