import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Paper } from '@mui/material';
import { Link } from 'react-router-dom';
// import { useState } from 'react';
import agent from '../../app/api/agent';
import {useForm, FieldValues} from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/store/configureStore';
import { signInUser } from './accountSlice';


const theme = createTheme();

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const{register, handleSubmit, formState:{isSubmitting, errors, isValid}} = useForm({
      mode: 'all' //触发validation的模式
    })

//     const[ values, setValues] = useState({
//         username: '',
//         password:''
//     })

//   const handleSubmit = (event: any) => {
//       event?.preventDefault();
//     agent.Account.login(values);
//   };


//   const handleInputChange=(event: any)=>{
//       const {name, value} = event.target;
//       setValues({...values, [name]: value})
//   }
    async function submitForm(data: FieldValues){
      await dispatch(signInUser(data));
      navigate('/catalog');
      // try{
      //   await agent.Account.login(data);
      // }
      // catch(error){
      //   console.log(error);
      // }
        
    }

  return (
    <ThemeProvider theme={theme}>
      <Container component={Paper} maxWidth="sm"
        sx={{display: 'flex', flexDirection:'column', alignItems:'center', p: 4}}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="username"
              label="Username"
            //   name="username"
            //   onChange={handleInputChange}
            //   value ={values.username}
              {...register('username',{required: 'Username is required'})}
              error={!! errors.username} //if error of username exist return true
              helperText = {errors?.username?.message}
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
            //   name="password"
              label="Password"
              type="password"
              id="password"
            //   onChange={handleInputChange}
            //   value ={values.password}
              {...register('password', {required: 'Password is required'})}
              error={!! errors.password} //if error of password exist return true
              helperText = {errors?.password?.message}
            />
            <LoadingButton
              disabled={!isValid}
              loading={isSubmitting}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </LoadingButton>
            <Grid container>
              <Grid item>
                <Link to='/register'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
      </Container>
    </ThemeProvider>
  );
}
