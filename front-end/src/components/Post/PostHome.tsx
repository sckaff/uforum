import React, { useState, useEffect } from 'react'
import { Post } from './Post'
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import ExpandMore from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';


export const PostHome = () => {
    const [posts, setPosts] = useState<Array<Post>>([]);

    useEffect(() => {
        fetch('http://localhost:8080/posts')
        .then((response) => response.json())
        .then((json) => {
            let new_posts: Post[] = json;
            setPosts(new_posts);
            console.log(new_posts);
        })
    }, []);

    const html_data = posts.map((post) => {
        return(
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography>
                        {post.title}
                    </Typography>
                </CardContent>
            </Card>
        );
    })

    const latest_posts = posts.map((post, index, row) => {
        const post_url = '/post/' + post.pID;
        const single_post = 
            <ListItem alignItems='flex-start'>
                <ListItemText
                    primary={
                        <React.Fragment>
                            <Link to={post_url}>
                                <Typography className='url_styling'>{post.title}</Typography>
                            </Link>
                        </React.Fragment>
                    }
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                {post.userName}
                            </Typography>
                            {" — " + post.body.slice(0, 50) + "..."}
                        </React.Fragment>
                    }
                >
                </ListItemText>  
            </ListItem>

        const single_divider = <Divider />
        if((index + 1) === row.length) {
            return (
                <>
                    {single_post}
                </>
            )
        }
        else {
            return (
                <>
                    {single_post}
                    {single_divider}
                </>
            )
        }
    })

    return(
        <body className="pad">
        <Typography variant='h3'>Forum list</Typography>
        <MuiAccordion data-cy="pop_cat" defaultExpanded>
            <MuiAccordionSummary expandIcon={<ExpandMore/>}>
                <Typography>Popular Categories</Typography>
            </MuiAccordionSummary>
            <MuiAccordionDetails>
                {html_data}
            </MuiAccordionDetails>
        </MuiAccordion>
        
        <MuiAccordion data-cy="class_cat" defaultExpanded>
            <MuiAccordionSummary expandIcon={<ExpandMore/>}>
                <Typography>Classwork Related</Typography>
            </MuiAccordionSummary>
            <MuiAccordionDetails>
                {html_data}
            </MuiAccordionDetails>
        </MuiAccordion>

        <MuiAccordion data-cy="campus_cat" defaultExpanded>
            <MuiAccordionSummary expandIcon={<ExpandMore/>}>
                <Typography>Campus Related</Typography>
            </MuiAccordionSummary>
            <MuiAccordionDetails>
                {html_data}
            </MuiAccordionDetails>
        </MuiAccordion>

        <MuiAccordion data-cy="other_cat" defaultExpanded>
            <MuiAccordionSummary expandIcon={<ExpandMore/>}>
                <Typography>Other</Typography>
            </MuiAccordionSummary>
            <MuiAccordionDetails>
                {html_data}
            </MuiAccordionDetails>
        </MuiAccordion>

        <Card sx={{ maxWidth: 360 }}>
            <CardContent>
                <Typography variant='h6'>
                    <b>Latest Posts:</b>
                </Typography>
                <List sx={{ width: '100%', maxWidth: 360 }}>
                    {latest_posts}
                </List>
            </CardContent>
        </Card>
        </body>
    )
}