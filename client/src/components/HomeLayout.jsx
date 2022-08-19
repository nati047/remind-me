import "../styles/Home.css";
import Nav from "./Nav";
import { Navigate, Link, Outlet, useLocation } from "react-router-dom";

export const Carousel = () => {
  return (
    <div className="introduction">
      <p className="now">
        DO It <strike>later</strike> Now !
      </p>
      <p className="about-app">
        Get SMS reminders for your important tasks.
      </p>
      <ul className="reminder-types">
        <li>One-off</li>
        <li>Daily</li> 
        <li>Weekly </li>
        <li>Monthly</li>
      </ul>
    </div>
  );
};

function HomeLayout({ user, setUser }) {
  const location = useLocation();

  if (Object.keys(user).length > 0) {
    return <Navigate to="/tasks" />;
  }

  return (
    <div className="home">
      <Nav />
      <section className="main">
        <Outlet context={[user, setUser]} />
        <aside className="home-side-bar">
          <i className="fas fa-sms fa-9x"></i>
        </aside>
      </section>
      {location.pathname === "/" && (
        <div className="get-started">
          <Link className="link" to="/register">
            <button className="cr-ac">
              Create Account
            </button>
          </Link>
          <p className="or">or</p>
          <Link className="link" to="/login">
            <button className="log-in">
              Log In
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default HomeLayout;
