import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const OtpVerification = () => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [oldOtp, setOldOtp] = useState('');
    const navigate = useNavigate();

    const location = useLocation();
    const { phoneNumber } = location.state || {};

    console.log(phoneNumber);

    const handleOtpChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) { // Allow only numeric input
            setOtp(value);
        }
    };

    useEffect(() => {
        const fetchOtpDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/otpPage/${phoneNumber}`);
                console.log('Fetched OTP:', response.data.otp);
                setOldOtp(response.data.otp);
            } catch (err) {
                if (err.response) {
                    setError(err.response.data.message || 'Error fetching OTP');
                } else if (err.request) {
                    setError('No response received from server');
                } else {
                    setError('Error: ' + err.message);
                }
                console.error('Error fetching OTP:', err);
            }
        };

        if (phoneNumber) {
            fetchOtpDetails();
        }
    }, [phoneNumber]);

    const handleSubmit = () => {
        if (otp === oldOtp) {
            setSuccess('OTP verified successfully!');
           setTimeout(()=>{
            navigate('/register',{ state: { phoneNumber : phoneNumber }})
           },400)
            setError('');
        } else {
            setError('Invalid OTP. Please try again.');
            setSuccess('');
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '300px', margin: '0 auto', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h2>Verify OTP</h2>

            <TextField
                label="OTP"
                value={otp}
                onChange={handleOtpChange}
                placeholder="Enter OTP"
                fullWidth
                margin="normal"
                inputProps={{ maxLength: 6 }}
            />

            <Button
                onClick={handleSubmit}
                variant="contained"
                color="primary"
                style={{ marginTop: '10px' }}
                disabled={otp.length !== 6} // Enable only if OTP is 6 digits
            >
                Verify OTP
            </Button>

            {error && (
                <Typography color="error" style={{ marginTop: '10px' }}>
                    {error}
                </Typography>
            )}
            {success && (
                <Typography color="primary" style={{ marginTop: '10px' }}>
                    {success}
                </Typography>
            )}
        </div>
    );
};

export default OtpVerification;
