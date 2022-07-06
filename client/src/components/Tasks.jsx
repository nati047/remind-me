import React from "react";
import Nav from "./Nav";
import Task from "./Task";
import '../styles/Tasks.css'
import { Button, Container, Col, Row } from 'react-bootstrap'; 
import CreateTask from "./CreateTask";
import { Navigate } from "react-router-dom";

function Tasks({ user, setUser}) {
  
  const handleClick = (event) => {
    // event.toggleClass('active')
  }
  console.log(user, "user in tasks")
  if(!user?.id) {
    return (
      <Navigate to="/" />
    ); 
   }

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