import React from "react";
import '../styles/Task.css';
function Task() {
  return(
    <div className='task'>
      <div className='task-header' >
        <h1 className='task-name'>Take Vitamins</h1>
        <h3 className='task-status'>Active</h3>
      </div>
      <div className='task-footer'>
        <div className="task-footer-left">
          <h4 className='task-time'>5:00</h4>
          <h4 className='task-type'>daily</h4>
        </div>
        <div className="task-footer-right">
          <button className='complete'>Complete</button>
          {/* <button className='restart'>Restart</button> */}
          <button className='delete'>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default Task;