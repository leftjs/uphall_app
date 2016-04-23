/**
 * Created by jason on 4/19/16.
 */
import foods from './food'
import user from './user'
import order from './order'
import message from './message'
import {combineReducers} from 'redux'
export default combineReducers({
	foods,
	user,
	order,
	message
})

