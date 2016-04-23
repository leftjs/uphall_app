/**
 * Created by jason on 4/20/16.
 */
import * as requestService from './request'
import * as storageService from './storage'


export const req = {
	postMessage: function ({token,content}){
		return requestService.post('/messages',{
			content
		},{
			"x-token": token
		}).then((res) => {
			return res
		})
},

	getMessages: function () {
		return requestService.get('/messages').then((res) => {
			return res
		})
	}
}