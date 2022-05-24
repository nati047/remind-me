import '../styles/Nav.css';

function Nav() {

  return (
    <nav className="nav-bar">
      <div className="logo"><strong>Remind.Me</strong></div>
      <div className="right">
        <p className="sign-up">Sign Up</p>
        <p className="log-in">Log In</p>
      </div>
    </nav>
  );
}

export default Nav;