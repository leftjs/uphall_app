/**
 *
 * Created by jason on 4/19/16.
 */

import * as types from './ActionTypes'
import {createAction} from 'redux-actions'
import * as orderService from '../services/orderService'

export const orderFood = createAction(types.ORDER_FOOD, orderService.req.orderFood, ({id},resolved,rejected) =>{
return {
	id,
	resolved,
	rejected
}
})


export const getOrderByUserId = createAction(types.GET_ORDER_BY_USERID, async(id) => {
	return orderService.req.getOrderByUserId(id)
})