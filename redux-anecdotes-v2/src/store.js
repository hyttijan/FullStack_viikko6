import { createStore, combineReducers,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {anecdoteReducer} from './reducers/anecdoteReducer'
import {notificationReducer} from './reducers/notificationReducer'
import {filterReducer} from './reducers/filterReducer'
const store = createStore(combineReducers({anecdoteReducer:anecdoteReducer,notificationReducer:notificationReducer,filterReducer:filterReducer}),
	                      applyMiddleware(thunk))


export default store