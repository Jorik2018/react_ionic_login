//import config from 'config';
import { accountService } from '../services/accountService.js';
import { useIonLoading } from '@ionic/react';
import React, { useState, useEffect } from 'react';

//const [showLoading, setShowLoading] = useState(true);
var loadingMask;

export const http = {
    get,
    post,
    put,
	loadingMask,
    delete: _delete,
	//ionic build --prod -- --base-href /vaccine/search/
	//baseHREF:'/dre/enrollment',
	baseHREF:'/vaccine/search',
	baseURL:'http://web.regionancash.gob.pe'
}

function scheme(url){
	if(!/^(f|ht)tps?:\/\//i.test(url)){
        return http.baseURL+url;
    }else
		return url;
}

function get(url) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(url)
    };
	if(http.loadingMask)http.loadingMask(true);
    return fetch(scheme(url), requestOptions).then(handleResponse);
}

function makeid(length:number) {
	var result           = '';
	var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for ( var i = 0; i < length; i++ ) {
		result += characters.charAt(Math.floor(Math.random() * 
		charactersLength));
	}
	return result;
}

function post(url, body, header) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader(url,header)},
        body: JSON.stringify(body)
    };
	if(http.loadingMask)http.loadingMask(true);
    return fetch(scheme(url), requestOptions).then(handleResponse);
}

function put(url, body) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeader(url) },
        body: JSON.stringify(body)
    };
	if(http.loadingMask)http.loadingMask(true);
    return fetch(http.baseURL+url, requestOptions).then(handleResponse);    
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(url)
    };
	if(http.loadingMask)http.loadingMask(true);
    return fetch(http.baseURL+url, requestOptions).then(handleResponse);
}

// helper functions

function authHeader(url,header) {
    // return auth header with jwt if user is logged in and request is to the api url
    const user = accountService.getUserValue();
    const isLoggedIn = user && user.jwtToken;
	
    //const isApiUrl = url.startsWith(config.apiUrl);
	if(header){
		return header;
	}else if (isLoggedIn /*&& isApiUrl*/) {
        return { Authorization: `Bearer ${user.jwtToken}` };
    } else {
        return {};
    }
}

function handleResponse(response) {
    return response.text().then(text => {
		if(http.loadingMask)http.loadingMask(false);
        if (!response.ok) {
			const data = text;
            /*if ([401, 403].includes(response.status) && accountService.userValue) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                accountService.logout();
            }*/
			response.message=data;
           // const error = (data && data.message) || response.statusText;
            return Promise.reject(response);
        }else{
			return JSON.parse(text);
		}
    });
}