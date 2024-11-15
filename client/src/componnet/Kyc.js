

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Paper, Grid, TextField,Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import axios from "axios";
import AccountCircle from '@mui/icons-material/AccountCircle';

function Kyc() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState("");
    const [bankupdate,setBankUpdate] = useState(true)
    const [formData, setFormData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState({});
    const [error,setError] = useState('')
    const [bankdata,setbankdata] = useState();
    const [showBankDetailsForm, setShowBankDetailsForm] = useState(false);
    const [bankDetails, setBankDetails] = useState([]);
    const [personalDetails, setPersonalDetails] = useState({
        email: '',
        userid: '',
        Phno: '',
        useraddress: "",
        upiNumber :"",
        userpincode: "",
    });
    const [newBankDetail, setNewBankDetail] = useState({
        accountNumber: '',
        ifsc: '',
        bankName: '',
        nameOfBank:'',
        bankaddress:"",
    });

    const navigate = useNavigate();
    const location = useLocation();
    const { userId } = location.state || {};

    useEffect(() => {
        if (userId) {
            setCurrentUser(userId);
        } else {
            console.error('User ID not found in state');
        }
    }, [userId]);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/customer/${currentUser}`);
                setFormData(response.data);
                setPersonalDetails({
                    email: response.data.email,
                    userid: response.data.userid,
                    Phno: response.data.Phno,
                    userpincode: response.data.userpincode,
                    useraddress: response.data.useraddress,
                    upiNumber  : response.data.upiNumber
                });
            } catch (err) {
                console.error(err);
            }
        };
        const fetchBankDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/bankDetails/${currentUser}`);
                setBankDetails(response.data); // Set the bank details in state
            } catch (err) {
                console.error('Error fetching bank details:', err);
            }
        };

        if (currentUser) {
            fetchUserDetails();
            fetchBankDetails();
        }
    }, [currentUser]);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleChange = (e) => {
        setPersonalDetails({ ...personalDetails, [e.target.name]: e.target.value });
    };

    const handleBankDetailChange = (e) => {
        setNewBankDetail({ ...newBankDetail, [e.target.name]: e.target.value });
        console.log(newBankDetail);
        const userid = currentUser; // Assume `id` is defined somewhere in your component
        const bankDetailsWithUserId = { userid, ...newBankDetail };
        console.log(bankDetailsWithUserId);
      setbankdata(bankDetailsWithUserId) 
    };

    const handleAddBankDetail = () => {
        setShowBankDetailsForm(true);
    };

    //bank table la add pantrathkku
    const handleSubmitBankDetail = async() => {
        const bankDetailsWithUserId = { userid: currentUser, ...newBankDetail }
        console.log(bankDetailsWithUserId);
        setBankUpdate(false)

        try{
            if (validateFields()) {
            const res = await axios.post(process.env.REACT_APP_API_BASE_URL + '/bankDetails',bankDetailsWithUserId)
            
            console.log(res.data);
            setBankDetails([...bankDetails, newBankDetail]);
            setNewBankDetail({ accountNumber: '', ifsc: '', bankName: '',bankaddress:'',nameOfBank:'' });
            setShowBankDetailsForm(false);
            }
        }catch(err){
            console.log(err)  

        }
    };

    const handleSave = async () => {
        if(validateForm()){
            try {
                await axios.put(`http://localhost:4000/customer/${currentUser}`, personalDetails);
                setFormData({ ...formData, ...personalDetails });
                setIsEditing(false);
            } catch (err) {
                console.error('Error updating customer details:', err);
            }

        }
       
    };

   

    const handleAlerSubmit = (label) => {
        console.log(label);
        if(label === "My Bonus"){
          navigate('/bonus',{ state: { userId: currentUser } })
        }else 
        if(label === "About Us"){
          navigate('/about',{ state: { userId: currentUser } })
        }else
        if(label === "Contact Us"){
          navigate('/contact',{ state: { userId: currentUser } })
        } else
        // if(label === 'KYC'){
        //     navigate('/kyc', { state: { userId: currentUser } })
        // }else
        if(label === "Referrals"){
          navigate('/refferals',{ state: { userId: currentUser } })
        }else
        if(label === "Product List"){
          navigate('/product',{ state: { userId: currentUser } })
        }else
        if(label === "My Profile"){
          navigate('/myprofile',{ state: { userId: currentUser } })
        }else
        if(label === "My Orders"){
          navigate('/myorders',{ state: { userId: currentUser } })
        }else
        if(label === "Our YouTube Channel"){
          navigate('/youtype',{ state: { userId: currentUser } })
        }else
        if(label === "Logout"){
          navigate('/logout',{ state: { userId: currentUser } })
        }else if(label === "PrivatePolicy"){
            navigate('/cusPrivatepolicy', { state: { userId: currentUser } }); 
        }
    }

    const validateForm=()=>{
		const phoneNumberPattern = /^[0-9]{10}$/;
		if(!phoneNumberPattern.test(personalDetails.Phno)){
			setError('Phone Number Must Be Exactly 10 Digits')
			return false
		}
		if(!phoneNumberPattern.test(personalDetails.upiNumber)){
			setError('Upi Number Must be Exactly 10 Digits')
			return false
		}
		
		setError('')
		return true
		
	}

    const validateFields = () => {
        let tempErrors = {};
        let isValid = true;
    
        if (!newBankDetail.accountNumber) {
          tempErrors.accountNumber = 'Account Number is required';
          isValid = false;
        }
        if (!newBankDetail.ifsc) {
          tempErrors.ifsc = 'IFSC Code is required';
          isValid = false;
        }
        if (!newBankDetail.bankName) {
          tempErrors.bankName = 'Bank Name is required';
          isValid = false;
        }
        if (!newBankDetail.nameOfBank) {
          tempErrors.nameOfBank = 'Name As Per Bank is required';
          isValid = false;
        }
        if (!newBankDetail.bankaddress) {
          tempErrors.bankaddress = 'Bank Address is required';
          isValid = false;
        }
    
        setErrors(tempErrors);
        return isValid;
      };
    return (
        <>
             <AppBar  position="fixed" sx={{ width: '100vw', overflow: 'hidden' }}>
        <Toolbar>
          <IconButton edge="start" color="red" onClick={handleDrawerToggle} sx={{ display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
            {['Product List', 'My Profile', 'My Orders', 'My Bonus', 'Referrals', 'Our YouTube Channel', 'About Us', 'Contact Us', 'PrivatePolicy', 'Logout'].map((label) => (
              <Button key={label} onClick={() => { handleAlerSubmit(label) }} color="inherit" style={{ margin: '0 10px', fontSize: "13px" }}>{label}</Button>
            ))}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
            <IconButton color="inherit">
                <AccountCircle />
            </IconButton>
            <Typography variant="body1" color="inherit" sx={{ marginRight: 1, }}>
                {currentUser || 'Username'} {/* Replace 'Username' with actual user name */}
            </Typography>
        </Box>
        </Toolbar>
        
      </AppBar>
            <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
                <List>
                    {['Product List', 'My Profile', 'My Orders', 'My Bonus', 'Referrals', 'Our YouTube Channel', 'About Us', 'Contact Us', 'PrivatePolicy', 'Logout'].map((text) => (
                        <ListItem button key={text} onClick={handleDrawerToggle}>
                            <ListItemText primary={text} onClick={() => { handleAlerSubmit(text) }} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <div style={{marginTop:"84px"}}>
                <Grid container spacing={2} >
                    <Grid item xs={12} md={6}>
                        
                        <h1>Your Bank Details</h1>
                        <Button variant="contained" color="primary" onClick={handleAddBankDetail}>Add Bank Details</Button>
                        {/* {!showBankDetailsForm? <Button onClick={handleAddBankDetail} variant="contained" color="primary">Add Bank Details</Button> 
                        :<Button onClick={handleAddBankDetail} variant="contained" color="primary">Update Bank Details</Button>  } */}
                       
                        {showBankDetailsForm && (
                            <Paper elevation={2} style={{ padding: '16px', marginTop: '16px' }}>
                                <TextField
                                    label="Account Number"
                                    name="accountNumber"
                                    value={newBankDetail.accountNumber}
                                    onChange={handleBankDetailChange}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="IFSC Code"
                                    name="ifsc"
                                    value={newBankDetail.ifsc}
                                    onChange={handleBankDetailChange}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="Bank Name"
                                    name="bankName"
                                    value={newBankDetail.bankName}
                                    onChange={handleBankDetailChange}
                                    fullWidth
                                    margin="normal"
                                />
                                 <TextField
                                    label="Name As Per Bank"
                                    name="nameOfBank"
                                    value={newBankDetail.nameOfBank}
                                    onChange={handleBankDetailChange}
                                    fullWidth
                                    margin="normal"
                                />
                                 <TextField
                                    label="Bank Address"
                                    name="bankaddress"
                                    value={newBankDetail.bankaddress}
                                    onChange={handleBankDetailChange}
                                    fullWidth
                                    margin="normal"
                                />
                                <Button onClick={handleSubmitBankDetail} variant="contained" color="primary">Submit</Button>
                            </Paper>
                        )}
                        {bankDetails.length > 0 && (
                            <Paper elevation={2} style={{ padding: '16px', marginTop: '16px' }}>
                                <h2>Bank Details List:</h2>
                                {bankDetails.map((detail, index) => (
                                    <div key={index}>
                                        <p>Account Number: {detail.accountNumber}</p>
                                        <p>IFSC Code: {detail.ifsc}</p>
                                        <p>nameOfBank:{detail.nameOfBank}</p>
                                        <p>Bank Address:{detail.bankaddress}</p>
                                        <p>Bank Name: {detail.bankName}</p>
                                        
                                        {/* <hr /> */}
                                    </div>
                                ))}
                            </Paper>
                        )}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <h1>Your Personal Details</h1>
                        {isEditing ? (
                            <Paper elevation={2} style={{ padding: '16px' }}>
                                <TextField
                                    label="Email"
                                    name="email"
                                    value={personalDetails.email}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="User ID"
                                    name="userid"
                                    value={personalDetails.userid}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                    disabled
                                />
                                <TextField
                                    label="Phone Number"
                                    name="Phno"
                                    value={personalDetails.Phno}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="User Pincode"
                                    name="userpincode"
                                    value={personalDetails.userpincode}
                                    onChange={handleChange}
                                    fullWidth
                                    disabled
                                    margin="normal"
                                />
                                <TextField
                                    label="User Address"
                                    name="useraddress"
                                    value={personalDetails.useraddress}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                />
                                 <TextField
                                    label="Upi Number"
                                    name="upiNumber"
                                    value={personalDetails.upiNumber}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                />

                                <Button onClick={handleSave} variant="contained" color="primary" style={{marginRight:"10px"}}>Save</Button>
                                <Button onClick={handleEditToggle} variant="contained" color="secondary">Cancel</Button>
                                {error && (
							<Typography color="error" variant="body2" sx={{ mt: 2 }}>
								{error}
							</Typography>
						)}
                            </Paper>
                        ) : (
                            <Paper elevation={2} style={{ padding: '16px' ,marginTop:"72px"}}>
                                <p>Email: {formData?.email}</p>
                                <p>User ID: {formData?.userid}</p>
                                <p>Phone Number: {formData?.Phno}</p>
                                <p>User Address: {formData?.useraddress}</p>
                                <p>User Pincode: {formData?.userpincode}</p>
                                <p>User Upi Number:{formData?.upiNumber}</p>

                               
                                <Button onClick={handleEditToggle} variant="contained" color="primary">Edit</Button>
                            </Paper>
                        )}
                    </Grid>
                </Grid>
            </div>
        </>
    );
}

export default Kyc;


