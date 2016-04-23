/**
 * Created by jason on 4/20/16.
 */
import * as requestService from './request'
import * as storageService from './storage'


export const req = {
	orderFood: ({id,token}) => {
		return requestService.post('/orders/' + id, {}, {
			'x-token': token
		})
		.then((res) => {
			return res
		}).catch((err) => {
			reject(err)
		})
	},

	getOrderByUserId: (id) => {
		return requestService.get('/orders/' + id)
		.then((res) => {
			return res
		})
	}
}