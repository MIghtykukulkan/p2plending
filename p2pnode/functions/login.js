'use strict';

//const user = require('../blockchai');
var user = 'risabh.s';
var bcSdk = require('../src/blockchain/blockchain_sdk.js');


exports.loginUser = (email, passpin) => {

	return new Promise((resolve,reject) => {
		const ui_login =({
			email: email,
			passpin: passpin
		});
		
		

                 bcSdk.User_login({user:user, ui_login:ui_login})
				   /*
						
			console.log("ENTERING THE login MODULE");
		     
*/
			.then(function(emailFromsdk)
			{
				 var token = "";
                 var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                    for (var i = 0; i < 25; i++)
                   token += possible.charAt(Math.floor(Math.random() * possible.length));
				  return resolve({ status: 201,token:token,emailFromsdk:emailFromsdk,message:"sucessfully logged in"})
		})

			.catch(err => {

			if (err.code == 11000) {
						
				return reject({ status: 409, message: 'some params are wrong please check !' });

			} else {
				console.log(JSON.stringify(err));

	}
					})
	
	})};