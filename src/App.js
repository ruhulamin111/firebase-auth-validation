import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import auth from './firebase.init';

function App() {
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [register, setRegister] = useState(false)
  const [name, setName] = useState('')

  const handleEmail = (event) => {
    const email = event.target.value;
    setEmail(email)
  }

  const handlePassword = (event) => {
    const password = event.target.value;
    setPassword(password)
  }

  const handleSubmit = event => {
    event.preventDefault();
    if (!/(?=.*[a-zA-Z >>!#$%&? "<<])[a-zA-Z0-9 >>!#$%&?<< ]/.test(password)) {
      setError('Please add at least on special charecter')
      return;
    }
    setError('')
    if (register) {
      signInWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user);
        })
        .catch(error => {
          console.error(error)
        })
    }
    else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user);
          setEmail('')
          setPassword('')
          sentEmail()
          setUser()
        })
        .catch(error => {
          console.error(error)
        })
    }

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }
    setValidated(true);
  }

  const handleRegister = (event) => {
    setRegister(event.target.checked);
  }

  const sentEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log('email sent');
      })

  }
  const handleForgot = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
      })
      .catch((error) => {
      });
  }
  const handleName = (event) => {
    const name = event.target.value;
    setName(name)
  }

  const setUser = () => {
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {
      })
      .catch((error) => {
      });
  }

  return (
    <div className=''>
      <h2 className='text-center  my-5'>Firebase authentication and validation</h2>

      <div className="w-50 mx-auto">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          {!register && <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Full Name</Form.Label>
            <Form.Control onBlur={handleName} type="text" placeholder="Enter email" />
          </Form.Group>}

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmail} type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePassword} type="password" placeholder="Password" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onChange={handleRegister} type="checkbox" label="Already have an accout? " />
          </Form.Group>
          <a href="#home" onClick={handleForgot}>Forgot Password?</a>
          <br />

          <Button variant="primary" type="submit">
            {register ? ' Log In' : 'Register'}
          </Button>
          <p>{error}</p>
        </Form>
      </div>
    </div>
  );
}

export default App;