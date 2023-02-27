import { Navigate, Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import InputLabel from '@mui/material/InputLabel';
import React, { Component } from "react";
import Input from '@mui/material/Input';
import { Button, Typography } from '@mui/material';
import { User } from './User';
import * as Yup from "yup";
import './CSS/Login.css'


type State = {
  redirect: string | null,
  email: string,
  username: string,
  password: string,
  message: string,
  successful: boolean,
  showPassword: boolean,
};

type Props = {};

export default class Register extends Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      redirect: null,
      email: "",
      username: "",
      password: "",
      message: "",
      successful: false,
      showPassword: false,
    };
  }


  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log("Username:" + this.state.username);
      console.log("Email:" + this.state.email);
      console.log("password:" + this.state.password);

      this.setState({
        message: "",
        successful: false
      });
  
      AuthService.register(this.state.username, this.state.email, this.state.password).then(
        response => {
          this.setState({
            redirect: "/profile",
            message: response.data.message,
            successful: true,
          });  
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
  
          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }

    render(){     
        return (
          <body className="login">
              <div className="card">
                  <form onSubmit={this.handleSubmit}>
                  <InputLabel htmlFor="Email">UFL Email</InputLabel>
                  <Input
                      id="email"
                      onChange={(e) => this.setState({email: e.target.value})}
                      value={this.state.email}
                      />
                      <br/><br/>
                  <InputLabel htmlFor="Username">Username</InputLabel>
                  <Input
                      id="Username"
                      onChange={(e) => this.setState({username: e.target.value})}
                      value={this.state.username}
                      />
                      <br/><br/>
                  <InputLabel htmlFor="filled-adornment-password">password</InputLabel>
                    <Input
                      id="filled-adornment-password"
                      type={this.state.showPassword ? 'text' : 'password'}
                      onChange={(e) => this.setState({password: e.target.value})}
                      value={this.state.password}
                    />
                  <br/><br/>
                  <Button variant="contained" type="submit">Register</Button>
                  </form>
              </div>
              <body>
                <div className="footer">
                  <Link to="/Login">
                    <Typography>Already have an account? Login here!</Typography>
                  </Link>
                </div>
              </body>
          </body>
      );
  }
}