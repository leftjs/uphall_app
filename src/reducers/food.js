/**
 * Created by jason on 4/19/16.
 */
import * as types from '../actions/ActionTypes'
import _ from 'lodash'

export default function (state = {}, action) {



	const {payload, error, meta = {}, type} = action
	const {sequence = {}} = meta
	if (sequence.type === 'start' || error) {
		return state;
	}

	var recommendedArr = []
	var hotArr = []
	var discountArr = []
	var breakfastArr = []
	var lunchArr = []
	var dinnerArr = []
	var allArr = []


	if (payload && Array.isArray(payload)) {

		allArr = payload
			for (let item of payload) {
				if (item.is_recommended) {
					recommendedArr.push({...item})
				}
				if (item.is_hot) {
					hotArr.push({...item})
				}
				if(item.discount< 1) {
					discountArr.push({...item})
				}
				if(item.is_breakfast){
					breakfastArr.push({...item})
				}
				if(item.is_lunch) {
					lunchArr.push({...item})
				}
				if(item.is_dinner) {
					dinnerArr.push({...item})
				}

			}
	}




	switch (type){
		case types.GET_FOODS_DATA:
			return {
				...state,
				all: [...allArr],
				recommended: [...recommendedArr],
				hot: hotArr,
				discount: discountArr,
				breakfast: breakfastArr,
				lunch: lunchArr,
				dinner: dinnerArr

			}
		default:
			return state
	}
}