import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useLocation, useNavigate } from 'react-router-dom';

import { Container,
	 Paper, 
	 Typography,
	 Box, 
	 TextField, 
	 InputAdornment, 
	 IconButton, 
	 FormControl,
	InputLabel, 
	Select, 
	MenuItem, 
	Button
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";

const  Registration=()=>{
	const [showPassword, setShowPassword]      = useState(false);
	const [showcrmPassword,setShowCrmPassword] = useState(false);
	const [message, setMessage] = useState('');
    const [bonusInfo, setBonusInfo] = useState(null);
	const [deliverytimefrom, setDeliveryTimeFrom] = useState(moment().format("HH:mm"));
    const [deliverytimeto, setDeliveryTimeTo] = useState(moment().format("HH:mm"));
	const [details,setDetails] = useState('')
	const [search,setsearch] = useState([])
	const navigate = useNavigate()
	const [error, setError]                    = useState('');
	const [success,setsuccess]                 = useState('')
	const [isValidRefid, setIsValidRefid] = useState(true);
	const [adminKey,setAdminKey] = useState('') ;
	const [shopOwnerKey,setShopOwnerKey] = useState('');
	const location = useLocation();
    const { phoneNumber } = location.state || {};
	const [otpdetails,setOtpDetails] = useState({
		userid :"",
		phno   :""
	})
	const [userDetails,setUserDetails]        =  useState({
		userid :"",
		// phno:"",
		email:"",
		useraddress:"",
		userpincode:"",
		refid1 :"",
		refid2:"",
		refid3:"",
		upiNumber :"",

	})

	const [shopDetails,setShopdetails] = useState({
		shopid :'',
		shopname:'',
		shopaddress:"",
		shoppin:'',
		shopcontactnum:"",
	})

	// const [adminDetails,setAdminDetails] = useState({
	// 	userid :'',
	// 	phno   :'',
	// 	email  :'',
	// })

	const [loginDetails,setLoginDetails] =  useState({
		userid : '',
		password :'',
		crmpassword:"",
		usertype:"",
	})
	const [filteredSearch, setFilteredSearch] = useState([]);

	console.log(userDetails);

	const handleDropdownSelect = (value) => {
		setUserDetails((prevState) => ({
			...prevState,
			refid1: value,
		}));
		setFilteredSearch([]); // Clear dropdown after selection
		setIsValidRefid(true); 
	};
	

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleClicShowcrmPassword=()=>{
		setShowCrmPassword(!showcrmPassword)
	}

	const shopChangeFunction=(event)=>{
		const {name,value} = event.target;
		setShopdetails((prevstate)=>({
			...prevstate,
			[name] : value
		}))
	}

	const onChangeFunction=(event)=>{
		const { name, value } = event.target;
		if (name === "userid") {
			// Update both userDetails and loginDetails
			setUserDetails((prevState) => ({
				...prevState,
				userid: value,
			}));
			setLoginDetails((prevState) => ({
				...prevState,
				userid: value,
			}));
			setOtpDetails((prevstate)=>({
				...prevstate,
				userid : value,
			}))
		} else if(name === "refid1"){
			setUserDetails((prevState) => ({
				...prevState,
				[name]: value,
			}));

			// Filter dropdown results based on the input value
			const filtered = search.filter((item) =>
				item.userid.toLowerCase().includes(value.toLowerCase())
			);
               
			setFilteredSearch(filtered);
     		 setIsValidRefid(false);
		}
		
		else if (name in userDetails) {
			setUserDetails((prevState) => ({
				...prevState,
				[name]: value,
			}));
		} else if (name in loginDetails) {
			setLoginDetails((prevState) => ({
				...prevState,
				[name]: value,
			}));
		}
		// }else if (name in adminDetails){
		// 	setAdminDetails((prevState)=>({
		// 		...prevState,
		// 		[name] : value,
		// 	}))
		// }
	}

	console.log(userDetails);
	

	const array = {
		userids  : userDetails.userid,
		phno : userDetails.phno,
		RegisterOtp : Math.floor(100000 + Math.random() * 900000),
	}

	console.log(array);
	
	
	// console.log(adminDetails);

	const adminValidateForm=()=>{
		
		if(loginDetails.password !== loginDetails.crmpassword){
			setError('Password do not match')
			return false
		}
		if(loginDetails.password.length<6){
			setError('password must be at least 6 characters Long')
			return false
		}
		setError('')
		return true

	}

	const shopOwnerForm =()=>{
		if(loginDetails.password !== loginDetails.crmpassword){
			setError('Password do not match')
			return false
		}
		if(loginDetails.password.length<6){
			setError('password must be at least 6 characters Long')
			return false
		}

	}
	

	const validateForm=()=>{
		const phoneNumberPattern = /^[0-9]{10}$/;
		
		if(!phoneNumberPattern.test(userDetails.upiNumber)){
			setError('Upi Number Must be Exactly 10 Digits')
			return false
		}
		if(loginDetails.password !== loginDetails.crmpassword){
			setError('Password do not match')
			return false
		}
		if(loginDetails.password.length<6){
			setError('password must be at least 6 characters Long')
			return false
		}
		if (!isValidRefid) {
			setError('Invalid refid1. Please select a valid referral ID.');
			return false;
		  }
		setError('')
		return true
		
	}
	
	console.log(message);
	console.log(bonusInfo);



	useEffect(() => {
		const fetchFruitsProduct = async () => {
			try{
				if(loginDetails.usertype === "customer"){
					const res = await axios.get(process.env.REACT_APP_API_BASE_URL + '/referrals')
					console.log(res.data);
					setsearch(res.data)
				}
				console.log("((((((((");
				
			}catch(err){
               console.log(err);
			   
			}
		}

		fetchFruitsProduct()
	},[loginDetails.usertype])

	
	console.log(search);
	console.log(adminKey);
	
	

	const submitFunction = async (event) => {
		event.preventDefault();
		
		
        if(loginDetails.usertype === "admin" || loginDetails.usertype === "superUser"){

			const admindata = {
				userid : userDetails.userid,
				email  : userDetails.email,
				phno   : phoneNumber
			}
			const adminkeys = 'admin$*1678'
			try{
				if (adminValidateForm() && (adminkeys === adminKey)) {
				const res = await axios.post(process.env.REACT_APP_API_BASE_URL + '/adminPage', admindata);
				console.log(res);
				const { crmpassword, ...rest } = loginDetails;  // Exclude crmpassword from login data
				const loginResponse = await axios.post(process.env.REACT_APP_API_BASE_URL + '/userLogin', rest);
				setsuccess('Admin  Successfully Registered')
				// setError('shop  Successfully Registered');

				setTimeout(() => {
					navigate('/');
				}, 4000);
			}

				

			}catch(err){

			}

		}
		else
		if(loginDetails.usertype === "showOwner"){
			const dateTimeObj = {
				shopcontactnum : phoneNumber,
				deliverytimefrom,
				deliverytimeto,
				userid : userDetails.userid
			  };
			  const addShopDetails = { ...shopDetails, ...dateTimeObj };
			  console.log(addShopDetails);
			  const shopsKeys = 'shop@$9876'
			
			  try{
				if(adminValidateForm() && (shopsKeys === shopOwnerKey)){

					const res = await axios.post(process.env.REACT_APP_API_BASE_URL + '/shops', addShopDetails);
					console.log(res);
					const { crmpassword, ...rest } = loginDetails;  // Exclude crmpassword from login data
					const loginResponse = await axios.post(process.env.REACT_APP_API_BASE_URL + '/userLogin', rest);
					
					// setError('shop  Successfully Registered');
					setsuccess('shop  Successfully Registered')
		
					// After a 2-second delay, navigate to the next page
					setTimeout(() => {
						navigate('/');
					}, 4000);
					 setShopdetails({
						shopid:'',
						shopaddress:'',
						shopname:'',
						shopcontactnum:'',
						shoppin :''
					
					 })
					 setDeliveryTimeFrom('')
					 setDeliveryTimeTo('')
				}
               

			  }catch(err){

			  }
			  
			
		}else
			try {
				// Define the referral object
				const refferalId = {
					userid: userDetails.userid,
					refid1: userDetails.refid1,
					
				};
	
				if (loginDetails.usertype === "customer") {
					// Call customer registration API
					if (validateForm()) {

						 userDetails.phno = phoneNumber;
					const customerResponse = await axios.post(process.env.REACT_APP_API_BASE_URL + '/customer', userDetails);
	
					// If customer registration is successful, call the referral API
					const referralResponse = await axios.post(process.env.REACT_APP_API_BASE_URL + '/refferalId', refferalId);
	
					console.log('Response from referral server:', referralResponse.data);
					setMessage(customerResponse.data.message);
					setBonusInfo(customerResponse.data.bonuses);
	
					console.log('Customer Bonuses:', customerResponse.data.bonuses);
					console.log('Customer Response:', customerResponse.data);
	
					// Update user details with additional referral information
					setUserDetails({
						refid2: customerResponse.data.userDetails.refferrerOfRefferrerid,
						refid3: customerResponse.data.userDetails.referrerOfReferrerOfReferrerid
					});
	

					// Set success message
					setMessage(`Success: ${customerResponse.data.message}. Bonuses: ${JSON.stringify(customerResponse.data.bonuses)}`);

					// Only after successful customer registration, call the userLogin API
				const { crmpassword, ...rest } = loginDetails;  // Exclude crmpassword from login data
				const loginResponse = await axios.post(process.env.REACT_APP_API_BASE_URL + '/userLogin', rest);
	
				console.log('Response from server:', loginResponse.data);
				console.log(userDetails);
	
				// Set success message for the final registration process
				// setError(' Successfully Registered');
				setsuccess('Successfully Registered')
	
				// After a 2-second delay, navigate to the next page
				setTimeout(() => {
					navigate('/');
				}, 2000);
	
				// Reset the form fields after submission
				setLoginDetails({
					userid: '',
					password: '',
					crmpassword: '',
					usertype: ''
				});
	
				setUserDetails({
					userid: '',
					// phno: '',
					email: '',
				});
				}
				}
				
	
				
	
			} catch (err) {
				console.error('Error during registration:', err);
	
				if (err.response) {
					// If server responded with a specific error
					setError(`Registration failed: ${err.response.data.error}`);
				} else {
					// Handle any other errors (like network issues)
					setError('An error occurred. Please try again.');
				}
			}
		}
	
	
	

    return(
        <>
          <Container component="main" maxWidth="xs">
              <Paper  elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
			  <Typography style={{fontWeight:"bolder",marginTop:"10px"}} variant="h5" >Registation Form</Typography>
                  {/* <Typography style={{fontWeight:"bold",marginTop:"10px"}} variant="h5" color="primary">Registation Form</Typography> */}
                   <Box component="form" >
                      <TextField
                          id = "userid"
                          name = "userid"
                          label = "UserId"
                          variant="standard"
						  value={userDetails.userid}
                          placeholder="Enter the UserId"
                          margin="normal"
						  onChange={onChangeFunction}
                          fullWidth
                          required
                          >
                      </TextField>
					  
					  <TextField
					  id ="password"
					  name = "password"
					  label="PassWord"
					  value={loginDetails.password}
					  placeholder="Enter the UserPassword"
					  variant="standard"
					  fullWidth
					  error={!!error && error.includes('Password')}
				
					helperText={error && error.includes('Password') ? error : ''}
					  onChange={onChangeFunction}
					  required
					  margin="normal"
					  type={showPassword ? 'text' : 'password'}
					  InputProps={{
						endAdornment:(
							<InputAdornment position="end">
								<IconButton edge="end" onClick={handleClickShowPassword}>
									{showPassword?<VisibilityOff/>:<Visibility/>}
								</IconButton>
							</InputAdornment>
						)
					  }}
					  >
					  </TextField>
					  <TextField
					  id ="crmpassword"
					  name = "crmpassword"
					  label="ConfirmPassword"
					  value={loginDetails.crmpassword}
					  placeholder="Enter the ConfirmPassword"
					  variant="standard"
					  error={!!error && error.includes('match')}
					  helperText={error && error.includes('match') ? error : ''}
					  fullWidth
					  onChange={onChangeFunction}
					  required
					  margin="normal"
					  type={showcrmPassword ? 'text' : 'password'}
					  InputProps={{
						endAdornment:(
							<InputAdornment position="end">
								<IconButton edge="end" onClick={handleClicShowcrmPassword}>
									{showPassword?<VisibilityOff/>:<Visibility/>}
									
								</IconButton>
							</InputAdornment>
						)
					  }}
					  >
					  </TextField>
					  {/* <TextField
							id="phno"
							name="phno"
							type="text"
							variant="standard"
							label="Phone Number"
							// value={userDetails.phno}
							value={phoneNumber}
							placeholder="Enter Phone Number"
							fullWidth
							onChange={onChangeFunction}
							// required
							margin="normal"
						/> */}
						<TextField
							id="email"
							name="email"
							type="email"
							label="Email Id"
							placeholder="Enter Your emailId"
							value={userDetails.email}
							onChange={onChangeFunction}
							fullWidth
							required
							variant="standard"
							margin="normal"
							style={{marginBottom:"10px"}}>

						</TextField>
						<FormControl fullWidth>
							<InputLabel id="userType">UserType</InputLabel>
							<Select
								labelId="userType"
								id="usertype"
								name="usertype"
								onChange={onChangeFunction}
								label="UserType"
								value={loginDetails.userType}
								variant="standard"
								
							>
								
								<MenuItem value={"customer"}>customer</MenuItem>
								<MenuItem value={"showOwner"}>ShopOwner</MenuItem>
								<MenuItem value={"superUser"}>SuperUser</MenuItem>
								<MenuItem value={"admin"}>Admin</MenuItem>
								<MenuItem value={"deliveryby"}>DeliveryBoy</MenuItem>
							</Select>
						</FormControl>
						{loginDetails.usertype === "showOwner"?
						<>       
						       <TextField
								id = "ShopSecurityKey"
								name = "ShopSecurityKey"
								label =" Enter Security Key code"
								placeholder="Enter Security Key code"
								// onChange={(event)=>setAdminKey(event.target.value)}
								onChange={(event)=>setShopOwnerKey(event.target.value)}
								variant="standard"
								margin="normal"
								fullWidth
							/>
								<TextField
								id = "shopid"
								name = "shopid"
								label ="ShopId"
								placeholder="Enter the ShopId"
								onChange={shopChangeFunction}
								value={shopDetails.shopid}
								variant="standard"
								margin="normal"
								fullWidth

							/>
							<TextField
								id = "shopname"
								name = "shopname"
								label ="ShopName"
								onChange={shopChangeFunction}
								value={shopDetails.shopname}
								placeholder="Enter the ShopName"
								variant="standard"
								margin="normal"
								fullWidth

							/>
							
							<TextField
								id = "shopaddress"
								name = "shopaddress"
								label ="ShopAddres"
								onChange={shopChangeFunction}
								value={shopDetails.shopaddress}
								placeholder="Enter the ShopAddres"
								variant="standard"
								margin="normal"
								fullWidth
							/>
							<TextField
								id = "shoppin"
								name = "shoppin"
								label ="shoppin"
								onChange={shopChangeFunction}
								value={shopDetails.shoppin}
								placeholder="Enter the Pincode"
								variant="standard"
								margin="normal"
								fullWidth
							/>
							{/* <TextField
								id = "shopcontactnum"
								name = "shopcontactnum"
								label ="shopcontactnum"
								onChange={shopChangeFunction}
								value={shopDetails.shopcontactnum}
								placeholder="Enter the shopcontactnum"
								variant="standard"
								margin="normal"
								fullWidth
							/> */}
							<TextField
								id = "deliverytimefrom"
								name = "deliverytimefrom"
								label ="deliverytimefrom"
								value={deliverytimefrom}
								onChange={(e) => setDeliveryTimeFrom(e.target.value)}
								placeholder="Enter the deliverytimefrom"
								variant="standard"
								margin="normal"
								fullWidth
							/>
							<TextField
								id = "deliverytimeto"
								name = "deliverytimeto"
								label ="deliverytimeto"
								value={deliverytimeto}
								onChange={(e) => setDeliveryTimeTo(e.target.value)}
								placeholder="Enter the deliverytimeto"
								variant="standard"
								margin="normal"
								fullWidth
							/>
							{/* <TextField
								id = "shopkey"
								name = "shopkey"
								label ="shopkey"
								placeholder="Enter the ShopKey"
								variant="standard"
								margin="normal"
								fullWidth
							/> */}
						</>
						:
						""}
						{loginDetails.usertype === "customer"?
						<>
						   <TextField
								id = "upiNumber"
								name = "upiNumber"
								label ="UpiNumber"
								placeholder="EnterPhone Number which is registerd in upi(gpay) or (Ph pay)Number"
								variant="standard"
								onChange={onChangeFunction}
								margin="normal"
								fullWidth
							/>
							<TextField
								id = "useraddress"
								name = "useraddress"
								label ="UserAddress"
								placeholder="Enter the userAddress"
							    onChange={onChangeFunction}
								variant="standard"
								margin="normal"
								fullWidth
							/>
							<TextField
								id = "userpincode"
								name = "userpincode"
								label ="UserPincode"
								placeholder="Enter the userpincode"
								variant="standard"
								onChange={onChangeFunction}
								margin="normal"
								fullWidth
							/>
						

								<TextField
											id="refid1"
											name="refid1"
											label="refid1"
											value={userDetails.refid1}
											placeholder="Enter the RefId"
											onChange={onChangeFunction}
											variant="standard"
											margin="normal"
											fullWidth
											error={!isValidRefid}
											helperText={!isValidRefid ? 'Invalid refid. Please select from dropdown.' : ''}
										/>
										<div className="dropdown">
											{filteredSearch.map((item, index) => (
											<div key={index} className="dropdown-row" onClick={() => handleDropdownSelect(item.userid)}>
												{item.userid}
											</div>
											))}
										</div>
						</>
						:""}
						{loginDetails.usertype === "admin"?
						<>
						<TextField
								id = "adminkey"
								name = "adminkey"
								label =" Security Key code"
								placeholder="Enter Security Key code"
								onChange={(event)=>setAdminKey(event.target.value)}
								variant="standard"
								margin="normal"
								fullWidth
							/>
						</>
						:""}
							
						
						{loginDetails.usertype === "deliveryby"?
						<>
							<TextField
								id = "shopid"
								name = "shopid"
								label ="ShopId"
								placeholder="Enter the ShopId"
								variant="standard"
								margin="normal"
								fullWidth
							/>
							<TextField
								id = "deliverycode"
								name = "deliverycode"
								label ="deliverycode"
								placeholder="Enter the DeliveryCode"
								variant="standard"
								margin="normal"
								fullWidth
							/>
						</>
						:""}
						<Button type="submit" variant="contained"  fullWidth sx={{ mt: 2}} onClick={submitFunction}>Register
							
						</Button>
						{error && (
							<Typography color="error" variant="body2" sx={{ mt: 2 }}>
								{error}
							</Typography>
						)}
						{success && (
							<Typography color="success" variant="body2" sx={{ mt: 2 }}>
								{success}
							</Typography>
						)}
                   </Box>

              </Paper>

          </Container>
        </>
    )

}
export default Registration;
















