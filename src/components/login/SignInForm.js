import React, { useEffect } from 'react'
import { Formik, Form as FromikForm, Field } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css'
import * as Yup from 'yup';
import {login} from '../../actions/login'
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../actions/user';

const SignInSchema = Yup.object().shape({
   email: Yup.string().email('Invalid email').required('Required'),
   password: Yup.string()
     .min(2, 'Too Short!')
     .max(18, 'Too Long!')
     .required('Required'),
})

export const SignInForm = () => {
  const isLoggedIn = useSelector(state => state.login);
  const currentUser = useSelector(state => state.user);

  const dispatch = useDispatch();
    useEffect(() => {
      console.log(currentUser)
      console.log(isLoggedIn)
        
    }, [currentUser, isLoggedIn])
    return(<div>
      <Formik
        initialValues={{
            email: '',
            password:'',
        }}
        validationSchema={SignInSchema}
        onSubmit={values => {
            fetch(`http://localhost:8080/login`, {method: 'POST', body: JSON.stringify(values)})
            .then(response => {
                if (response.ok) {
                  return response.json();
                }else {
                  throw response;
              }
            }).then(response => {
              dispatch(login());
              const user = {
                id: response.ID,
                firstName: response.firstName,
                lastName:response.lastName,
                address: response.address,
                email: response.email,
                role: response.role
              }
              dispatch(setUser(user));
              
            }).catch(error => {
              if (error instanceof Promise) {
                error.json().then((body) => {
                  console.log(body.error);
                });
              }else {
                alert(error)
              }
                
            })
        }}
      >
        {({ errors, touched }) => (
          <FromikForm> 
            <Field className="form-control my-2" name="email" type="email" placeholder="Email" />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}

            <Field className="form-control my-2" name="password" type="password" placeholder="Password" />
            {errors.password && touched.password ? (<div>{errors.password}</div>) : null}

            <button className="btn btn-info pull-right" type="submit">Submit</button>
 
          </FromikForm>
        )}
      </Formik>
    </div>)
}

  export default SignInForm