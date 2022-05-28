import React from "react";
import '../styles/Task.css';
import { Button } from 'react-bootstrap';
function Task() {
  return(
    <div className='task-container'>
      <div className='task-header' >
        <p className='task-name'>Take Vitamins</p>
        <p className='task-status'>Active</p>
      </div>
      <div className='task-footer'>
        <div className="task-footer-left">
          <p className='task-time'>5:00 pm</p>
          <p className='task-type'>daily</p>
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