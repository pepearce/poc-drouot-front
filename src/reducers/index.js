import LoginReducer from './login'
import {combineReducers} from 'redux'
import UserReducer from './userReducer'
import AuctionsReducer from './auctionsReducer'
import ArticlesReducer from './articlesReducer'
import BidReducer from './bidReducer'
import ArticleReducer from './articleReducer'
import { sessionReducer } from 'redux-react-session'

const allReducers = combineReducers({
    login: LoginReducer,
    user: UserReducer,
    auctions: AuctionsReducer,
    articles: ArticlesReducer,
    article: ArticleReducer,
    bid: BidReducer,
    session: sessionReducer
})

export default allReducers