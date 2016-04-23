import { createAction } from 'redux-actions';
import * as types from './ActionTypes';


export const toast = createAction(types.TOAST, (text, timeout)=> {
	return {
		text,
		timeout,
		id: new Date().getTime()
	}
});
