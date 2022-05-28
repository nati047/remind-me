import React from "react";
import Nav from "./Nav";
import Task from "./Task";
import '../styles/Tasks.css'
import { Button, Container, Col, Row } from 'react-bootstrap'; 

function Tasks() {
  return (
    <div className='tasks-list'>
      <Nav className='dashboard'/>
        <div className="select-frequency"></div>
      <Container fluid style={{ marginTop: "0px"}}>
        <Row>
        <Col lg={4} style={{ marginTop: "0px"}}>
          <div className="justadiv"></div>
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
    
    </div>
  );
}

export default Tasks;