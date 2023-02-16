import { Button } from '@mui/material';
import React, { useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';


export const Login = () => {
      
    type myStates = {
          email: string,
          passWord: string,
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log(email);
    }
    
    const [email, setEmail] = useState('');
    const [passWord, setPassWord] = useState('');
    const [showPassword] = React.useState(false);

    return (
        <div className="loginPage">
            <div className="card">
                <form onSubmit={handleSubmit}>
                <InputLabel htmlFor="UFL_email">UFL Email</InputLabel>
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