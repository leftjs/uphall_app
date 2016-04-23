/**
 *
 * Created by jason on 4/19/16.
 */

import * as types from './ActionTypes'
import {createAction} from 'redux-actions'
import * as foodService from '../services/foodService'

export const getFoods = createAction(types.GET_FOODS_DATA, async () => {
	return await foodService.req.getFoods()
})

export const publishFood = createAction(types.PUBLISH_FOOD, foodService.req.publishFood)

export const uploadFoodImage = createAction(types.UPLOAD_FOOD_PHOTO, foodService.req.uploadFoodPhoto,({id},resolved,rejected) => {
	return {
		resolved,
		rejected
	}
})

export const likeFood = createAction(types.LIKE_FOOD, foodService.req.likeFood,({id,resolved,rejected}) => {
	return {
		id,
		resolved,
		rejected
	}
})