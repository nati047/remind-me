import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import Task from "./Task";
import "../styles/Tasks.css";
import { Container, Col, Row } from "react-bootstrap";
import CreateTask from "./CreateTask";
import { Navigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import moment from "moment";

function Tasks({ user, setUser }) {
  const [tasks, setTasks] = useState([]);
  const [sortedList, setSortedList] = useState([]);
  const [selected, setSelected] = useState("all");

  useEffect(() => {
    axios
      .get(`/api/tasks`)
      .then((response) => {
        setTasks(response.data);
        setSortedList(response.data);
      })
      .catch((err) => {
        if (err.response.data?.error === "Forbidden Access!") {
          swal("Session Timedout!","Login to gain access!", {icon: "info"});
          setUser({});
          localStorage.removeItem("access-token");
          localStorage.removeItem("user-state");
        } else {
          console.log(err.response);
          swal(err.response.data.error, {icon: "error"}); 
        }
      });
  }, []);

  const handleSort = (event) => {
    if (event.target.id === "sort") {
      return;
    }

    event.target.classList.add("selected");
    if (selected.classList) {
      selected.classList.remove("selected");
    }

    setSelected(event.target);

    const sortBy = event.target.innerText;
    setSortedList(() => {
      if (sortBy === "all") {
        return tasks;
      }
      const newList = tasks.filter((task) => task.frequency === sortBy);
      return newList;
    });
  };

  if (!user?.id) {
    return <Navigate to="/" />;
  }

  return (
    <div className="tasks-list">
      <Nav className="dashboard" setUser={setUser} user={user} />
      <section className="tasks-main">
        <div id="sort" className="select-frequency" onClick={handleSort}>
          <div className="frequency">all</div>
          <div className="frequency">once</div>
          <div className="frequency">daily</div>
          <div className="frequency">weekly</div>
          <div className="frequency">monthly</div>
        </div>
        <Container fluid style={{ marginTop: "0px" }}>
          <Row>
            <Col lg={4} style={{ marginTop: "0px" }}>
              <CreateTask setUser={setUser} setSortedList={setSortedList}/>
            </Col>
            <Col>
              <Container
                style={{
                  // backgroundColor: 'grey',
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {sortedList.length > 0 &&
                  sortedList.map((task, index) => {
                    const date = new Date(task.date);
                    const dateString = moment(date).format(" MMMM Do - h:mm a");
                    return (
                      <Task
                        index={index}
                        key={task.id}
                        dateString={dateString}
                        task={{ ...task }}
                        setSortedList={setSortedList}
                      />
                    );
                  })}
                {sortedList.length < 1 && (
                  <div className="no-tasks">No tasks found!</div>
                )}
              </Container>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default Tasks;
