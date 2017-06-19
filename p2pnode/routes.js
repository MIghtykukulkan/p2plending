//here only routing is done and if the ro

'use strict';
/*
const auth = require('basic-auth');
const jwt = require('jsonwebtoken');
*/
const register = require('./functions/register');
const createCampaign = require('./functions/createCampaign');
const login = require('./functions/login');
const date = require('date-and-time');
const postbid = require('./functions/postbid');
//const profile = require('./functions/profile');
//const password = require('./functions/password'); 
//const config = require('./config1/config.json');

module.exports = router => {
      
	  router.get('/', (req, res) => res.end('Welcome to p2plending,please hit a service !'));

	   router.post('/login', (res, req) => {
		console.log("request obj " + req);

		var str = JSON.stringify(req.email1);

		console.log("stringify json obj"+str);

		const email1 = req.body.email1;
	     console.log(`email1 from ui side`,email1);
		const passpin = req.body.passpin;
	    console.log(passpin,'passpin from ui');
        
		

		if (!email1 ||!passpin  || !email1.trim() ||!passpin.trim() ) {

			res.status(400).json({ message: 'Invalid Request !' });

		} else {

			login.loginUser(email1,passpin)

			.then(result => {

             var token = "";
             var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789rapidqubepvtltd";

             for( var i=0; i < 25; i++ )
             text += possible.charAt(Math.floor(Math.random() * possible.length));

            console.log (token);
			
				res.status(result.status).json({ message: result.message, token: token });

			})

			.catch(err => res.status(err.status).json({ message: err.message }));
		}
	});
	           router.post('/testmethod', function(req, res) {
               console.log(req.body)
               res.send({ "name": "risabh", "email": "rls@gmail.com" });
});

	console.log("entering register function in functions");

	router.post('/registerUser', (req, res) => {
        const id = req.body.id;
		console.log("data in id:"+id);
		const name = req.body.name;
		console.log("data in name:"+name);
		const email = req.body.email;
		console.log("data in email:"+email);
	    const phone = req.body.phone;
		console.log("data in phone:"+phone);
		const pan= req.body.pan;
		console.log("data in pan:"+pan);
		const aadhar = req.body.aadhar;
		console.log("data in aadhar:"+aadhar);
	    const usertype = req.body.usertype;
		console.log("data in usertype:"+usertype);
		const upi = req.body.upi;
		console.log("data in upi:"+upi);
		const passpin = req.body.passpin;
		console.log("data in passpin:"+passpin);
		
			
     
		if (!id ||!name || !email || !phone || !pan ||!aadhar ||!usertype ||!upi ||!passpin || !id.trim()|| !name.trim() ||!email.trim()||!phone.trim()
		|| !pan.trim() ||!aadhar.trim()|| !usertype.trim()||!upi.trim()||!passpin.trim()) {
             //the if statement checks if any of the above paramenters are null or not..if is the it sends an error report.
			res.status(400).json({message: 'Invalid Request !'});

		} else {
			console.log("register object"+ register)
			
			register.registerUser(id,name,email,phone,pan,aadhar,usertype,upi,passpin)
			.then(result => {

			//	res.setHeader('Location', '/registerUser/'+email);
				res.status(result.status).json({ message: result.message })
			})

			.catch(err => res.status(err.status).json({ message: err.message }));
		}
	});

	router.post('/createCampaign', (req, res) => {
          const  status = req.body.status;
		  const campaign_id = req.body.campaign_id;
		  const user_id=req.body.user_id;
		  const	campaign_title=req.body.campaign_title;
          const campaign_discription= req.body.campaign_discription;
		  const loan_amt=req.body.loan_amt;
		  const interest_rate= req.body.interest_rate;
		  const term=req.body.term;

		
			
     
		if (!status || !campaign_id || !user_id || !campaign_title  ||!campaign_discription ||!loan_amt ||!interest_rate ||!term || !status.trim() ||!campaign_id.trim()||!user_id.trim()
		|| ! campaign_title.trim() ||!campaign_discription.trim()|| !loan_amt.trim()||!interest_rate.trim()||!term.trim()) {
             //the if statement checks if any of the above paramenters are null or not..if is the it sends an error report.
			res.status(400).json({message: 'Invalid Request !'});

		} else {
			
			createCampaign.Create_Campaign(status,campaign_id,user_id,campaign_title,campaign_discription,loan_amt,interest_rate,term)
			.then(result => {

			//	res.setHeader('Location', '/registerUser/'+email);
				res.status(result.status).json({ message: result.message })
			})

			.catch(err => res.status(err.status).json({ message: err.message }));
		}
	});
	router.post('/postbid', (req, res) => {
		//let now = new Date();
        const bid_id = req.body.bid_id;
		console.log("bid id  "+bid_id);
		//date.format(now, 'YYYY/MM/DD HH:mm:ss');
		const bid_creation_time = req.body.bid_creation_time;
		console.log("bid creation time "+bid_creation_time); 
		const bid_campaign_id = req.body.bid_campaign_id;
		console.log("bid_campaign_details  "+bid_campaign_id);
		const bid_user_id = req.body.bid_user_id;
		console.log("bid_user_id "+bid_user_id);
		const bid_quote = req.body.bid_quote;

			
     
		if (!bid_id ||!bid_creation_time || !bid_campaign_id || !bid_user_id || !bid_quote || !bid_id.trim()|| !bid_creation_time.trim() ||!bid_campaign_id.trim()||!bid_user_id.trim()
		|| !bid_quote.trim()) {
             //the if statement checks if any of the above paramenters are null or not..if is the it sends an error report.
			res.status(400).json({message: 'Invalid Request !'});

		} else {
			
			
			postbid.postbid(bid_id,bid_creation_time,bid_campaign_id,bid_user_id,bid_quote)
			.then(result => {

			//	res.setHeader('Location', '/registerUser/'+email);
				res.status(result.status).json({ message: result.message })
			})

			.catch(err => res.status(err.status).json({ message: err.message }));
		}
	});
}