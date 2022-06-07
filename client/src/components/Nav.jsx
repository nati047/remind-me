import '../styles/Nav.css';
import { useLocation, NavLink } from 'react-router-dom';
import swal from "sweetalert"
function Nav({ setUser}) {
  const location = useLocation().pathname;
  const navClass = location === '/tasks' ? 'nav-bar task-nav' : 'nav-bar';
  
  const logout = () => {
    setUser({});
    localStorage.removeItem('access-token');
    swal("logout");
  }

  return (
    <nav className={navClass}>
      <section className='nav-container'>
        <NavLink to="/" className="logo">Remind.Me</NavLink>
        <div className="right">
          {location === '/' &&  
          <>
            {/* <p className="sign-up">Sign Up</p>
            <p className="log-in">Log In</p> */}
          </>
          }
          {location === '/tasks' && 
          <>
            <div className='avatar'>N</div>  
            <div className='log-out' >Logout</div>
          </>
          }
        </div>
      </section>
    </nav>
  );
}

export default Nav;