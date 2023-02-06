import React, { Component } from "react";
import { Post } from "./Post";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TextField } from "@mui/material";
import { makeStyles } from "@mui/material/styles";
import { ClassNames } from "@emotion/react";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

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
    constructor(props: any) {
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
    }

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.setState({
            nameError: false,
            titleError: false,
            contentError: false,
        })

        //Catch errors for unfilled fields
        if(this.state.name == '') {
            this.setState({
                nameError: true
            })
        }
        if(this.state.title == '') {
            this.setState({
                titleError: true
            })
        }
        if(this.state.content == '') {
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
            this.setState({
                name: "",
                title: "",
                content: "",
            })
        }
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
                <>
                <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>[{post.id}] <b>{post.user}:</b> {post.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    {post.body}
                  </Typography>
                </AccordionDetails>
                </Accordion>
                </>
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