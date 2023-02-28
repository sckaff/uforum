import React from "react";
import { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { User } from "./User";


type Props = {};

type State = {
  redirect: string | null,
  userReady: boolean,
  currentUser: User
}

export default class Profile extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
    
        this.state = {
          redirect: null,
          userReady: false,
          currentUser: { id: "Sample Joe Biden", username: "SampleMan25", email: "sample@ufl.edu", accessToken: "12345sample"}
        }; 
      }

      componentDidMount() {
        const currentUser = AuthService.getCurrentUser();
    
        if (!currentUser) this.setState({ redirect: "/home" });
        this.setState({ currentUser: currentUser, userReady: true })
      }
    

      handleLogOut() {
          AuthService.logout();
          this.setState({
            currentUser: { id: "", username: "", email: "", accessToken: ""},
          });
      }

    render(){

        if (this.state.redirect) {
            return <Navigate to={this.state.redirect} />
          }
                
        return (
            <body className="pad">
                <div>
                    <Card sx={{ maxWidth: 1400 }}>
                    <CardHeader
                        title={this.state.currentUser.id}
                        subheader={this.state.currentUser.email}
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">{this.state.currentUser.accessToken}</Typography>
                    </CardContent>
                    <Button variant="contained" onClick={this.handleLogOut} href="http://localhost:3000/home">Log Out</Button>
                    </Card>
                </div>
            </body>
        )
    }
}

