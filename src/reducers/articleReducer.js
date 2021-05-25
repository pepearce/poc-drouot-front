import * as actionTypes from '../actions/actionTypes'



const ArticleReducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.ARTICLE :
            return action.payload.article;
        default:
            return state;
    }
}

export default ArticleReducer
