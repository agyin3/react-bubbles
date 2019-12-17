import React, { useState } from "react";
import { Form } from 'semantic-ui-react'
import axiosWithAuth from "./axiosWithAuth";

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [user, setUser] = useState({username: '', password: ''})

  const handleChange = e => {
    setUser({...user, [e.target.name]: e.target.value})
  }

  const handelSubmit = e => {
    e.preventDefault()
    axiosWithAuth()
      .post('/api/login', {
        ...user
      })
      .then(res => {
        console.log(res)
        localStorage.setItem('token', res.data.payload)
        props.history.push('/bubbles')
      })
      .catch(err => {
        console.log(err.message)
      })
      setUser({username: '', password: ''})
  }

  return (
    <div className='login-container'>
      <h1>Welcome to the Bubble App!</h1>
      <Form>
        <Form.Group inline>
          <Form.Input type='text' name='username' value={user.username} placeholder='User Name' label='User Name' onChange={handleChange} />
          <Form.Input type='password' name='password' value={user.password} placeholder='Password' label='Password' onChange={handleChange} />
          <Form.Button onClick={handelSubmit}>Submit</Form.Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Login;
