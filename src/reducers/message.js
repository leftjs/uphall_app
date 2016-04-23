/**
 * Created by jason on 4/21/16.
 */
import * as types from '../actions/ActionTypes'

export default function (state=[],action) {

	const {payload = [], error, meta = {}, type} = action
	const {sequence = {}} = meta
	if (sequence.type === 'start' || error ) {
		return state;
	}
	const {messages} = payload

	switch (type) {

		case types.GET_MESSAGES:
			return [
				...messages
			]
		default:
			return state
	}
}