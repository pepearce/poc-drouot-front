import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setArticle } from '../../../../../actions/articleAction';
import { setBid } from '../../../../../actions/bidAction';
import Login from '../../../../login/loginModal';
import ArticleCarousel from '../articleCarousel/articleCarousel';


const Article = (props) => {
    const user = useSelector(state => state.user);
    const article = useSelector(state => state.article);
    const articles = useSelector(state => state.articles);
    const highestBid = useSelector(state => state.bid);
    // const [highestBid, setHighestBid] = useState({});
    
    // const [errorMessage, setErrorMessage] = useState("");
    // const articleId = props.match.params.id;
    const dispatch = useDispatch();
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
    
    if (user.id !== '') {
        setTimeout(() => {
            fetch(
                `http://localhost:8080/articles/bid/${article.ID}`
            ).then((response) => {
                if (response.ok) {
                    return response.json();
                }else{
                    throw response;
                }
            }).then((data) => {
                dispatch(setBid(data.data));
            }).catch(error => {
                // error.json().then((body) => {
                //     alert(body.error);
                // });
                alert(error)
            })
        }, 1000)
    } 
    
    useEffect(() => {
        
        // // Get article
        // fetch(
        //     `http://localhost:8080/articles/${articleId}`
        // ).then((response) => {
        //     if (response.ok) {
        //         return response.json();
        //     }else {
        //         throw response;
        //     }
            
        // }).then((data) => {
        //     dispatch(setArticle(data.data));
        // This is to be replaced by websocket connection !!!
        // Get highest bid for article
        fetch(
            `http://localhost:8080/articles/bid/${article.ID}`
        ).then((response) => {
            if (response.ok) {
                return response.json();
            }else{
                throw response;
            }
        }).then((data) => {
            dispatch(setBid(data.data));
        }).catch(error => {
            // error.json().then((body) => {
            //     alert(body.error);
            // });
            alert(error)
        })
        
            // // Get all articles
            // fetch(
            //     `http://localhost:8080/auctions/articles/${data.data.auctionID}`
            // ).then(response => {
            //     if (response.ok) {
            //         return response.json();
            //     }else {
            //         throw response;
            //     }
            // }).then( (data) => {
            //     dispatch(setArticles(data.data));
            // })
        // }).catch(error => {
        //     error.json().then((body) => {
        //         setErrorMessage(body.error);
        //         return body.error;
        //     });
        // })
        
        
    }, [article.ID, dispatch]);

    const createBid = () => {
        const bid = {
            bidDate:new Date(), 
            userId:user.id, 
            articleId:article.ID, 
            bidAmount:(highestBid.bidAmount === 0 ? (Number.parseInt(article.initialOffering) + 10) : (Number.parseInt(highestBid.bidAmount) + 10) ),
        }
        // if (socket.readyState === 1) {
        //     socket.send(JSON.stringify(bid))
        // }else {
            fetch(`http://localhost:8080/bids`, {method: 'POST', body: JSON.stringify(bid)})
            .then(response => {
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
        // }
        
        
        
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
                    <h5>Highest bid : {highestBid === {} || highestBid.bidAmount === 0 ? article.initialOffering : highestBid.bidAmount} </h5>
                    {user.id === "" ? <Login></Login> : <Button variant="info" onClick={createBid}>Bid</Button>}
                    
                </div>
        </div>
        <ArticleCarousel articles={articles} />
        </div>
    )
}

export default Article