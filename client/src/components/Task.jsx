import React from "react";
import '../styles/Task.css';
import { Button } from 'react-bootstrap';
function Task() {
  return(
    <div className='task'>
      <div className='task-header' >
        <h1 className='task-name'>Take Vitamins</h1>
        <h3 className='task-status'>Active</h3>
      </div>
      <div className='task-footer'>
        <div className="task-footer-left">
          <h4 className='task-time'>5:00 pm</h4>
          <h4 className='task-type'>daily</h4>
        </div>
        <div className="task-footer-right">
          <button className='complete task-button'>Complete</button>
          {/* <button className='restart'>Restart</button> */}
          <button className='delete task-button'>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default Task;