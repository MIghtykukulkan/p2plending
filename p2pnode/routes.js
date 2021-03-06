//here only routing is done and if the ro

'use strict';

const register = require('./functions/register');
const createCampaign = require('./functions/createCampaign');
const login = require('./functions/login');
const postbid = require('./functions/postbid');
const fetchCampaignlist =require('./functions/fetchCampaignlist');
const fetchActiveCampaignlist =require('./functions/fetchActiveCampaignlist');

module.exports = router => {
      
	  router.get('/', (req, res) => res.end('Welcome to p2plending,please hit a service !'));

	

	router.post('/registerUser', (req, res) => {
        const nid =  Math.floor(Math.random() * (100000 - 1)) + 1;
		const id = nid.toString();
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

				res.status(result.status).json({ message: result.message })
			})

			.catch(err => res.status(err.status).json({ message: err.message }));
		}
	});

	
	  router.post('/login', (req,res) => {
		const email = req.body.email;
	     console.log(`email from ui side`,email);
		const passpin = req.body.passpin;
	    console.log(passpin,'passpin from ui');
        
		if (!email ||!passpin  || !email.trim() ||!passpin.trim() ) {

			res.status(400).json({ message: 'Invalid Request !' });

		} else {

			login.loginUser(email,passpin)
		
                          
			.then(result => {
				if(result.emailid.body.length>1){
				return res.json({status:result.emailid.statusCode,token:result.token,email:result.emailid.body});
                   
					}
				else{
					return res.json({status:409,message:"inavlid user credentials"})
				}})

			.catch(err => res.status(err.status).json({ message: err.message }));
		}}
	);

	router.post('/createCampaign', (req, res) => {
          const  status = req.body.status;
		  const campaign_id123 =  Math.floor(Math.random() * (100000 - 1)) + 1;
		const campaign_id = campaign_id123.toString();
		console.log("data in id:"+campaign_id);
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
				res.status(result.status).json({status:201, message: result.message })
			})

			.catch(err => res.status(err.status).json({ status:401,message: err.message }));
		}
	});
	router.post('/postbid', (req, res) => {
       const bid =  Math.floor(Math.random() * (100000 - 1)) + 1;
		const bid_id = bid.toString();
		console.log("data in id:"+bid_id); 
		const bid_campaign_id = req.body.bid_campaign_id;
		console.log("bid_campaign_details  "+bid_campaign_id);
		const bid_user_id = req.body.bid_user_id;
		console.log("bid_user_id "+bid_user_id);
		const bid_quote = req.body.bid_quote;

			
     
		if (!bid_id  || !bid_campaign_id || !bid_user_id || !bid_quote || !bid_id.trim() ||!bid_campaign_id.trim()||!bid_user_id.trim()|| !bid_quote.trim()) {
             //the if statement checks if any of the above paramenters are null or not..if is the it sends an error report.
			res.status(400).json({message: 'Invalid Request !'});

		} else {
			
			
			postbid.postbid(bid_id,bid_campaign_id,bid_user_id,bid_quote)
			.then(result => {

			//	res.setHeader('Location', '/registerUser/'+email);
				res.status(result.status).json({ message: result.message })
			})

			.catch(err => res.status(err.status).json({ message: err.message }));
		}
	});
		router.get('/campaign/Campaignlist', (req,res) => {
           if (1==1) {
          
		 	fetchCampaignlist.fetch_Campaign_list({"user":"risabh","getcusers":"getcusers"})

			.then(function(result){
					res.json(result)
			} )

			.catch(err => res.status(err.status).json({ message: err.message }));

		} else {

			res.status(401).json({ message: 'cant fetch data !' });
		}
	});

	router.get('/campaign/openCampaigns', (req,res) => {
           if (1==1) {
          
		 	fetchActiveCampaignlist.fetch_Active_Campaign_list({"user":"risabh","getcusers":"getcusers"})

			.then(function(result){
			//	console.log("result array data"+result.campaignlist.body.campaignlist);

				     var filteredcampaign=[];
				 //  console.log("length of result array"+result.campaignlist.body.campaignlist.length);
                    for(let i=0;i<result.campaignlist.body.campaignlist.length;i++){
	 
	         if(result.campaignlist.body.campaignlist[i].status==="active"){
     
		 filteredcampaign.push(result.campaignlist.body.campaignlist[i]);
			

	} else if (result.campaignlist.body.campaignlist[i].status !=="active") {

        return res.json({status:409,message:'campaign not found'});
		}

		        
	}
           		return res.json({message:"active campaigns found",filteredcampaign:filteredcampaign});
})

		.catch(err => res.status(err.status).json({ message: err.message }));

		}else {

			return res.status(401).json({ message: 'cant fetch data !' });
		}

	});
/*	router.post('/login', function(req, res) {

    console.log(req.body)

    res.send({ 
  "message": "user logged in successfully",
  "status": 201,
  "token": "d290f1ee6c544b0190e6d701748f0851" });
});*/
router.get('/logout', function(req, res) {

    console.log(req.body)

    res.send({ 
  "message": "user logged out successfully",
  "status": 201,
   });
});
}