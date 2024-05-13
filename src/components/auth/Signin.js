import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom"; 
import AuthContext from '../../context/authContext';

function Signin({isAuthenticated, setIsAuthenticated}) {
	const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const authContext = useContext(AuthContext);

  let history = useHistory();

  function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
  }

	const onSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('REACT_APP_AUTH_SERVICE_DOMAIN ', process.env.REACT_APP_AUTH_SERVICE_DOMAIN)
      // const response = await axios.post(`${process.env.REACT_APP_AUTH_SERVICE_DOMAIN}login`, {email, password});
      const response = await axios.post(`/auth/login`, {email, password});
      setIsAuthenticated(true);
      authContext.dispatch({type: 'SIGN_IN_SUCCESS', auth: response.data});
    } catch(error){
      console.error(error)
      setMessage('');
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Error: something happened');
      }
      setIsAuthenticated(false);
      return;
    }
    
    setEmail('');
    setPassword('');
    setErrorMessage('');
    setMessage('Sign in successful');
    await timeout(1000);
    history.push("/");
  }

  useEffect(() => {
    setMessage('')
  }, [email, password])

  const showMessage = () => {
    if(message === ''){
      return <div></div>
    }
    return <div className="alert alert-success" role="alert">
      {message}
    </div> 
  }

  const showErrorMessage = () => {
    if(errorMessage === ''){
      return <div></div>
    }

    return <div className="alert alert-danger" role="alert">
      {errorMessage}
    </div>
  }

	return (
		<div className="container">
      <form onSubmit={onSubmit}>
        <h1>Sign In</h1>
        <div className="form-group">
          <label>Email</label>
          <input 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            placeholder="Email"
            className="form-control">
          </input>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input 
            value={password} 
            type="password" 
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            className="form-control">
          </input>
        </div>
        <button className="btn btn-primary">Sign In</button>
      </form>
      {showMessage()}
      {showErrorMessage()}
    </div>
	)
}

export default Signin;