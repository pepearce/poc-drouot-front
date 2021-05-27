import React from 'react'
import ReactDom from 'react-dom'
import App from './App'
import './styles/globalStyles.css'
import {createStore} from 'redux'
import allReducers from './reducers'
import {Provider} from 'react-redux'

const reactContentRoot = document.getElementById("root")
const store = createStore(allReducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())


// Provider gives access to the store to the whole app
ReactDom.render(
<Provider store={store}>
<App />
</Provider>
, reactContentRoot) 