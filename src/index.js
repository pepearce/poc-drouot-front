import React from 'react'
import ReactDom from 'react-dom'
import App from './App'
import './styles/globalStyles.css'
import {createStore} from 'redux'
import allReducers from './reducers'
import {Provider} from 'react-redux'
import { sessionService } from 'redux-react-session';

const reactContentRoot = document.getElementById("root")
const store = createStore(allReducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

// Set options for session service
const options = { driver: 'COOKIES' };
// Initialize session service from redux
sessionService.initSessionService(store, options)
.then(() => console.log('Redux React Session is ready'));

// Provider gives access to the store to the whole app
ReactDom.render(
<Provider store={store}>
<App />
</Provider>
, reactContentRoot) 