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
  username: string,
  password: string,
  loading: boolean,
  message: string,
  showPassword: boolean,
};

type Props = {};

export default class Login extends Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      redirect: null,
      username: "",
      password: "",
      loading: false,
      message: "",
      showPassword: false,
    };
  }


  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log("Username:" + this.state.username);
      console.log("password:" + this.state.password);

      this.setState({
        message: "",
        loading: true
      });
  
      AuthService.login(this.state.username, this.state.password).then(
        () => {
          this.setState({
            redirect: "/profile"
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
            loading: false,
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
                  <Button variant="contained" type="submit">Log In</Button>
                  </form>
              </div>
              <body>
                <div className="footer">
                  <Link to="/Register">
                    <Typography>Don't have an account? Register here!</Typography>
                  </Link>
                </div>
              </body>
          </body>
      );
  }
}