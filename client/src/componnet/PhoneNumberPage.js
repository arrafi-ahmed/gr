


import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PhoneNumberForm = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handlePhoneNumberChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setPhoneNumber(value);
        }
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const generateOtp = () => {
        return Math.floor(100000 + Math.random() * 900000); // Random 6-digit OTP
    };

    const handleSubmit = async () => {
        if (phoneNumber.length === 10) {
            const otp = generateOtp(); // Generate OTP
            const data = {
                phoneNumber: phoneNumber,
                otp: otp,
                name: name
            };
            try { 
                const res = await axios.post(process.env.REACT_APP_API_BASE_URL + '/phnumberPage', data);
                // const res = await axios.post('http://145.223.23.26:4000/phnumberPage', data);

                console.log(res.data);

                alert('Phone number submitted successfully!');
                setTimeout(() => {
                    navigate('/otpVerification', { state: { phoneNumber: phoneNumber } });
                }, 200);
                setError('');
            } catch (error) {
                setError('Failed to submit phone number. Please try again.');
            }
        } else {
            setError('Phone number must be exactly 10 digits.');
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '300px', margin: '0 auto', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h2>Enter Phone Number</h2>

            <TextField
                label="Phone Number"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                placeholder="Enter 10-digit phone number"
                fullWidth
                margin="normal"
                error={!!error}
                helperText={error}
                inputProps={{ maxLength: 10 }}
            />
            <TextField
                label="Name"
                value={name}
                onChange={handleNameChange}
                placeholder="Enter name"
                fullWidth
                margin="normal"
            />

            <Button
                onClick={handleSubmit}
                variant="contained"
                color="primary"
                disabled={phoneNumber.length !== 10}
                style={{ marginTop: '10px' }}
            >
                Submit
            </Button>
        </div>
    );
};

export default PhoneNumberForm;

