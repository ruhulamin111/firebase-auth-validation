import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import auth from './firebase.init';




function App() {
  const [users, setUsers] = useState({})
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleEmail = (event) => {
    const email = event.target.value;
    setEmail(email)
  }
  const handlePassword = (event) => {
    const password = event.target.value;
    setPassword(password)
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
        setUsers(user)
      })
      .catch(error => {
      })

  }

  return (
    <div className=''>
      <h2 className='text-center  my-5'>Firebase authentication and validation</h2>
      <div className="w-50 mx-auto">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmail} type="email" placeholder="Enter email" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePassword} type="password" placeholder="Password" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
