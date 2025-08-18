import React from "react";
import "./Tasks.css"; // Assuming you have a CSS file for styling
import Collapsible from "../Collapsible/Collapsible";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import actions from "../../actions";
import { toDisplayableDateFormat } from "../../utils";


function Tasks() {
  // State for managing new task form
  let [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  let [taskTitle, setTaskTitle] = useState("");
  let [taskDateTime, setTaskDateTime] = useState("");
  let [search, setSearch] = useState("");
  
  // state from redux store
  let tasks = useSelector(state => state.tasks);

  let filteredTasks = tasks.filter(task => {
    return task.taskTitle.toLowerCase().indexOf(search.toLowerCase()) >= 0;
  });

  // create dispatch function
  let dispatch = useDispatch();

  let onSaveClick = () => { 
    // Dispatch an action to save the new task
    dispatch(actions.createTask({
      id: Math.floor(Math.random() * 1000000),
      taskTitle: taskTitle,
      taskDateTime: taskDateTime
   }));
  
   // Reset the form fields
   setTaskTitle("");
   setTaskDateTime("");
   setIsNewTaskOpen(!isNewTaskOpen) 
  };
  
  let onDeleteClick = (task) => {
   if(window.confirm("Are you sure you want to delete this task?")) {
    // Dispatch an action to delete the task
    dispatch(actions.deleteTask(task.id));
   } else {
     // User canceled the deletion
   }
  };

  let onCancelClick = () => { setIsNewTaskOpen(!isNewTaskOpen) }
  return (
    <div className="outer-container">
      <div className="container">
        <div className="app-title-container">
          <div className="app-title">
            <h1>Tasks</h1>
          </div>
          <div className="create-button-container">
            {isNewTaskOpen === false ? <button className="button create-button" onClick={() => setIsNewTaskOpen(!isNewTaskOpen)}>
              <i className="fa fa-calendar-plus"></i>&nbsp;&nbsp;Create
            </button> : null}
          </div>
        </div>
        <Collapsible isOpen={isNewTaskOpen}>
          <div className="new-task-container">
            <h4 className="new-task-title">New Task</h4>
            {/*form group start*/}
            <div className="form-group">
              <label htmlFor="task-title" className="form-label">
                Task Title:
              </label>
              <div className="form-input">
                <input
                  type="text"
                  placeholder="Task Title"
                  className="text-box"
                  id="task-title"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                />
              </div>
            </div>
            {/*form group end*/}
            {/*form group start*/}
            <div className="form-group">
              <label htmlFor="task-date-time" className="form-label">
                Task Date & Time:
              </label>
              <div className="form-input">
                <input
                  type="datetime-local"
                  placeholder="Task Date & Time"
                  className="text-box"
                  id="task-date-time"
                  value={taskDateTime}
                  onChange={(e) => setTaskDateTime(e.target.value)}
                />
              </div>
            </div>
            {/*form group end*/}

            <div className="button-group">
              <button className="button save-button" onClick={() => {onSaveClick();}}>
                <i className="fa fa-save"></i>&nbsp;&nbsp;Save Task
              </button>
              <button className="button cancel-button" onClick={() => {onCancelClick();}}>
                <i className="fa fa-window-close"></i>&nbsp;&nbsp;Cancel Task
              </button>
            </div>
          </div>
        </Collapsible>
        <div className="search-box">
          <input type="search" placeholder="Search Tasks" value={search} onChange={(e) => {setSearch(e.target.value);}} />
          <i className="fa fa-search"></i>
        </div>
        <div className="content-body">
          {/*task start*/}
          {filteredTasks.map(task => 
            <div className="task" key={task.id}>
            <div className="task-body">
              <div className="task-title">
                <i className="fa fa-thumbtack"></i>
                <span className="task-title-text">{task.taskTitle}</span>
              </div>
              <div className="task-subtitle">
                <i className="far fa-clock"></i>
                <span className="task-subtitle-text">{toDisplayableDateFormat(task.taskDateTime)}</span>
              </div>
            </div>
            <div className="task-actions">
              <button className="icon-button" title="Delete" onClick={() => onDeleteClick(task)}>
                &times;
              </button>
            </div>
          </div>
          )}
          {/*task end*/}
        </div>
      </div>
    </div>
  );
}

export default Tasks;
