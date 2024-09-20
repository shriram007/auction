import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import axios from 'axios'
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {FormProvider, useForm} from 'react-hook-form'
import { Link,Navigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Copyright(props) {
  return (
    
//Code for the footer

    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
     Cognizant{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const defaultTheme = createTheme();

export default function SignIn() {

  //Code for the Sign In form submission
  // const methods = useForm();
  
  const {register,handleSubmit,formState:{errors},reset} = useForm()

const onSubmit = async data=> {
    try{
    

      const res = await axios.post('http://localhost:5000/api/login',data);
      
     
      if(res.status === 200){
        toast.success('Logged in Successfully');
        return window.location.replace("http://localhost:3000/pro")
       }
     
    
    }
    catch(err){
     if(err.response && err.response.status === 400){
      toast.error('Invalid Credentials');
     }
      toast.error(err.response.data)
    }
 
    // methods.reset()
  };

  return (
    //code for sign in form
    <ThemeProvider theme={defaultTheme}>

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
      <FormProvider >

 
          <form component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
            
             label='Email'
              name="email"
              {...register('email',{ required: 'Email is required',pattern: {value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,message:"Invalid Email ID"} })}
              error={errors.email}
              helperText={errors.email?errors.email.message:''}
              
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              
              
              {...register('password',{ required: 'Password is required',minLength: {value: 6, message: 'Password must have at least 6 characters'}})}
              error={!!errors.password}
              helperText={errors.password?errors.password.message:''}
              
            />
         
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            
            <Grid container>
              
              <Grid item>
                <Link to='/signup' variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
          </FormProvider>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      <ToastContainer/>
    </ThemeProvider>
  );
}