import React, { useState } from 'react'
import {Button, Modal} from 'react-bootstrap'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'



const Login = () => {

  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  // When the sign up is closed, the user state must be cleared
  const handleCloseSignIn = () => {
    setShowSignIn(false);
  }

  // When the sign up is closed, the new user state must be cleared
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
        {/* <Form>
          <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control onChange={handleChange} type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control onChange={handleChange} type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit" onSubmit={onSignIn}>
              Submit
          </Button>
          </Form> */}
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
        {/* <Form>
        <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control onChange={handleChangeSignUp} type="text" placeholder="First Name" />
          </Form.Group>
          <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control onChange={handleChangeSignUp} type="text" placeholder="Last Name" />
          </Form.Group>
          <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control onChange={handleChangeSignUp} type="email" placeholder="Email" />
              <Form.Text className="text-muted">
              We'll never share your email with anyone else.
              </Form.Text>
          </Form.Group>
          <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control onChange={handleChangeSignUp} type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit" onSubmit={onSignIn}>
              Submit
          </Button>
          </Form> */}
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
  
//     return(
// <div>
//     <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
//   <div className="modal-dialog modal-dialog-centered">
//     <div className="modal-content">
//       <div className="modal-header">
//         <h5 className="modal-title" id="exampleModalToggleLabel">Sign-In</h5>
//         <button type="button" className="btn" data-dismiss="modal" aria-label="Close"><i className="fa fa-times"></i></button>
//       </div>
//       <div className="modal-body d-flex justify-content-center">
//         <form action="http://localhost:8080/users/signIn" className="w-75 text-center" method="post">
//             <div className="input-group m-2">
//                 <input name="email" id="email" type="email" className="form-control" onChange={handleChange} placeholder="Email" required/>
//             </div>
//             <div className="input-group  m-2">
//                 <input name="password" id="password" type="password" className="form-control" onChange={handleChange} placeholder="Password" required/>
//             </div>
//             <button type="submit" onSubmit={onSignIn} className="btn btn-success">Submit</button>
//         </form>
//       </div>
//       <div className="modal-footer">
//         <button className="btn btn-light border-dark" data-target="#exampleModalToggle2" data-toggle="modal" data-dismiss="modal">Sign-up</button>
//       </div>
//     </div>
//   </div>
// </div>
// <div className="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
//   <div className="modal-dialog modal-dialog-centered">
//   <div className="modal-content">
//       <div className="modal-header">
//         <h5 className="modal-title" id="exampleModalToggleLabel">Sign-Up</h5>
//         <button type="button" className="btn" data-dismiss="modal" aria-label="Close"><i className="fa fa-times"></i></button>
//       </div>
//       <div className="modal-body d-flex justify-content-center">
//         <form onSubmit={signUpUser()} className="w-75 text-center" method="post">
//         <div className="input-group m-2">
//                 <input name="firstName" id="firstName" type="text" className="form-control" placeholder="First Name" required/>
//             </div>
//             <div className="input-group m-2">
//                 <input name="lastName" id="lastName" type="text" className="form-control" placeholder="Last Name" required/>
//             </div>
//             <div className="input-group m-2">
//                 <input name="Address" id="Address" type="text" className="form-control" placeholder="Address" required/>
//             </div>
//             <div className="input-group m-2">
//                 <input name="email" id="email" type="email" className="form-control" placeholder="Email" required/>
//             </div>
//             <div className="input-group  m-2">
//                 <input name="password" id="password" type="password" className="form-control" placeholder="Password" required/>
//             </div>
//             <button type="submit" className="btn btn-success">Submit</button>
//         </form>
//       </div>
//       <div className="modal-footer">
//         <button className="btn btn-light border-dark" data-target="#exampleModalToggle2" data-toggle="modal" data-dismiss="modal">Sign-up</button>
//       </div>
//     </div>
//   </div>
// </div>
// <a className="btn btn-light border-dark" data-toggle="modal" href="#exampleModalToggle" role="button">Connexion</a>
// </div>
//     )
    

}

export default Login