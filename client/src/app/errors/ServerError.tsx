import { Button, Container, Divider, Paper, Typography } from '@mui/material'
import {useNavigate, useLocation} from 'react-router-dom'


export default function ServerError() {
  const navigate = useNavigate();
  const location : any = useLocation();

  return (
    <Container component={Paper}>
      {
        location.state.error? (
          <>
            <Typography variant='h3' color='error' gutterBottom>{location.state.error.title}</Typography>
            <Divider/>
            <Typography>{location.state.error.detail||'Internal server error'}</Typography>
          </>
        ):(
          <Typography variant='h5' gutterBottom>Server error</Typography>
        )
      }
      <Button onClick={()=>navigate('/catalog')}>Go back to the store</Button>
    </Container>
  )
}
