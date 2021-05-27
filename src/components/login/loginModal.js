import React, { useState } from 'react'
import {Button, Modal} from 'react-bootstrap'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'



const Login = () => {

  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const handleCloseSignIn = () => {
    setShowSignIn(false);
  }

  const handleCloseSignUp = () => {
    setShowSignUp(false);
  }

  // Open and close each modal
  const handleSignInShow = () => {setShowSignIn(true);setShowSignUp(false)}
  const handleSignUpShow = () => {setShowSignIn(false);setShowSignUp(true)}

 

  return (
    <>
      <Button variant="info" onClick={handleSignInShow}>
        Sign in
      </Button>

      {/* This is the modal for Sign in */}
      <Modal show={showSignIn} onHide={handleCloseSignIn}>
        <Modal.Header closeButton>
          <Modal.Title>Connexion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SignInForm></SignInForm>
        </Modal.Body>
        <Modal.Footer>
        <p>Need an account ?</p>
          <Button variant="info" onClick={handleSignUpShow}>
            Sign-up
          </Button>
        </Modal.Footer>
      </Modal>

      {/* This is the modal for Sign up */}
      <Modal show={showSignUp} onHide={handleCloseSignUp}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SignUpForm></SignUpForm>
        </Modal.Body>
        <Modal.Footer>
          <p>Already have an account ?</p>
          <Button variant="info" onClick={handleSignInShow}>
            Sign-in
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );

}

export default Login