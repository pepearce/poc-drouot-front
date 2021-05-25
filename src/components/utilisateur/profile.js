import React from 'react'
import { Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Auctions from '../auctions/auctions';
import UpdateForm from './updateForm/updateForm';

const Profile = () => {    
  const user = useSelector(state => state.user);
    return(
            <Container fluid="md">
                <Row className="justify-content-center">
                    <h3 className="my-5">Welcome to your Profile {user.firstName} {user.lastName}</h3>
                </Row>
                <Row className="justify-content-center">
                  <UpdateForm></UpdateForm>
                </Row>
                <Row className="justify-content-center">
                  {user.role === "admin" ? (
                    <div>
                      <div className="border-bottom text-center my-5">
                        <h5>Your Auctions</h5>
                      </div>
                      <Auctions owner={user.id}></Auctions>
                    </div>
                  ) : ""}
                </Row>
                <Row className="justify-content-center m-5">
                  {user.role === "admin" ? <Link to="/auction/new">Creat a new auction</Link> : ""}
                  
                </Row>
            </Container>
        
    )
}

export default Profile