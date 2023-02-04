import React, { Component } from "react";
import { Post } from "./Post";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TextField } from "@mui/material";

export default class PostList extends Component<{}, { current_posts: Post[] }> {
    constructor(props: any) {
        super(props);
        this.state = {
            current_posts: []
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
            <form>
                <label>
                    Create a post! 
                    Name: <TextField />
                    Title: <input type="text" name="title" />
                    Content: <textarea name="body" />
                </label>
            </form>
            </>
        )
    }
}