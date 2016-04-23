/**
 * Created by jason on 4/20/16.
 */
import * as types from './ActionTypes'
import {createAction} from 'redux-actions'
import * as userService from '../services/userService'

export const login = createAction(types.LOGIN, userService.req.login,({password, resolved, rejected}) => {
	return {
		password,
		resolved,
		rejected
	}
})

export const register = createAction(types.REGISTER, userService.req.register,({resolved, rejected}) => {
	return {
		resolved,
		rejected
	}
})


export const uploadAvatar = createAction(types.UPLOAD_AVATAR, userService.req.uploadAvatar,({resolved, rejected}) => {
	return {
		resolved,
		rejected
	}
})

export const getUserFromStorage = createAction(types.GET_USER_FROM_STORAGE, userService.storage.getUserFromStorage, ({resolved,rejected}) => {
	return {
		resolved,
		rejected
	}
})