import {
  Button,
  TextField,
  Container,
  Stack,
  Typography,
  Paper,
} from '@mui/material';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post('https://reqres.in/api/login', { email, password })
      .then((result) => {
        login(result.data.token);
        navigate('/products');
      })
      .catch((err) => {
        setError('Invalid credentials');
      });
  }

  return (
    <Container>
      <Stack
        spacing={2}
        sx={{ height: '100%' }}
        direction="row"
        justifyContent="center"
        alignItems="center"
      > <Typography variant='h2'>Welcome Radiant Infonet Task</Typography>
        <form onSubmit={handleSubmit}>
          <Paper elevation={1} sx={{ my: 20, width: '400px', padding: '20px' }}>
            <Stack direction="column" gap={2}>
              <Typography variant="h4" align="center">
                Sign In Page 
              </Typography>
              {error && (
                <Typography variant="h6" color="error" align="center">
                  {error}
                </Typography>
              )}
              <TextField
                sx={{ backgroundColor: 'white', mx: 3, my: 1, width: 350 }}
                id="email"
                label="Email Id"
                variant="filled"
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                sx={{ backgroundColor: 'white', mx: 3, my: 1, width: 350 }}
                id="pwd"
                type="password"
                label="Password"
                variant="filled"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button variant="contained" sx={{ mx: 12 }} type="submit">
                Submit
              </Button>
            </Stack>
          </Paper>
        </form>
      </Stack>
    </Container>
  );
}
