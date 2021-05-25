import React from 'react'
import './articleCard.css'
import {Link} from 'react-router-dom'



const ArticleCard = (props) => {
    var article = props.article;
    return ( 
                            <Link to={{pathname:`/article/${article.ID}`, state:{article}}}>
                                <div className="card border-white bg-light h-100">
                                    <div className="card-body">
                                        <img className="card-img-top mx-auto" src={article.photoURL} alt="test"/>
                                        <h5 className="card-title text-center">{article.title}</h5>
                                        <p className="card-text text-justify">{article.description}</p>
                                        <p className="card-text text-center">estim. {article.estimation} €</p>
                                    </div>
                                </div>
                            </Link>
    )
}


export default ArticleCard