import * as actionTypes from './actionTypes'


export const setArticle = (article) => ({
    type: actionTypes.ARTICLE,
    payload: {
        article
    } 
})