import React from 'react'
import { Formik, Form as FromikForm, Field } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css'
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { setAuction } from '../../../actions/auctionAction';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CreatAuctionSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Too Short!')
    .max(20, 'Too long!')
    .required('Required'),
    category: Yup.string()
    .min(2, 'Too Short!')
    .max(20, 'Too long!')
    .required('Required'),
    startDate: Yup.date(),
    endDate: Yup.date(),
   photoURL: Yup.string(),
})

export const CreateAuction = () => {

  // currentUser is the global state representing the current user if it exists
  const currentUser = useSelector(state => state.user);

  // dispatcher for updating isLoggedIn and current user
  const dispatch = useDispatch();

  return(
  <Container>
    <h4 className="text-center m-3">Create a new Auction</h4>
    <Formik
      initialValues={{
        title:'',
        category:'',
        userId: currentUser.id,
        startDate: '',
        startTime: '08:30',
        endDate: '',
        endTime: '17:30'
      }}
      validationSchema={CreatAuctionSchema}
      onSubmit={values => {
          fetch(`http://localhost:8080/auctions`, {method: 'POST', body: JSON.stringify(values)})
          .then(response => {
              if (response.ok) {
                return response.json();
              }else {
                throw response.json();
            }
          }).then(response => {
            const auction = {
              id: response.data.ID,
              title: response.data.title,
              category:response.data.category,
              startDate: response.data.startDate,
              endDate: response.data.endDate,
              photoURL: response.data.photoURL
            }
            dispatch(setAuction(auction))
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
          <Field className="form-control my-2" name="title" type="text" placeholder="Title" />
          {errors.title && touched.title ? <div>{errors.title}</div> : null}

          <Field className="form-control my-2" name="category" type="text" placeholder="Category" />
          {errors.category && touched.category ? <div>{errors.category}</div> : null}

          <Field className="form-control my-2" name="startDate" type="date" />
          {errors.startDate && touched.startDate ? <div>{errors.startDate}</div> : null}
          <Field className="form-control my-2" name="startTime" type="time" />
          {errors.startTime && touched.startTime ? <div>{errors.startTime}</div> : null}

          <Field className="form-control my-2" name="endDate" type="date" />
          {errors.email && touched.email ? <div>{errors.email}</div> : null}
          <Field className="form-control my-2" name="endTime" type="time" />
          {errors.endTime && touched.endTime ? <div>{errors.endTime}</div> : null}

          <Field className="form-control my-2" name="photoURL" type="text" placeholder="Photo URL" />
          {errors.password && touched.password ? (<div>{errors.password}</div>) : null}

          <button className="btn btn-info pull-right mx-2" type="submit">Submit</button>
          <Link to="/profile" className="btn btn-danger pull-right mx-2" type="button">Cancel</Link>
          
        </FromikForm>
      )}
    </Formik>
  </Container>)
}

  export default CreateAuction