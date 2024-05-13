import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from "react-router-dom"; 
import AuthContext from '../../context/authContext';

export default function Landing({isAuthenticated, setIsAuthenticated}) {
  const [todos, setTodos] = useState(null);
  const [noAuthMessage, setNoAuthMessage] = useState('Login or Register to view your todo list');
  const [errorMessage, setErrorMessage] = useState('');
  const authContext = useContext(AuthContext);
  const history = useHistory();
  const showErrorMessage = () => {
    if(errorMessage === ''){
      return <div></div>
    }

    return <div className="alert alert-danger" role="alert">
      {errorMessage}
    </div>
      }
  console.log('TEST ENV ', process.env.REACT_APP_AUTH_SERVICE_DOMAIN)
  useEffect(() => {
    async function fetchTodos() {
      try {
        if (!authContext.auth && authContext.auth.isSignedIn) return setNoAuthMessage('Please login to view and add todo')
        const response = await axios.get(`${process.env.REACT_APP_TODO_SERVICE_DOMAIN}`, {
          headers: {
            // 'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            'Authorization': `Bearer ${authContext.auth.accessToken}`,
          }
        });
        if (response.data.status === 'success') return setTodos(response.data.data);
      } catch (err) {
        console.error(err)
      }
    }
    fetchTodos();
  }, [authContext])

  const displayTodos = (todos=[]) => {
    return (
      <div>
      <p className="h3">You have {todos.length} tasks in your todo list</p>
      <button type="button" class="btn btn-primary my-3" onClick={() => history.push('/todo')}>View Todo List</button>

      </div>
    )
  }

	return (
		<div className="container-fluid">
      <div className='row mt-4'>
        <div className='col-12 my-4 text-center'>
          <p className="h1">Todo List Application</p>
        </div>
        <div className='col-12 text-center'>
          {showErrorMessage()}
        </div>
        <div className='col-12 my-2 text-center'>
          {noAuthMessage && <h3>{noAuthMessage}</h3>}
        </div>
        <div className='col-12 my-2 text-center'>
          {todos && authContext && authContext.auth?.isSignedIn && displayTodos(todos)}
        </div>
      </div>			
		</div>
	)
}