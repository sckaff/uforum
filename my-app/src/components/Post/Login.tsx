import { TextField, Button } from '@mui/material';
import React, { useState } from "react";

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
    return (
        <div className="loginPage">
            <div className="card">
                <form>
                <TextField
                    label="Enter UFL Email"
                    id="UFL_email"
                    variant="filled"
                    size="small"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    />
                    <br/><br/>
                    <TextField
                    label="Enter Password"
                    id="password"
                    size="small"
                    variant="filled"
                    value={passWord}
                    onChange={(event) => setPassWord(event.target.value)}
                    />
                    <br/><br/>
                <Button variant="contained" type="submit">Log In</Button>
                </form>
            </div>
        </div>
    )
}