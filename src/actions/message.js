/**
 * Created by jason on 4/22/16.
 */
import * as types from './ActionTypes'
import {createAction} from 'redux-actions'
import * as messageService from '../services/messageService'


export const postMessage = createAction(types.POST_MESSAGE, messageService.req.postMessage,({resolved,rejected}) => {
	return {
		resolved,
		rejected
	}
})

export const getMessages = createAction(types.GET_MESSAGES, messageService.req.getMessages)