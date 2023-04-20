import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../types/Post';
import axios from 'axios';
import authService from '../../services/auth.service';

/*
USE THIS WHENEVER MAKING LITTLE POSTCARDS LIKE ON THE HOMEPAGE
(
    if you need to change the format of thise card uniquely for a page like the profile
    which has a delete button, copy/paste this code and manipulate it. Don't CHANGE this format
    with another if statement/more props. This reduces clutter.
)
*/


export default function PostCard(props: {post: Post, color: string}) {

    const [upvotes, setUpvotes] = useState<number>(props.post.netRating);

    const clearUpvotes = () => {
        const token = authService.getToken();
        if (token !== null) {
            const headers = { headers: {'Authorization': `Bearer ${token}`} }
            axios.patch(
                    `http://localhost:8080/user/clearrating/${props.post.id}`,
                    {},
                    headers
                ).then((res) => {
                    if (res.status === 200) {
                        console.log("cleared the users upvote");
                        setUpvotes(res.data.data.netRating);
                    }
                    else {
                        console.log("failed to clear the users upvote. Not upvoted");
                    }
            });
        } else {
            console.log('Not logged in');
        }
    }

    const handleUpvote = () => {
        console.log(props.post);
        const token = authService.getToken();
        if (token !== null) {
            const headers = { headers: {'Authorization': `Bearer ${token}`} }
            axios.patch(
                    `http://localhost:8080/user/likepost/${props.post.id}`,
                    {},
                    headers
                ).then((res) => {
                    if (res.status === 200) {
                        setUpvotes(upvotes + 1)
                    }
                    else {
                        clearUpvotes();
                    }
            }).catch((err) => {
                if(err.response.status === 400)
                {
                    clearUpvotes();
                }
                else {
                    console.log(err.response.status);
                }   
            });
        } else {
            console.log('Not logged in');
        }
    }

    const handleDownvote = () => {
        const token = authService.getToken();
        if (token !== null) {
            const headers = { headers: {'Authorization': `Bearer ${token}`} }
            axios.patch(
                    `http://localhost:8080/user/dislikepost/${props.post.id}`,
                    {},
                    headers
                ).then((res) => {
                    if (res.status === 200) {
                        setUpvotes(upvotes - 1)
                    }
                    else {
                        clearUpvotes();
                    }
            }).catch((err) => {
                if(err.response.status === 400)
                {
                    clearUpvotes();
                }
                else {
                    console.log(err.response.status);
                }
            });
        } else {
            console.log('Not logged in');
        }
    }

    const post_url = '/posts/' + props.post.id;
    return (
        <div key={props.post.id} className={"rounded shadow-lg m-2 border-2 " + props.color}>
            <div className='relative m-2'>
                <div className="">                        
                    <React.Fragment>
                        <Link data-cy={`post-${props.post.title}`} to={post_url}>
                            <p className='url_styling text-lg font-semibold w-5/6'>{props.post.title}</p>
                        </Link>
                    </React.Fragment>
                </div>
                <div>
                    <p className="font-light w-5/6">{props.post.body.slice(0, 50) + "..."}</p>
                </div>
                <div className='absolute top-0 right-0'>
                    {upvotes}
                    <button onClick={() => handleUpvote()}>⬆</button>
                    <button onClick={() => handleDownvote()}>⬇</button>
                </div>
                <div className='absolute bottom-0 right-0 font-thin italic'>
                    {props.post.user} 
                </div>
            </div>
        </div>
    )
}