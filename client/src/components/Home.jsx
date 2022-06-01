import '../styles/Home.css';
import Nav from './Nav';
import Login from './Login';
import Register from './Register';
import bell from '../black-bell.jpg';
import { Navigate, Link } from "react-router-dom";

function Home() {

  return (
    <div className="home">
      <Nav/>
      <section className="main">
        {/* <div className="introduction">
          <p className="now" >DO It <strike>later</strike>  Now !</p>
          <p className="about-app">
          She didn't understand how change worked. When she looked at today compared to yesterday, there was nothing that she could see that was different.
          Yet, when she looked at today compared to last year, she couldn't see how anything was ever the same.
          She didn't understand how change worked. When she looked at today compared to yesterday, there was nothing that she could see that was different.
          Yet, when she looked at today compared to last year, she couldn't see how anything was ever the same.
          She didn't understand how change worked. When she looked at today compared to yesterday, there was nothing that she could see that was different.
          Yet, when she looked at today compared to last year, she couldn't see how anything was ever the same.
          </p>
        </div> */}
        {/* <Login /> */}
        <Register />
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


