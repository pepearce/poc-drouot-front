import React, { useEffect } from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Navigation from './components/navbar/navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import Auctions from './components/auctions/auctions';
import Home from './components/home/home';
import Auction from './components/auctions/auction/auction';
import Article from './components/auctions/auction/articles/article/article';
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import Help from './components/help/help';
import Login from './components/login/loginModal';
import Footer from './components/footer/footer';
import Profile from './components/utilisateur/profile'
import ProtectedRoute from './ProtectedRoute';
import CreateAuction from './components/utilisateur/createAuction/createAuction';



let socket = new WebSocket(`ws://localhost:8080/ws/v1`);

export const getSocket = () => {
    return socket;
}
const App = () => {
    socket.onopen = () => {
        console.log("connected");
    }
	useEffect(() => {
    
        socket.onclose = (event) => {
            console.log("socket close : ", event);
        }
    
        socket.onerror = (error) => {
            console.log(error);
        }
	})

    return (
        <div>
            <Router>
            <Navigation/>
                <main role="main" className="d-flex flex-column min-vh-100">
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/home" component={Home}/>
                        <Route exact path="/auctions" component={Auctions}/>
                        <Route path="/auctions/articles/:id" component={Auction}/>
                        <Route path="/article/:id" component={Article}></Route>
                        <Route exact path="/help" component={Help}></Route>
                        <Route exact path="/login" component={Login}></Route>
                        <ProtectedRoute exact path="/profile" component={Profile}></ProtectedRoute>
                        <ProtectedRoute exact path="/auction/new" component={CreateAuction}></ProtectedRoute>
                    </Switch>
                </main>
            <Footer/>
            </Router>
        </div>
    )
}

export default App