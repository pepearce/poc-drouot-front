import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setArticles } from '../../../actions/articlesAction';
import Articles from './articles/Articles';



function Auction({match}){
    const articles = useSelector(state => state.articles);

    const dispatch = useDispatch()
    useEffect(() => {
        // Get all articles from selected auction
        fetch(
            `http://localhost:8080/auctions/articles/${match.params.id}`
        ).then(response => {
            if (response.ok) {
                return response.json();
            }
        }).then( (data) => {
            dispatch(setArticles(data.data));
        })
    }, [dispatch, match.params.id])
    return(
        <div>
            <Articles searchedList={articles} />
        </div>
    )
}

export default Auction