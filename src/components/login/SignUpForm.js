import React, { useEffect } from 'react'
import { Formik, Form as FromikForm, Field } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css'
import * as Yup from 'yup';
import {login} from '../../actions/login'
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../actions/user';

const SignUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(20, 'Too long!')
    .required('Required'),
    lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(20, 'Too long!')
    .required('Required'),
    address: Yup.string()
    .min(10, 'Too Short!')
    .max(50, 'Too long!')
    .required('Required'),
   email: Yup.string().email('Invalid email').required('Required'),
   password: Yup.string()
    .min(4, 'Too Short!')
    .max(18, 'Too Long!')
    .required('Required'),
  passwordCheck: Yup.string()
  .test('passwords-match', 'Passwords must match', function(value){
    return this.parent.password === value
  }),
})

export const SignUpForm = () => {

  // isLoggedIn is the global state for login
  const isLoggedIn = useSelector(state => state.login);
  // currentUser is the global state representing the current user if it exists
  const currentUser = useSelector(state => state.user);

  // dispatcher for updating isLoggedIn and current user
  const dispatch = useDispatch();

  // For dev purposes only (to check the values of the global states)
  useEffect(() => {
    console.log(currentUser)
    console.log(isLoggedIn)
  }, [currentUser, isLoggedIn])

  return(<div>
    <Formik
      initialValues={{
        firstName:'',
        lastName:'',
        address: '',
        email: '',
        password:'',
        passwordCheck:'',
        role:'user'
      }}
      validationSchema={SignUpSchema}
      onSubmit={values => {
          fetch(`http://localhost:8080/users`, {method: 'POST', body: JSON.stringify(values)})
          .then(response => {
              if (response.ok) {
                return response.json();
              }else {
                throw response.json();
            }
          }).then(response => {
            dispatch(login());
            console.log(response.ID)
            const user = {
              id: response.ID,
              firstName: response.firstName,
              lastName:response.lastName,
              address: response.address,
              email: response.email,
              role: response.role
            }
            console.log(user)
            dispatch(setUser(user))
          }).catch(error => {
            if (error instanceof Promise) {
              error.then(error => {
                // for dev purposes only
                console.log(error);
                if (error.error === "Error 1062: Duplicate entry 'paul.vpearce@gmail.com' for key 'UN_users_email'") {
                  alert("Email already exists !")
                }
              })
            }else {
              // for dev purposes
              console.log("not promise")
              alert(error)
            }
          })
      }}
    >
      {({ errors, touched }) => (
        <FromikForm> 
          <Field className="form-control my-2" name="firstName" type="firstName" placeholder="First Name" />
          {errors.firstName && touched.firstName ? <div>{errors.firstName}</div> : null}

          <Field className="form-control my-2" name="lastName" type="lastName" placeholder="Last Name" />
          {errors.lastName && touched.lastName ? <div>{errors.lastName}</div> : null}

          <Field className="form-control my-2" name="address" type="address" placeholder="address" />
          {errors.address && touched.address ? <div>{errors.address}</div> : null}

          <Field className="form-control my-2" name="email" type="email" placeholder="Email" />
          {errors.email && touched.email ? <div>{errors.email}</div> : null}
          
          <Field className="form-control my-2" name="password" type="password" placeholder="Password" />
          {errors.password && touched.password ? (<div>{errors.password}</div>) : null}

          <Field className="form-control my-2" name="passwordCheck" type="password" placeholder="Password" />
          {errors.passwordCheck && touched.passwordCheck ? (<div>{errors.passwordCheck}</div>) : null}
          <h6>Select an account type :</h6>
          <Field className="form-control my-2" type="select" as="select" name="role">
             <option value="user">Buyer</option>
             <option value="admin">Seller</option>
           </Field>

          <button className="btn btn-info pull-right" type="submit">Submit</button>
          
        </FromikForm>
      )}
    </Formik>
  </div>)
}

  export default SignUpForm