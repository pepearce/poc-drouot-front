import * as actionTypes from './actionTypes'


export const setArticles = (articles) => ({
    type: actionTypes.ARTICLES,
    payload: {
        articles: articles
    } 
})