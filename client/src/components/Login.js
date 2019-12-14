import React from "react";
import { Form } from 'semantic-ui-react'

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <div>
      <Form>
        <Form.Group inline>
          <Form.Input type='text' name='username' placeholder='User Name' label='User Name' />
          <Form.Input type='password' name='password' placeholder='Password' label='Password' />
          <Form.Button>Submit</Form.Button>
        </Form.Group>
      </Form>
      </div>
    </>
  );
};

export default Login;
