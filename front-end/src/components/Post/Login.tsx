import { Navigate, Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import InputLabel from '@mui/material/InputLabel';
import React, { Component } from "react";
import Input from '@mui/material/Input';
import { Button, Typography } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import './CSS/Login.css'


type State = {
  redirect: string | null,
  username: string,
  password: string,
  loading: boolean,
  message: string,
  showPassword: boolean,
  open: boolean,
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
      open: false,
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (currentUser) {
      this.setState({ redirect: "/profile" });
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
          this.handleError();
        }
      );
    }

     handleError = () => {
      this.setState({
        open: true,
      });  
    };
  
     handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
      this.setState({
        open: false,
      });  
    };

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
                  <Button data-cy="login_comp_button" variant="contained" type="submit">Log In</Button>
                  </form>
              </div>
              <body>
                <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}>
                  <Alert data-cy="alert" onClose={this.handleClose} severity="error" sx={{ width: '100%' }}>
                    Username or Password was incorrect!
                  </Alert>
                </Snackbar>
              </body>
              <body>
                <div className="footer">
                  <Link to="/Register">
                    <Typography className="url_styling">Don't have an account? Register here!</Typography>
                  </Link>
                </div>
              </body>
          </body>
      );
  }
}