import qs from 'query-string';
import config from '../configs';

//import fetch from 'isomorphic-fetch'
const urlPrefix = config.domain;


function filterJSON(res) {
	return res.json();
}


function filterStatus(res) {
	if (res.status >= 200 && res.status < 400) {
		return res
	}
	else {
		let error = new Error(res.statusText);
		error.res = res;
		error.type = 'http';
		throw error;
	}
}


export function get(url,params) {
	url = urlPrefix + url;
	if (params) {
		url += `?${qs.stringify(params)}`;
	}

	if (__DEV__) {
		console.info(`GET: `, url);
		console.info(`Params: `, params)
	}

	return fetch(url)
		.then(filterStatus)
		.then(filterJSON);
}


export function post(url, body, headers) {
	url = urlPrefix + url;

	if (__DEV__) {
		console.info(`POST: `, url);
		console.info(`Body: `, body)
		console.info(`Headers: `, headers)
	}

	return fetch(url, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			...headers
		},
		body: JSON.stringify(body)
	})
		.then(filterStatus)
		.then(filterJSON);
}
export function upload(url, path) {
	url = urlPrefix + url;

	if (__DEV__) {
		console.info(`POST: `, url);
		console.info(`Body: `, body)
	}

	return fetch(url, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'multipart/form-data',
		},
	})
		.then(filterStatus)
		.then(filterJSON);
}




