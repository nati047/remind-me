import React from "react";
import '../styles/Home.css'
const Home = () => {

  return (
    <div className="home">
      <nav className="nav-bar">
        <div className="logo">Remind.Me</div>
        <div className="right">
          <p className="sign-up">Sign Up</p>
          <p className="log-in">Log In</p>
        </div>
      </nav>
      <section className="main">
        <div className="introduction">
          <h2 className="now" >DO It later Now !</h2>
          <p className="about-app">
          She didn't understand how change worked. When she looked at today compared to yesterday, there was nothing that she could see that was different.

          Yet, when she looked at today compared to last year, she couldn't see how anything was ever the same.
          
          She didn't understand how change worked. When she looked at today compared to yesterday, there was nothing that she could see that was different.

          Yet, when she looked at today compared to last year, she couldn't see how anything was ever the same.
          
          She didn't understand how change worked. When she looked at today compared to yesterday, there was nothing that she could see that was different.

          Yet, when she looked at today compared to last year, she couldn't see how anything was ever the same.
          </p>
        </div>
        <div className="image">
          Image will be here
        </div>
      </section>
    </div>
    );
}

export default Home;