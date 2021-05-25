import React from 'react'
import './auctionStyles.css'
import {Link} from 'react-router-dom'


const AuctionCard = (props) => {
    let months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Décembre"];
     let week = ["Lundi", "Mardi","Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
    var auction = props.auction;
    var startDate = new Date(Date.parse(auction.startDate));
    //var endDate = new Date(Date.parse(auction.endDate));
    var formatedStartDate = week[startDate.getDay()] + " " +  startDate.getDate().toString() + " "  + months[startDate.getMonth()] + " - "  + startDate.getHours() + ":" + startDate.getMinutes() + "(CEST)"
    return (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 my-3">
            <Link to={`/auctions/articles/${auction.ID}`}>
            <div className="card border-white bg-light h-100">
                <div className="card-body">
                    <img className="card-img-top" src={auction.photoURL} alt="test"/>
                    <h5 className="card-title text-center">{auction.title}</h5>
                    <p className="card-text text-left auction-date">
                        {formatedStartDate}
                    </p>
                </div>
            </div>
            </Link>
        </div>
    )
}



export default AuctionCard