import { Button } from '@mui/material';
import { User } from './User';
import React, { useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';


export const Login = () => {

    let userList: User[];

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log("Email:" + email);
      console.log("Password:" + passWord);

        fetch('http://localhost:8080/user') //Need User database implemented in backend
        .then((response) => response.json())
        .then((json) => {
         let tempUserList: User[] = json;
          console.log(tempUserList);
          userList = tempUserList;
      })
      for (let i = 0; i < userList.length; i++) { //Run through lists of users to find matching user and password for entry
          if (userList[i].email === email){
            //Check Password Match
            if (userList[i].password === passWord){
              //Initiate Log In
            } else {
              //Output Error State 
            }
          } else {
              //Output Error State 
          }
      }
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