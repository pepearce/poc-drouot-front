import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {setAuctions} from '../../actions/auctions'
import AuctionCard from './auction/auctionCard/auctionCard'
import './auctionsStyles.css'


const Auctions = (props) => {

    // const [auctions, setAuctions] = useState([])
    const auctions = useSelector(state => state.auctions)
    const dispatch = useDispatch();
    
    useEffect(() => {
        console.log(props.owner)
        if (props.owner !== undefined) {
            fetch(`http://localhost:8080/user/auctions/${props.owner}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            }).then(response => {
                dispatch(setAuctions(response.data))
            })
        }else {
            fetch('http://localhost:8080/auctions')
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            }).then(response => {
                dispatch(setAuctions(response.data))
            })
        }
        
    }, [dispatch, props.owner])

    return(
        <div className="container mb-2 pl-4">
            <div>
            <div className="border-bottom">
                        <a href="/auctions" className="bottom-line">UPCOMING AUCTIONS</a>
                      </div>
                <div className="row text-center">
                
                    {auctions === [] ? "Loading..." : auctions.map( (auction) => {
                        return(
                            <AuctionCard key={auction.ID} auction={auction}/>
                        )
                        
                    })}
                </div>
            </div>
        </div>
    )
}

export default Auctions
