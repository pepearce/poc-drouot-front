import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setArticle } from '../../../../../actions/articleAction';
import { setBid } from '../../../../../actions/bidAction';
import { getSocket } from '../../../../../App';
import Login from '../../../../login/loginModal';
import ArticleCarousel from '../articleCarousel/articleCarousel';


const Article = (props) => {
    const GETBID = "GETBID";
    const SETBID = "SETBID";
    const user = useSelector(state => state.user);
    const article = useSelector(state => state.article);
    const articles = useSelector(state => state.articles);
    const highestBid = useSelector(state => state.bid);
    
    const dispatch = useDispatch();
    let socket = getSocket();
    console.log("socket open : ", socket.readyState === 1)
    if (socket.readyState !== 1) {
        socket = new WebSocket(`ws://localhost:8080/ws/v1`);
    }
    
    dispatch(setArticle(props.location.state.article))
    
    // let socket = new WebSocket(`ws://localhost:8080/ws/article/${article.ID}`)
    // console.log("attempting connection...")

    // socket.onmessage = (message) => {
    //     dispatch(setBid(JSON.parse(message.data)));
    // }

    // socket.onopen = () => {
    //     console.log("Success")
    // }
    // socket.onclose = (event) => {
    //     console.log("socket close : ", event);
    // }

    // socket.onerror = (error) => {
    //     console.log(error)
    // }
    
    // If a user is logged in, long poll the highest bid
    // this is to be replaced when websocket is in place...
    // if (user.id !== '') {
    //     setTimeout(() => {
    //         fetch(
    //             `http://localhost:8080/articles/bid/${article.ID}`, {
    //                 method: "GET",
    //             }
    //         ).then((response) => {
    //             if (response.ok) {
    //                 return response.json();
    //             }else{
    //                 throw response;
    //             }
    //         }).then((data) => {
    //             dispatch(setBid(data.data));
    //         }).catch(error => {
    //             alert(error)
    //         })
    //     }, 1000)
    // } 

    // Find the correct conditions !!!
    if (highestBid === {} || highestBid.articleId !== article.ID) {
        socket.send(JSON.stringify({"message":GETBID, "id":article.ID}))
    }
    useEffect(() => {
        
        socket.onmessage = (message) => {
            console.log(message.data);
            if ((message.data === 0)) {
                console.log("no bids : ",highestBid);
                highestBid.articleId = article.ID;
                highestBid.bidAmount = 0;
            }else {
                dispatch(setBid(JSON.parse(message.data)))
            }
        }
        // // This is to be replaced by websocket connection !!!
        // // Get highest bid for article
        // fetch(
        //     `http://localhost:8080/articles/bid/${article.ID}`, {
        //         method: 'GET'
        //     }
        // ).then((response) => {
        //     if (response.ok) {
        //         return response.json();
        //     }else{
        //         throw response;
        //     }
        // }).then((data) => {
        //     dispatch(setBid(data.data));
        // }).catch(error => {
        //     alert(error)
        // })
        
        
    }, [article.ID, dispatch, highestBid, socket]);

    const createBid = () => {
        
        const bid = {"message":SETBID,
        "id":0,
        "bid":{
            bidDate:new Date(), 
            userId:user.id, 
            articleId:article.ID, 
            bidAmount:(highestBid.bidAmount === 0 || highestBid === 0 ? (Number.parseInt(article.initialOffering) + 10) : (Number.parseInt(highestBid.bidAmount) + 10) )},
        }
        if (socket.readyState === 1) {
            console.log("Sending");
            socket.send(JSON.stringify(bid))
            console.log("Sent");
        }else {
            fetch(`http://localhost:8080/bids`, {
                method: 'POST',
                body: JSON.stringify(bid)
            }).then(response => {
                if (response.ok) {
                    return response.json();
                }else {
                    throw response.json();
                }
            }).then(data => {
                console.log(data.data);
                dispatch(setBid(data.data))
            }).catch(error => {
                if (error instanceof Promise) {
                  error.then(error => {
                    // for dev purposes only
                    console.log(error);
                    alert(error)
                  })
                }else {
                  // for dev purposes
                  console.log("not promise")
                  alert(error)
                }
              })
        }
        
        
        
    }

    return(
        <div>
            <div className="row mx-auto">
                <div className="col-2">
                </div>
                <div className="col-4 text-center">
                    <h1 className="text-center">{article.title}</h1>
                    <img className="w-75 my-3" src={article.photoURL} alt="article pic" />
                </div>
                <div className="col-2 text-center my-auto">
                    <h4>Estimation : {article.estimation} €</h4>
                    <h5>Highest bid : {highestBid === {} || highestBid === 0 ? article.initialOffering : highestBid.bidAmount} </h5>
                    {user.id === "" ? <Login></Login> : <Button variant="info" onClick={createBid}>Bid</Button>}
                    
                </div>
        </div>
        <ArticleCarousel articles={articles} />
        </div>
    )
}

export default Article