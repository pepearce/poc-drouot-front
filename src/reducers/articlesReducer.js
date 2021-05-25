import * as actionTypes from '../actions/actionTypes'



const ArticlesReducer = (state = [], action) => {
    switch (action.type) {
        case actionTypes.ARTICLES :
            return action.payload.articles;
        default:
            return state;
    }
}

export default ArticlesReducer
