import React from "react";
import '../styles/Task.css';
function Task({ dateString, task} ) {
  
  const statusClass = task.completed ? "task-status completed" : "task-status active";

  return(
    <div className='task-container'>
      <div className='task-header' >
        <p className='task-name'>{task.description}</p>
        <p className={statusClass}> 
          { !task.completed && "Active"  }
          { task.completed && "Complete" }
        </p>
      </div>
      <div className='task-footer'>
        <div className="task-footer-left">
          <p className='task-time'>{dateString}</p>
          <p className='task-type'>{task.frequency}</p>
        </div>
        <div className="task-footer-right">
          <button className='complete task-button'>Complete</button>
          {/* <button className='restart task-button'>Restart</button> */}
          <button className='delete task-button'>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default Task;