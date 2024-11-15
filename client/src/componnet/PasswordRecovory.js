// import React, { useState } from 'react';
// import { Container, Typography, Checkbox, Button, Paper, Link, FormControlLabel } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const PasswordRecovery = () => {
//   const [confirmed, setConfirmed] = useState(false);
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!confirmed) {
//       setError('Please confirm that you have lost your password.');
//       return;
//     }
//     setError('');

//     try {
//       const response = await axios.post(process.env.REACT_APP_API_BASE_URL + '/password');
//       setMessage(response.data.message);
//       setTimeout(() => {
//         navigate('/login'); // Redirect to login after a timeout
//       }, 3000);
//     } catch (err) {
//       console.error('Error sending reset link:', err);
//       setError('An error occurred. Please try again.');
//     }
//   };

//   return (
//     <Container component="main" maxWidth="xs">
//       <Paper elevation={3} sx={{ padding: 3 }}>
//         <Typography variant="h5" align="center">Forgot Password</Typography>
//         <Typography variant="body1" align="center" sx={{ mt: 2 }}>
//           If you have lost your password, please check the box below and submit the form to receive a reset link.
//         </Typography>
//         {message && <Typography color="primary">{message}</Typography>}
//         {error && <Typography color="error">{error}</Typography>}
//         <form onSubmit={handleSubmit}>
//           <FormControlLabel
//             control={<Checkbox checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} />}
//             label="I have lost my password and need to reset it"
//           />
//           <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
//             Send Reset Link
//           </Button>
//           <Link href="/" variant="body2" sx={{ display: 'block', marginTop: 2 }}>
//             Back to Login
//           </Link>
//         </form>
//       </Paper>
//     </Container>
//   );
// };

// export default PasswordRecovery;


import React, { useState } from 'react';
import { Container, Typography, Checkbox, Button, Paper, Link, FormControlLabel, TextField } from '@mui/material';
import emailjs from 'emailjs-com';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const PasswordRecovery = () => {
  const [confirmed, setConfirmed] = useState(false);
  const [email, setEmail] = useState(''); // State for email input
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!confirmed) {
      setError('Please confirm that you have lost your password.');
      return;
    }
    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    setError('');

    try {
      // Send email using EmailJS
      await emailjs.send(
        'service_54igpvq',  // Replace with your EmailJS Service ID
        'template_61vyiln', // Replace with your EmailJS Template ID
        { 
          to_email: email, // Use the email entered by the user
          message: `I have lost my password and need to reset it for the email: ${email}` // Include email in message
        }, 
        'MgPILiBR-4sE-PfL0' // Replace with your EmailJS User ID
      );

      setMessage('Please wait for the return mail.');
      
      // Redirect to login page after sending email
      setTimeout(() => {
        navigate('/'); // Redirect to the login page
      }, 2000); // Wait for 2 seconds before redirecting
    } catch (err) {
      console.error('Error sending email:', err);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h5" align="center">Forgot Password</Typography>
        <Typography variant="body1" align="center" sx={{ mt: 2 }}>
          If you have lost your password, please enter your email address, check the box below, and submit the form to receive a reset link.
        </Typography>
        {message && <Typography color="primary">{message}</Typography>}
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state
          />
          <FormControlLabel
            control={<Checkbox checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} />}
            label="I have lost my password and need to reset it"
          />
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
            Send Reset Link
          </Button>
          <Link href="/" variant="body2" sx={{ display: 'block', marginTop: 2 }}>
            Back to Login
          </Link>
        </form>
      </Paper>
    </Container>
  );
};

export default PasswordRecovery;




// import React, { useState } from 'react';
// import { Container, Typography, Checkbox, Button, Paper, Link, FormControlLabel } from '@mui/material';
// import emailjs from 'emailjs-com';

// const PasswordRecovery = () => {
//   const [confirmed, setConfirmed] = useState(false);
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!confirmed) {
//       setError('Please confirm that you have lost your password.');
//       return;
//     }
//     setError('');

//     try {
//       // Send email using EmailJS
//       await emailjs.send(
//         'service_54igpvq',  // Replace with your EmailJS Service ID
//         'template_61vyiln', // Replace with your EmailJS Template ID
//         { to_email: 'muthulakshmimk8@example.com' ,
//           message : '"I have lost my password and need to reset it "'
//         }, // Data to send (replace email with Muthulakshmi's email)
//         'MgPILiBR-4sE-PfL0'      // Replace with your EmailJS User ID
//       );

//       setMessage('please wait for return mail.');
//     } catch (err) {
//       console.error('Error sending email:', err);
//       setError('An error occurred. Please try again.');
//     }
//   };

//   return (
//     <Container component="main" maxWidth="xs">
//       <Paper elevation={3} sx={{ padding: 3 }}>
//         <Typography variant="h5" align="center">Forgot Password</Typography>
//         <Typography variant="body1" align="center" sx={{ mt: 2 }}>
//           If you have lost your password, please check the box below and submit the form to receive a reset link.
//         </Typography>
//         {message && <Typography color="primary">{message}</Typography>}
//         {error && <Typography color="error">{error}</Typography>}
//         <form onSubmit={handleSubmit}>
//           <FormControlLabel
//             control={<Checkbox checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} />}
//             label="I have lost my password and need to reset it"
//           />
        
//          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}  
//           >
//             Send Reset Link
//           </Button>
        
//           <Link href="/" variant="body2" sx={{ display: 'block', marginTop: 2 }}>
//             Back to Login
//           </Link>
//         </form>
//       </Paper>
//     </Container>
//   );
// };

// export default PasswordRecovery;



// import React, { useState } from 'react';
// import { Container, Typography, TextField, Button, Paper, Link } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const PasswordRecovery = () => {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!email) {
//       setError('Please enter your email address');
//       return;
//     }
//     setError('');

//     try {
//       const response = await axios.post(process.env.REACT_APP_API_BASE_URL + '/password', { email });
//       setMessage(response.data.message);
//       setTimeout(() => {
//         navigate('/login'); // Redirect to login after a timeout
//       }, 3000);
//     } catch (err) {
//       console.error('Error sending reset link:', err);
//       setError('An error occurred. Please try again.');
//     }
//   };

//   return (
//     <Container component="main" maxWidth="xs">
//       <Paper elevation={3} sx={{ padding: 3 }}>
//         <Typography variant="h5" align="center">Forgot Password</Typography>
//         {message && <Typography color="primary">{message}</Typography>}
//         {error && <Typography color="error">{error}</Typography>}
//         <form onSubmit={handleSubmit}>
//           <TextField
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             label="Email Address"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <Button type="submit" fullWidth variant="contained" color="primary">
//             Send Reset Link
//           </Button>
//           <Link href="/" variant="body2" sx={{ display: 'block', marginTop: 2 }}>
//             Back to Login
//           </Link>
//         </form>
//       </Paper>
//     </Container>
//   );
// };

// export default PasswordRecovery;


























































// import React, { useState } from 'react';
// import { Typography, 
//   TextField,
//   Button, 
//   Paper
// } from '@mui/material';
// import { styled } from '@mui/system';

// const StyledPaper = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(4),
//   maxWidth: 400,
//   margin: 'auto',
//   marginTop: theme.spacing(8),
//   textAlign: 'center',
//   boxShadow: theme.shadows[5],
// }));

// const Title = styled(Typography)(({ theme }) => ({
//   marginBottom: theme.spacing(2),
//   color: theme.palette.primary.main,
// }));

// const InputField = styled(TextField)(({ theme }) => ({
//   marginBottom: theme.spacing(2),
// }));

// const PasswordRecovery = () => {
//   const [step, setStep] = useState(1);
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [otp, setOtp] = useState('');
//   const [dateOfBirth, setDateOfBirth] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSendOtp = (event) => {
//     event.preventDefault();
//     if (!phoneNumber) {
//       setMessage('Please enter your phone number.');
//       return;
//     }
//     setMessage('OTP sent to your phone number.');
//     setStep(2);
//   };

//   const handleVerifyOtp = (event) => {
//     event.preventDefault();
//     if (!otp) {
//       setMessage('Please enter the OTP.');
//       return;
//     }
//     setMessage('OTP verified. Please enter a new password.');
//     setStep(3);
//   };

//   const handleResetPassword = (event) => {
//     event.preventDefault();
//     if (newPassword !== confirmPassword) {
//       setMessage('Passwords do not match.');
//       return;
//     }
//     setMessage('Password successfully reset.');
//   };

//   return (
//     <StyledPaper>
//       <Title variant="h5">{step === 1 ? 'Forgot Password' : step === 2 ? 'Enter OTP' : 'Reset Password'}</Title>
//       {message && <Typography color="textSecondary">{message}</Typography>}
//       {step === 1 && (
//         <form onSubmit={handleSendOtp}>
//           <InputField
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             id="phoneNumber"
//             label="Phone Number"
//             name="phoneNumber"
//             value={phoneNumber}
//             onChange={(e) => setPhoneNumber(e.target.value)}
//           />
//            <InputField
//           variant="outlined"
//           margin="normal"
//           required
//           fullWidth
//           id="dateOfBirth"
//           label="Date of Birth"
//           name="dateOfBirth"
//           type="date"
//           InputLabelProps={{ shrink: true }}
//           value={dateOfBirth}
//           onChange={(e) => setDateOfBirth(e.target.value)}
//         />
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             color="primary"
//           >
//             Send OTP
//           </Button>
//         </form>
//       )}
//       {step === 2 && (
//         <form onSubmit={handleVerifyOtp}>
//           <InputField
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             id="otp"
//             label="OTP"
//             name="otp"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//           />
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             color="primary"
//           >
//             Verify OTP
//           </Button>
//         </form>
//       )}
//       {step === 3 && (
//         <form onSubmit={handleResetPassword}>
//           <InputField
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             id="newPassword"
//             label="New Password"
//             name="newPassword"
//             type="password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//           />
//           <InputField
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             id="confirmPassword"
//             label="Confirm Password"
//             name="confirmPassword"
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           />
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             color="primary"
//           >
//             Reset Password
//           </Button>
//         </form>
//       )}
//     </StyledPaper>
//   );
// };

// export default PasswordRecovery;
