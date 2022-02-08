import React from "react";
import '../styles/Home.css'
import bell from '../black-bell.jpg';

function Home() {

  return (
    <div className="home">

      <nav className="nav-bar">
        <div className="logo"><strong>Remind.Me</strong></div>
        <div className="right">
          <p className="sign-up">Sign Up</p>
          <p className="log-in">Log In</p>
        </div>
      </nav>

      <section className="main">
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
        <i className="fas fa-sms fa-9x" ></i>
        {/* <img alt="image loading" src={bell} ></img> */}
      </section>

      <div className="get-started" >
        <button className="cr-ac" >Create Account</button>
        <p className="or">or</p>
        <button className="log-in" >Log In</button>
      </div>

    </div>
    );
}

export default Home;


