import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Link,
  IconButton,
  InputAdornment
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import '../Style/style.css';

const Login = () => {
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [error, setError] = useState('');
  const [msg,setMsg]  =  useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!userid || !password) {
      setError('Please fill in both fields');
      return;
    }
    setError('');
    console.log('UserId/Phone:', userid);
    console.log('Password:', password);
  };

  // const signInSubmit = async () => {
  //   try {
  //     const res = await axios.post(process.env.REACT_APP_API_BASE_URL + '/loginPage', { "userid": userid, "password": password });
   
      
  //     if(res.data.usertype === "customer"){
  //       navigate('/product',{ state:res.data.userId })
  //     }else
  //     if(res.data.usertype === "admin"){
  //       navigate('/adminPage',{state:{userid:userid}})
  //     }
  //     // if (res.data === "Success") {
  //       if (res.data === "Failed") { 
  //       // navigate('/product');
  //       // navigate('/diplay')
       
  //     } else if (res.data === "Failed") {
  //       setError("Incorrect Password!");
  //     }
  //   } catch (error) {
  //     console.error('Login error:', error);
  //     setError('An error occurred. Please try again.');
  //   }
  // };


  const signInSubmit = async () => {
    try {
      console.log(1, process.env.REACT_APP_API_BASE_URL)
      console.log(2, process.env.NODE_ENV)
      const res = await axios.post(process.env.REACT_APP_API_BASE_URL + '/loginPage', { "userid": userid, "password": password });
      console.log(3, res.config.url)
      console.log(res.data);
      console.log(res.data.usertype);
      
      // setMsg(res.data.message )
      if(res.data.usertype === 'showOwner'){
        setTimeout(()=>{
          // navigate('/shopOwner',{state:{userId:userid}})
          navigate('/shopOwnerAddProduct',{state:{userId:userid}})
        },2000)
      }
      setMsg('Shop Owner Login Successfully')

     
      // if(res.data.usertype === 'showOwner'){
      //   console.log("*************************");
        
      //   navigate('/shopOwner',{state:{userid:userid}})
      // }else
      if (res.data.usertype === "customer") {
        // navigate('/product', { state: res.data.userId })
        // Example of navigating to Product component
        setTimeout(()=>{
          navigate('/product', { state: { userId: userid } });
        },2000)

        setMsg('Customer Login Successfully')
    


        // setMsg(res.data)
        console.log(res.data.message);
        
      }else
          if(res.data.usertype === "admin"){
            setTimeout(()=>{
            // navigate('/adminPage',{state:{userId:userid}})
            navigate('/addShop',{state:{userId:userid}})
          },2000)
          setMsg('Admin Login Successfully')

      }else
      if(res.data.usertype === "superUser"){
        setTimeout(()=>{
        // navigate('/adminPage',{state:{userId:userid}})
        navigate('/addShop',{state:{userId:userid}})
      },2000)
      setMsg('SuperUser  Login Successfully')

  }
       else if (res.data === "Failed") {
        setError("Incorrect Password!");
      }

    } catch (error) {
      console.error('Login error:', error);
      setError('Incorrect value please provide correct values');
    }
  };
  
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  console.log(msg);
  
  return (
    <Container component="main" maxWidth="xs">
      <Paper className='styledPaper'>
        <IconButton style={{ backgroundColor: "#FF1493", color: "white" }}>
          <LockOpenIcon />
        </IconButton>
        
        <Typography style={{ fontWeight: "bolder", marginTop: "15px", marginBottom: "10px" }} variant='h4'>
          Login
        </Typography>
        <Typography color='success'>{msg}</Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="userid"
            label="UserId"
            name="userid"
            autoComplete="userid"
            autoFocus
            className='inputField'
            value={userid}
            onChange={(e) => setUserid(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            className='inputField'
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            onClick={signInSubmit}
            variant="contained"
            style={{ marginTop: "10px" }}
            color="primary"
          >
            Sign In
          </Button>
          <Link
            component={RouterLink}
            to="/forgot-password"
            variant="body2"
            style={{ display: 'block', marginTop: 16 }}
          >
            Forgot Password?
          </Link>
          <Link
            component={RouterLink}
            // to="/register"
            to = '/phoneNumber'
            variant="body2"
            style={{ display: 'block', marginTop: 16 }}
          >
            Don’t have an account? Register
          </Link>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
