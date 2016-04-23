/**
 * Created by jason on 4/20/16.
 */
import * as requestService from './request'
import * as storageService from './storage'
import config from '../configs';

const urlPrefix = config.domain;

import {NativeModules} from 'react-native'



export const req = {

	likeFood: ({id}) => {
		return requestService.get('/foods/' + id + '/like').then((res) => {
			return res
		})
	},

	getFoods: function() {
		return requestService.get('/foods').then((res) => {
			return res

		})
	},
	publishFood: function(body,{source}) {
		return requestService.post('/foods',JSON.parse(body)).then((res) => {
			let id = res._id

			let files = [
				{
					name: 'file[]',
					filename: 'image.jpeg',
					filepath: source,
					filetype: 'image/jpeg',
				},
			];

			let opts = {
				url: urlPrefix + '/foods/'+ id +'/upload',
				files: files,
				method: 'POST',                             // optional: POST or PUT
				//headers: { 'Accept': 'application/json' },  // optional
				//params: { 'user_id': 1 },                   // optional
			};


			NativeModules.RNUploader.upload( opts, (err, response) => {
				if( err ){
					console.log(err);
					return;
				}

				let status = response.status;
				let responseString = response.data;
				let json = JSON.parse( responseString );
				console.log('json',json)
				console.log('upload complete with status ' + status);
			});

		})
	},

	uploadFoodPhoto: function({data,id}) {
		return requestService.post('/foods/' + id + '/upload',{
			icon: data
		},{
			"Content-Type": "multipart/form-data"
		}).then((res) => {
			return res
		})
	}
}