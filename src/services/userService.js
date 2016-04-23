/**
 * Created by jason on 4/20/16.
 */
import * as requestService from './request'
import * as storageService from './storage'
import {NativeModules} from 'react-native'
import config from '../configs'
const urlPrefix = config.domain;

export const storage = {
	getUserFromStorage: () => {
		return storageService.getItem("user").then(user => {
			if (user){
				return user
			}
			throw 'User is not Exists'
		})
	}
}

export const req = {
	login: ({username, password}) => {

		storageService.setItem('user', {username, password})
		return requestService.post('/users/login', {
			username,
			password
		}).then(res => {

			return res
		})
	},
	register: ({name, username, password}) => {
		return requestService.post('/users/register',{
			name,
			username,
			password
		}).then(res => {
			return res
		})
	},
	uploadAvatar: function({id,source}) {

		let files = [
			{
				name: 'file[]',
				filename: 'image.jpeg',
				filepath: source,
				filetype: 'image/jpeg',
			},
		];

		let opts = {
			url: urlPrefix + '/users/'+ id +'/upload',
			files: files,
			method: 'POST',                             // optional: POST or PUT
			//headers: { 'Accept': 'application/json' },  // optional
			//params: { 'user_id': 1 },                   // optional
		};


		let promisify = (fn, receiver) => {
			return (...args) => {
				return new Promise((resolve, reject) => {
					fn.apply(receiver, [...args, (err, res) => {
						return err ? reject(err) : resolve(res);
					}]);
				});
			};
		};


		let uploadPromise = promisify(NativeModules.RNUploader.upload, NativeModules.RNUploader)

		return uploadPromise(opts).then((res) => {
			return res
		})
		//NativeModules.RNUploader.upload( opts, (err, response) => {
		//	if( err ){
		//		console.log(err);
		//		return;
		//	}
		//
		//
		//
		//	let status = response.status;
		//	let responseString = response.data;
		//	let json = JSON.parse( responseString );
		//	console.log('json',json)
		//	console.log('upload complete with status ' + status);
		//})

	}
}