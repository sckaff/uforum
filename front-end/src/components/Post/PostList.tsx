import React, { Component } from "react";
import { Post } from "./Post";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IconButton, TextField } from "@mui/material";
import BasicSnackbar from './BasicSnackbar'
import { makeStyles } from "@mui/material/styles";
import { ClassNames } from "@emotion/react";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import DeleteIcon from '@mui/icons-material/Delete';
import './CSS/GenericPadding.css';

type myStates = {
    current_posts: Post[], 
    name: string, 
    noti_message: string,
    title: string, 
    content: string,
    nameError: boolean,
    titleError: boolean,
    contentError: boolean,
    dispNotification: boolean,
}

export default class PostList extends Component<{}, myStates> {
    constructor(props: Array<any>) {
        super(props);
        this.state = {
            current_posts: [],
            name: "",
            title: "",
            content: "",
            noti_message: "b",
            nameError: false,
            titleError: false,
            contentError: false,
            dispNotification: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleNotifClose = this.handleNotifClose.bind(this);
    }

    handleNotifClose = () => {
        this.setState({
            dispNotification: false
        })
    }

    handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('ran handle submit')
        this.setState({
            nameError: false,
            titleError: false,
            contentError: false,
        })

        //Catch errors for unfilled fields
        if(this.state.name === '') {
            this.setState({
                nameError: true,
                noti_message: "Invalid post!",
                dispNotification: true,
            })
        }
        if(this.state.title === '') {
            this.setState({
                titleError: true,
                noti_message: "Invalid post!",
                dispNotification: true,
            })
        }
        if(this.state.content === '') {
            this.setState({
                contentError: true,
                noti_message: "Invalid post!",
                dispNotification: true,
            })
        }
        if (this.state.name && this.state.content && this.state.title) //If form correctly submitted
        {
            console.log(this.state.name);
            console.log(this.state.title);
            console.log(this.state.content);
            let new_post: Post = {
                pID: Math.floor(Math.random() * 5000).toString(),
                userName: this.state.name,
                title: this.state.title,
                body: this.state.content
            }
            let json_post: any = JSON.stringify(new_post);
            fetch('http://localhost:8080/posts', {
                method: "POST",
                body: json_post,})
                .then((response) => {
                    console.log('penis 1')
                    if(response.status === 200)
                    {
                        console.log('succcess')
                        fetch('http://localhost:8080/posts')
                        .then((response) => response.json())
                        .then((json) => {
                            let new_posts: Post[] = json;
                            this.setState({
                                current_posts: new_posts,
                                noti_message: "Successfully created post!",
                                dispNotification: true,
                                name: "",
                                title: "",
                                content: "",
                            })
                            console.log(new_posts);
                        })
                    }
                    console.log(response)
                    return response.json()
                })
                .catch((err) => {
                    console.log('eeee')
                    console.log(err)
                    this.setState({
                        noti_message: "Error connecting to server!",
                        dispNotification: true,
                    })
                })
        }
    }

    handleDelete = async (post_id: string) => {
        console.log("tried to delete post: " + post_id)
        let updated_posts: Post[] = this.state.current_posts;
        updated_posts.forEach((item, index) => {
            if(item.pID === post_id) this.state.current_posts.splice(index,1);
        })
        fetch('http://localhost:8080/posts/' + post_id, {
            method: "DELETE"})
            .then((response) => {
                console.log('testy')
                this.setState({
                    noti_message: "Successfully deleted post!",
                    current_posts: updated_posts,
                    dispNotification: true,
                })
            })
    }

    componentDidMount(): void {
        fetch('http://localhost:8080/posts')
            .then((response) => response.json())
            .then((json) => {
                let new_posts: Post[] = json;
                this.setState({
                    current_posts: new_posts
                })
                console.log(new_posts);
            })
    }

    render() {
        const formSpacing = {
            marginTop: 2,
            marginBottom: 2,
            display: 'block'
        }

        const htmlData = this.state.current_posts.map((post) => {
            let accordion_id: string = post.userName + '_accordion'
            let delete_id: string = post.userName + '_delete'
            return (
                <Accordion key={post.pID}>
                    <AccordionSummary
                    data-cy={accordion_id}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography>
                        [{post.pID}] <b>{post.userName}:</b> {post.title}
                        </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography>
                            {post.body}
                            <br/>
                            <IconButton data-cy={delete_id} aria-label="delete" onClick={() => this.handleDelete(post.pID)}>
                                <DeleteIcon/>
                            </IconButton>
                    </Typography>
                    </AccordionDetails>
                </Accordion>
            );
        })
        return(
            <body>
                <div>{htmlData}</div>
                <div>
                    <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                            Create a post! 
                            <br/>
                            <TextField 
                                data-cy="name_field"
                                sx={formSpacing}
                                onChange={(e) => this.setState({name: e.target.value})}
                                value={this.state.name}
                                label="Name"
                                variant="outlined"
                                required
                                fullWidth
                                error={this.state.nameError}
                            />
                            <TextField 
                                data-cy="title_field"
                                sx={formSpacing}
                                onChange={(e) => this.setState({title: e.target.value})}
                                value={this.state.title}
                                label="Title"
                                variant="outlined"
                                required
                                fullWidth
                                error={this.state.titleError}
                            />
                            <TextField 
                                data-cy="content_field"
                                sx={formSpacing}
                                onChange={(e) => this.setState({content: e.target.value})}
                                value={this.state.content}
                                label="Content"
                                variant="outlined"
                                required
                                fullWidth
                                error={this.state.contentError}
                                multiline
                                rows={4}
                            />
                            <Button 
                                data-cy="submit"
                                type="submit" 
                                color="primary" 
                                variant="contained"
                                endIcon={<KeyboardArrowRightIcon />}
                            >
                            Submit
                            </Button>
                    </form>
                    <br/>
                </div>
                <BasicSnackbar message={this.state.noti_message} open={this.state.dispNotification} hide={this.handleNotifClose}/>
            </body> 
        )
    }
}