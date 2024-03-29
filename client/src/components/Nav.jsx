import "../styles/Nav.css";
import { useLocation, NavLink } from "react-router-dom";
import swal from "sweetalert";
function Nav({ setUser, user }) {
  const location = useLocation().pathname;
  const navClass = location === "/tasks" ? "nav-bar task-nav" : "nav-bar";

  const logout = () => {
    setUser({});
    localStorage.removeItem("access-token");
    localStorage.removeItem("user-state");
  };

  return (
    <nav className={navClass}>
      <section className="nav-container">
        <NavLink to="/" className="logo">
          Remind.Me
        </NavLink>
        <div className="right">
          {location === "/tasks" && (
            <>
              <div className="avatar">
                {user?.userName && user.userName[0].toUpperCase()}
              </div>
              <div className="log-out" onClick={() => logout()}>
                Logout
              </div>
            </>
          )}
        </div>
      </section>
    </nav>
  );
}

export default Nav;
