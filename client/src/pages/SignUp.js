import React, { useState } from 'react';
import BasicNav from '../components/BasicNav';
import { Form, Button, Alert } from 'react-bootstrap';


const SignUp = (props) => {

  const [userFormData, setUserFormData] = useState({ username: '', pname: '', email: '', password: '' });
  const [validated] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userFormData),
      });

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      setShowErrorAlert(false);
      setShowSuccessAlert(true);
    } catch (err) {
      console.error(err);
      setShowSuccessAlert(false);
      setShowErrorAlert(true);
    }

    setUserFormData({
      username: '',
      pname: '',
      email: '',
      password: '',
    });
  };


  return (
    <>
      <BasicNav authUser={ props.authUser }/>
      {/* show success alert if server response is ok */}
      <Alert dismissible onClose={() => setShowSuccessAlert(false)} show={showSuccessAlert}>
        Sign Up successful. I think this is the beginning of a beautiful friendship. - Casablanca (1942)
        <br />
        <br />
        Please navigate to the Login page to login.
      </Alert>
      {/* show error alert if server response is bad */}
      <Alert dismissible onClose={() => setShowErrorAlert(false)} show={showErrorAlert} variant='danger'>
        Sign Up Failed. Surely, you can't be serious? I am serious. and don't call me Shirley. - Airplane (1980)
      </Alert>
      {/* This is needed for the validation functionality above */}
      <div className="flex-row justify-content-center">
        <Form noValidate validated={validated} onSubmit={handleFormSubmit} className="text-center signInUpForm">

          <Form.Group>
            <Form.Label htmlFor='pname'>Preferred Name</Form.Label>
            <Form.Control
              type='pname'
              placeholder='Your preferred name'
              name='pname'
              onChange={handleInputChange}
              value={userFormData.pname}
              required
            />
            <Form.Control.Feedback type='invalid'>Preferred name is required!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor='username'>Username</Form.Label>
            <Form.Control
              type='text'
              placeholder='Your username'
              name='username'
              onChange={handleInputChange}
              value={userFormData.username}
              required
            />
            <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor='email'>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Your email address'
              name='email'
              onChange={handleInputChange}
              value={userFormData.email}
              required
            />
            <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor='password'>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Your password'
              name='password'
              onChange={handleInputChange}
              value={userFormData.password}
              required
            />
            <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
          </Form.Group>
          <Button
            disabled={!(userFormData.pname && userFormData.username && userFormData.email && userFormData.password)}
            type='submit'
            id="success-btn"
            variant="none">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default SignUp;
