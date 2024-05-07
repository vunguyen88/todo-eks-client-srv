import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom"; 
import AuthContext from '../../context/authContext';

function AddTodo({isAuthenticated, setIsAuthenticated}) {
	const [title, setTitle] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const authContext = useContext(AuthContext);
  let history = useHistory();

  useEffect(() => {
		if(!isAuthenticated){
			history.push("/");
		}
	}, [isAuthenticated, history])

	const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(process.env.REACT_APP_TODO_SERVICE_DOMAIN, {title, targetDate}, {
        headers: {
          'Authorization': `Bearer ${authContext.auth.accessToken}`,
        }
      })
    } catch(error){
      setMessage('');
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Error: something happened');
      }
      return;
    }
    
    setTitle('');
    setTargetDate('');
    setErrorMessage('');
    setMessage('Todo successfully created');
  }

  useEffect(() => {
    setMessage('')
  }, [title, targetDate])

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
        <h1>Add New Todo</h1>
        <div className="form-group">
          <label>Title</label>
          <input 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            placeholder="Title"
            className="form-control">
          </input>
        </div>
        <div className="form-group">
          <label>Target Date</label>
          <input 
            value={targetDate} 
            type="date" 
            onChange={e => setTargetDate(e.target.value)} 
            className="form-control">
          </input>
        </div>
        <button className="btn btn-primary">Add Todo</button>
      </form>
      {showMessage()}
      {showErrorMessage()}
    </div>
	)
}

export default AddTodo;