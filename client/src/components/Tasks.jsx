import React, { useEffect } from "react";
import Nav from "./Nav";
import Task from "./Task";
import '../styles/Tasks.css'
import { Container, Col, Row } from 'react-bootstrap'; 
import CreateTask from "./CreateTask";
import { Navigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

function Tasks({ user, setUser}) {
  
  if(!user?.id) {
    return (
      <Navigate to="/" />
    ); 
   }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/tasks`)
    .then( response => {

    })
    .catch( err => {

      if (err.response.data.error === "Forbidden Access!") {
        swal("Session Timedout");
        setUser({});
        localStorage.removeItem('access-token');
        localStorage.removeItem('user-state');
      }
      else {
        swal(err.response.data.error);  // TODO fix all swal alerts
      }
    })
  }, []);

  return (
    <div className='tasks-list'>
      <Nav className='dashboard' setUser={setUser} user={user}/>
      <section className="tasks-main">
        <div onClick={handleClick} className="select-frequency">
          <div className="frequency">all</div>
          <div className="frequency">once</div>
          <div className="frequency">daily</div>
          <div className="frequency">weekly</div> 
          <div className="frequency">monthly</div>
        </div>
        <Container fluid style={{ marginTop: "0px"}}>
          <Row>
          <Col lg={4} style={{ marginTop: "0px"}}>
            <CreateTask setUser={setUser}/>
          </Col >
          <Col >
            <Container style={{ 
              // backgroundColor: 'grey', 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <Task />
              <Task />
              <Task />
              <Task />
            </Container>
          </Col>
          </Row>
        </Container>

      </section>
    
    </div>
  );
}

export default Tasks;