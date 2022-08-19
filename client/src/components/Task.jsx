import React from "react";
import "../styles/Task.css";
import axios from "axios";
import swal from "sweetalert";

function Task({ dateString, task, index, setSortedList }) {
  const statusClass = task.completed
    ? "task-status completed"
    : "task-status active";

  const handleDelete = () => {
    swal("Delete Task?", {
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then( async (willDelete) => {
      if (willDelete) {
        try {
          await axios.post(`/api/deleteTask`, { id: task.id });
          
          swal("Task Deleted!", {icon: "success"});

          setSortedList( prev => {
            const sortedCopy = [...prev];
            sortedCopy.splice(index, 1);
            return sortedCopy;
          });
        } catch (error) {
          console.log("deleting error \n", error);
          swal("Server Error", "Try Again Later!", { icon: "warning"});
        }
      } else {
        swal("Your Task is safe!", {icon: "info"});
      }
    });
  };

  const handleComplete = () => {
    if (!task.completed) {
      axios.post(`${process.env.REACT_APP_API_URL}/api/completeTask`, {id: task.id })
        .then(() => {
          swal("task completed", {icon: "success"});
          
          setSortedList( prev => {
            const sortedCopy = [...prev];
            sortedCopy[index].completed = true;
            return sortedCopy;
          });
        })
        .catch((err) => {
          console.log("completing error \n", err);
          swal("Server Error!", {icon: "error"});
        });
    }
  };

  return (
    <div className="task-container">
      <div className="task-header">
        <p className="task-name">{task.description}</p>
        <p className={statusClass}>
          {!task.completed && "Active"}
          {task.completed && "Completed"}
        </p>
      </div>
      <div className="task-footer">
        <div className="task-footer-left">
          <p className="task-time">{dateString}</p>
          <p className="task-type">{task.frequency}</p>
        </div>
        <div className="task-footer-right">
         { !task.completed && 
          <button onClick={handleComplete} className="complete task-button">
            Complete
          </button>}
          <button onClick={handleDelete} className="delete task-button">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Task;
