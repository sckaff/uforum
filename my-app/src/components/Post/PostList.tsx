import React, { Component } from "react";
import { Post } from "./Post";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IconButton, TextField } from "@mui/material";
import { makeStyles } from "@mui/material/styles";
import { ClassNames } from "@emotion/react";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import DeleteIcon from '@mui/icons-material/Delete';

type myStates = {
    current_posts: Post[], 
    name: string, 
    title: string, 
    content: string,
    nameError: boolean,
    titleError: boolean,
    contentError: boolean,
}

export default class PostList extends Component<{}, myStates> {
    constructor(props: Array<any>) {
        super(props);
        this.state = {
            current_posts: [],
            name: "",
            title: "",
            content: "",
            nameError: false,
            titleError: false,
            contentError: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.setState({
            nameError: false,
            titleError: false,
            contentError: false,
        })

        //Catch errors for unfilled fields
        if(this.state.name === '') {
            this.setState({
                nameError: true
            })
        }
        if(this.state.title === '') {
            this.setState({
                titleError: true
            })
        }
        if(this.state.content === '') {
            this.setState({
                contentError: true
            })
        }
        if (this.state.name && this.state.content && this.state.title) //If form correctly submitted
        {
            console.log(this.state.name);
            console.log(this.state.title);
            console.log(this.state.content);
            let new_post: Post = {
                id: '4',
                user: this.state.name,
                title: this.state.title,
                body: this.state.content
            }
            this.setState({
                current_posts: [...this.state.current_posts, new_post]
            })
            let json_post: any = JSON.stringify(new_post);
            fetch('http://localhost:8080/posts', {
                method: "POST",
                body: json_post,})
                .then((response) => {
                    if(response.status === 200)
                    {
                        this.setState({
                            name: "",
                            title: "",
                            content: "",
                        })
                    }
                }).catch((err) => {console.log(err)})
        }
    }

    handleDelete = async (post_id: string) => {
        console.log("tried to delete post: " + post_id)
        let updated_posts: Post[] = this.state.current_posts;
        updated_posts.forEach((item, index) => {
            if(item.id === post_id) this.state.current_posts.splice(index,1);
        })
        fetch('http://localhost:8080/posts/' + post_id, {
            method: "DELETE"})
            .then((response) => response.json())
            .then((json) => {
                console.log('testy')
                console.log(json)
                this.setState({
                    current_posts: updated_posts
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
            return (
                <Accordion key={post.id}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography>
                        [{post.id}] <b>{post.user}:</b> {post.title}
                        </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography>
                            {post.body}
                            <br/>
                            <IconButton aria-label="delete" onClick={() => this.handleDelete(post.id)}>
                                <DeleteIcon/>
                            </IconButton>
                    </Typography>
                    </AccordionDetails>
                </Accordion>
            );
        })
        return(
            <>
            <div>{htmlData}</div>
            <div>
                <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                        Create a post! 
                        <br/>
                        <TextField 
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
            
            </>
        )
    }
}