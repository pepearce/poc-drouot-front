import React from 'react'
import { Formik, Form as FromikForm, Field } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css'
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../../actions/user';
import { logout } from '../../../actions/login';

const UpdateSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(20, 'Too long!')
    .required('Required'),
    lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(20, 'Too long!')
    .required('Required'),
    address: Yup.string()
    .min(15, 'Too Short!')
    .max(50, 'Too long!')
    .required('Required')
})

const UpdateForm = () => {

  // currentUser is the global state representing the current user if it exists
  const user = useSelector(state => state.user);

  // dispatcher for updating isLoggedIn and current user
  const dispatch = useDispatch();

  const onDelete = () => {
    if (window.confirm("Delete ?")) {
      fetch(`http://localhost:8080/users/${user.id}`, {method: 'delete'})
      .then(response => {
          if (response.ok) {
              return response.json();
          }else {
            throw response;
        }
      }).then(response => {
        dispatch(logout());
        console.log(response);
        alert("Account deleted");
      }).catch(error => {
        if (error instanceof Promise) {
          error.json().then((body) => {
            console.log(body.error);
          });
        }else {
          alert(error)
        }
      })
    }
  }

  return(<div>
    <Formik
      initialValues={{
        firstName:user.firstName,
        lastName: user.lastName,
        address: user.address,
      }}
      validationSchema={UpdateSchema}
      onSubmit={values => {
          fetch(`http://localhost:8080/users/${user.id}`, {method: 'PUT', body: JSON.stringify(values)})
          .then(response => {
              if (response.ok) {
                return response.json();
              }else {
                throw response.json();
            }
          }).then(response => {
            console.log(response.ID)
            const user = {
              id: response.ID,
              firstName: response.firstName,
              lastName: response.lastName,
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
          <label for="firstName" > First Name</label>
          <Field className="form-control mb-2" name="firstName" type="text"  />
          {errors.firstName && touched.firstName ? <div>{errors.firstName}</div> : null}

          <label for="lastName" > Last Name</label>
          <Field className="form-control mb-2" name="lastName" type="text"  />
          {errors.lastName && touched.lastName ? <div>{errors.lastName}</div> : null}

          <label for="address" > Address</label>
          <Field className="form-control mb-2" name="address" type="text" />
          {errors.address && touched.address ? <div>{errors.address}</div> : null}

          <button className="btn btn-info pull-right mx-2" type="submit">Update Profile</button>
          <button className="btn btn-danger pull-right mx-2" onClick={onDelete}>Delete Profile</button>
          
        </FromikForm>
      )}
    </Formik>
  </div>)
}

export default UpdateForm