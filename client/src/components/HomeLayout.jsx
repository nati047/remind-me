import '../styles/Home.css';
import { useState } from 'react';
import Nav from './Nav';
import Login from './Login';
import Register from './Register';
import bell from '../black-bell.jpg';
import { Navigate, Link, Outlet, useLocation } from "react-router-dom";

 

export const Carousel = () => {
  return (
    <div className="introduction">
      <p className="now" >DO It <strike>later</strike>  Now !</p>
      <p className="about-app">
      She didn't understand how change worked. When she looked at today compared to yesterday, there was nothing that she could see that was different.
      Yet, when she looked at today compared to last year, she couldn't see how anything was ever the same.
      She didn't understand how change worked. When she looked at today compared to yesterday, there was nothing that she could see that was different.
      Yet, when she looked at today compared to last year, she couldn't see how anything was ever the same.
      She didn't understand how change worked. When she looked at today compared to yesterday, there was nothing that she could see that was different.
      Yet, when she looked at today compared to last year, she couldn't see how anything was ever the same.
      </p>
    </div>
  );
}

function HomeLayout() {
  const [user, setUser] = useState({});
  const location = useLocation();

  return (
    <div className="home">
      <Nav/>
      <section className="main">
        <Outlet context={[user, setUser]} />
        <aside className="home-side-bar">
          <i className="fas fa-sms fa-9x" ></i>
        </aside>
        {/* <img alt="image loading" src={bell} ></img> */}
      </section>

      { location.pathname === '/' &&
        <div className="get-started" >
          <button className="cr-ac" >Create Account</button>
          <p className="or">or</p>
          <button className="log-in" >Log In</button>
        </div>
      }
    </div>
    );
}

export default HomeLayout;


