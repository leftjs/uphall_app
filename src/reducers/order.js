/**
 * Created by jason on 4/21/16.
 */
import * as types from '../actions/ActionTypes'

export default function (state=[],action) {

	const {payload, error, meta = {}, type} = action
	const {sequence = {}} = meta
	if (sequence.type === 'start' || error ) {
		return state;
	}

	switch (type) {
		case types.GET_ORDER_BY_USERID:
			return [
				...payload
			]
		default:
			return state
	}
}