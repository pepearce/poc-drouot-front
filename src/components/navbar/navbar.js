import React from 'react'
import { Link, NavLink } from 'react-router-dom'
// import { Form, FormControl, Nav, Navbar, Button } from 'react-bootstrap'
import Help from '../help/help'
import Login from '../login/loginModal'
import './navbarStyles.css'
import {useSelector, useDispatch} from 'react-redux'
import { Button } from 'react-bootstrap'
import {logout} from '../../actions/login'

const Navigation = () => {
    const login = useSelector(state => state.login);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    return(
        // <div className="container">
        //     <Navbar bg="light" expand="lg">
        //         <Navbar.Brand href="/home"><h1 className="text-danger"><strong>Drouot</strong> Digital</h1></Navbar.Brand>
        //         <Navbar.Toggle aria-controls="basic-navbar-nav" />
        //         <Navbar.Collapse id="basic-navbar-nav">
        //             <Nav className="mr-auto">
        //             <Nav.Link href="#home">Home</Nav.Link>
        //             <Nav.Link href="#link">Link</Nav.Link>
        //             </Nav>
        //         </Navbar.Collapse>
        //     </Navbar>
        // </div>
        
        <div className="container-fluid nav-container mb-3">
            <div className="container-lg">
            <nav className="navbar navbar-expand-xl navbar-light  pb-0">
                <div>
                    <button className="navbar-toggler mx-2" type="button" data-toggle="collapse" data-target=".navbars" aria-controls=".navbars" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="fas fa-bars"></span>
                    </button>
                    <Link to="/home"><h1 className="text-danger"><strong>AUCTION</strong> MINI</h1></Link>
                </div>
                {/* Connexion button, help button (right hand side) */}
                <div className="collapse navbar-collapse navbars " id="connexion">
                    <div className="nav navbar-nav ml-auto align-items-center">
                    
                        {login.isLoggedIn ? <div className="d-inline">
                        <Link className="navlinks profile text-info" to="/profile"><h6>Welcome {user.firstName} {user.lastName}</h6></Link>
                        </div>:""}
                        <div className="d-inline">
                            <Help/>
                        </div>
                        <div className="d-inline">
                        {login.isLoggedIn ? <Button onClick={() => dispatch(logout())}>Log out</Button> : <Login/> }
                        </div>
                    </div>
                </div>
            </nav>
            <nav className="navbar navbar-expand-xl navbar-light pt-0 px-2 ">
                <div className="collapse navbar-collapse navbars" id="navbarLeftContent">
                    <ul className="nav navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink to='/auctions' className="navlinks text-danger">
                                AUCTIONS
                            </NavLink>
                        </li>
                        {/* <li className="nav-item">
                            <NavLink to="/auctions" className=" navlinks text-danger">BUY NOW</NavLink>
                        </li> */}
                    </ul>
                </div>
                {/* <div className="collapse navbar-collapse navbars" id="navbarRightContent">
                    <ul className="nav navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink to="/auctions" className="text-dark navlinks">BEAUX ARTS</NavLink>                        </li>
                        <li className="nav-item">
                            <NavLink to="/auctions" className="text-dark navlinks">MOBILIER & OBJETS D'ART</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/auctions" className="text-dark navlinks">COLLECTIONS</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/auctions" className="text-dark navlinks">LUXE & ART DE VIVRE</NavLink>
                        </li>
                    </ul>
                </div> */}
            </nav>
            </div>
            
        </div>
    )
}

export default Navigation