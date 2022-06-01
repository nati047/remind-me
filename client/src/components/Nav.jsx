import '../styles/Nav.css';
import { useLocation } from 'react-router-dom';

function Nav() {
  const location = useLocation().pathname;
  const navClass = location === '/tasks' ? 'nav-bar task-nav' : 'nav-bar';
  
  return (
    <nav className={navClass}>
      <section className='nav-container'>
        <div className="logo"><strong>Remind.Me</strong></div>
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
            <div className='log-out'>Logout</div>
          </>
          }
        </div>
      </section>
    </nav>
  );
}

export default Nav;