import React, { useState } from 'react';
import axios from 'axios';

const OtpComponent = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');

  const sendOtp = () => {
    axios.post('http://localhost:4000/send-otp', { email })
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        setMessage('Error sending OTP');
      });
  };

  const verifyOtp = () => {
    axios.post('http://localhost:4000/verify-otp', { email, otp })
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        setMessage('Invalid OTP or OTP expired');
      });
  };

  return (
    <div>
      <h2>OTP Verification</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={sendOtp}>Send OTP</button>

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={verifyOtp}>Verify OTP</button>

      <p>{message}</p>
    </div>
  );
};

export default OtpComponent;
