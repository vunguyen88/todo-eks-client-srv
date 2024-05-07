import React, { useContext} from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/authContext';

function Header({isAuthenticated, setIsAuthenticated}) {
  const authContext = useContext(AuthContext);

  const onSignOutClick = () => {
    sessionStorage.removeItem('auth');
    authContext.dispatch({type: 'SIGN_OUT', auth: null});
  }

	return (
		<header>
			<nav className="navbar navbar-expand-md navbar-dark bg-dark sticky-top">
        <div className="navbar-brand container">ToDoList App</div>
        <ul className="navbar-nav justify-content-end container">
          <li className="nav-link px-4"><Link to='/'>Home</Link></li>
          {authContext?.auth?.isSignedIn && <li className="nav-link px-4"><Link to='/todo'>View Todo</Link></li>}
          {authContext?.auth?.isSignedIn && <li className="nav-link px-4"><Link to='/add'>Add Todo</Link></li>}
          {!authContext?.auth?.isSignedIn && <li className="nav-link px-4"><Link to='/signin'>Signin</Link></li>}
          {!authContext?.auth?.isSignedIn && <li className="nav-link px-4"><Link to='/signup'>Signup</Link></li>}
          {authContext?.auth?.isSignedIn && <li className="nav-link px-4"><Link to='/signout' onClick={onSignOutClick}>Signout</Link></li>}
          <li className="nav-link px-4"><Link to='/about'>About</Link></li>
        </ul>
      </nav>
		</header>
	)
}

export default Header;