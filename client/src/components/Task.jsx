import React from "react";
import '../styles/Task.css';
import axios from "axios";
import swal from "sweetalert";

function Task({ dateString, task} ) {
  
  const statusClass = task.completed ? "task-status completed" : "task-status active";

  const handleDelete =  () => {
    axios.post(`${process.env.REACT_APP_API_URL}/api/deleteTask`, { id : task.id })
    .then( () => {
      swal("task deleted");
    })
    .catch( err => {
      console.log("deleting error \n", err)
    });
  };

  const handleComplete =  () => {
    if (!task.completed) {
      axios.post(`${process.env.REACT_APP_API_URL}/api/completeTask`, { id : task.id })
      .then( () => {
        swal("task completed");
      })
      .catch( err => {
        console.log("completing error \n", err)
      });
    }
  };

  return(
    <div className='task-container'>
      <div className='task-header' >
        <p className='task-name'>{task.description}</p>
        <p className={statusClass}> 
          {task.frequency}
          {" | "}
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
          <button onClick={handleComplete} className='complete task-button'>Complete</button>
          {/* <button className='restart task-button'>Restart</button> */}
          <button onClick={handleDelete} className='delete task-button'>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default Task;