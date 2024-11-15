
// import React, { useState } from "react"
// import  PhoneInput from 'react-phone-input-2'
// import 'react-phone-input-2/lib/style.css'
// import { Button, TextField } from "@mui/material"
// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"
// import { auth } from "../firebox/setup"
// const RegisterPage=()=>{

//     const [phone,setphone] = useState("")

//     console.log(phone);
    

//     const sendOtp =async()=>{

//         try{
//             const recaptcha = new  RecaptchaVerifier(auth,"recaptcha",{})
//             const confirmation =await signInWithPhoneNumber(auth,phone,recaptcha)
//             console.log(confirmation);

//         }catch(err){
//               console.log(err);
              
//         }
      
       
//     }
//     return(
       
//        <div >
//              <div>
//              <PhoneInput
//                 country={"us"}
                
//                  value={phone}
//                  onChange={(phone)=>setphone("+",phone)}
         
//             >

//             </PhoneInput>
//             <Button variant="contained" style={{marginTop:"30px"}} onClick={sendOtp}>Send Otp</Button>
//              </div >
//              <div id="recaptcha" style={{marginTop:"30px",display:"flex"}}>
//                 <TextField variant="outlined" label="Enter that Otp" style={{marginRight:"30px"}}></TextField>
//                 <Button variant="contained" color="success">VerifyOtp</Button>
//              </div>
//        </div>
//     )

// }
// export default  RegisterPage

// import React, { useState } from "react";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import { Button, TextField } from "@mui/material";
// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import { auth } from "../firebox/setup"; // Ensure this file exports initialized auth

// const RegisterPage = () => {
//     const [phone, setPhone] = useState("");
//     const [otp, setOtp] = useState("");

//     const sendOtp = async () => {
//         try {
//             // Create RecaptchaVerifier
//             const recaptchaVerifier = new RecaptchaVerifier("recaptcha", {
//                 size: "invisible", // or 'normal'
//                 callback: (response) => {
//                     // reCAPTCHA solved; you can send OTP
//                 },
//                 'expired-callback': () => {
//                     // Response expired; ask user to solve reCAPTCHA again
//                 },
//             }, auth); // Pass the auth instance here

//             // Send OTP
//             const confirmation = await signInWithPhoneNumber(auth, phone, recaptchaVerifier);
//             console.log(confirmation);
//         } catch (err) {
//             console.error("Error during OTP sending:", err);
//         }
//     };

//     return (
//         <div>
//             <div>
//                 <PhoneInput
//                     country={"us"}
//                     value={phone}
//                     onChange={(value) => setPhone(value)} // Update phone state correctly
//                 />
//                 <p>Phone Number: {phone}</p>

//                 <Button variant="contained" style={{ marginTop: "30px" }} onClick={sendOtp}>
//                     Send OTP
//                 </Button>
//             </div>
//             <div id="recaptcha" style={{ marginTop: "30px", display: "flex" }}>
//                 <TextField
//                     variant="outlined"
//                     label="Enter the OTP"
//                     value={otp}
//                     onChange={(e) => setOtp(e.target.value)} // Update OTP state
//                     style={{ marginRight: "30px" }}
//                 />
//                 <Button variant="contained" color="success">
//                     Verify OTP
//                 </Button>
//             </div>
//         </div>
//     );
// };

// export default RegisterPage;

import React, { useState } from 'react';
import axios from 'axios';

function RegisterPage() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const sendOtp = async () => {
        setLoading(true);
        setMessage('');
        try {
            const response = await axios.post(process.env.REACT_APP_API_BASE_URL + '/send-otp', { phoneNumber });
            setMessage(response.data);
        } catch (error) {
            setMessage('Error sending OTP: ' + (error.response?.data || error.message));
        } finally {
            setLoading(false);
        }
    };

    const verifyOtp = async () => {
        setLoading(true);
        setMessage('');
        try {
            const response = await axios.post(process.env.REACT_APP_API_BASE_URL + '/verify-otp', { phoneNumber, otp });
            setMessage(response.data);
        } catch (error) {
            setMessage('Invalid OTP: ' + (error.response?.data || error.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Login with OTP</h1>
            <input
                type="text"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <button onClick={sendOtp} disabled={loading}>
                {loading ? 'Sending...' : 'Send OTP'}
            </button>
            <br />
            <input
                type="text"
                placeholder="OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
            />
            <button onClick={verifyOtp} disabled={loading}>
                {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
            <p>{message}</p>
        </div>
    );
}

export default RegisterPage;



