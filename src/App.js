import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from './firebase.init';




function App() {
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [register, setRegister] = useState(false)
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

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return
    }
    if (!/(?=.*[a-zA-Z >>!#$%&? "<<])[a-zA-Z0-9 >>!#$%&?<< ]/.test(password)) {
      setError('Please add at least on special charecter')
      return;
    }
    setError('')
    setValidated(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
      })
      .catch(error => {
        console.error(error)
      })

  }
  const handleRegister = (event) => {
    setRegister(event.target.checked);
  }

  return (
    <div className=''>
      <h2 className='text-center  my-5'>Firebase authentication and validation</h2>
      <div className="w-50 mx-auto">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmail} type="email" placeholder="Enter email" />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePassword} type="password" placeholder="Password" />
            <Form.Control.Feedback type="invalid">
              Please provide a valid password.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onChange={handleRegister} type="checkbox" label="Already have an accout? " />
          </Form.Group>
          <Form.Control.Feedback>
            {error}
          </Form.Control.Feedback>
          <Button variant="primary" type="submit">
            {register ? ' Log In' : 'Register'}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
