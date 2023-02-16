import { TextField, Button } from '@mui/material';
import React, { useState } from "react";
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';


export default function InputAdornments() {
    const [showPassword, setShowPassword] = React.useState(false);
  
    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };
}

    export const Login = () => {
    type myStates = {
        email: string,
        passWord: string,
    }
    const [email, setEmail] = useState('');
    const [passWord, setPassWord] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(email);
    }
    const [showPassword] = React.useState(false);
  
    return (
        <div className="loginPage">
            <div className="card">
                <form onSubmit={handleSubmit}>
                <InputLabel htmlFor="UFL_email">Enter UFL Email</InputLabel>
                <Input
                    id="UFL_email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    />
                    <br/><br/>
                <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                  <Input
                    id="filled-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                  />
                <br/><br/>
                <Button variant="contained" type="submit">Log In</Button>
                </form>
            </div>
        </div>
    )
}