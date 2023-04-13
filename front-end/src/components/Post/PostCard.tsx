import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../types/Post';

/*
USE THIS WHENEVER MAKING LITTLE POSTCARDS LIKE ON THE HOMEPAGE
(
    if you need to change the format of thise card uniquely for a page like the profile
    which has a delete button, copy/paste this code and manipulate it. Don't CHANGE this format
    with another if statement/more props. This reduces clutter.
)
*/


export default function PostCard(props: {post: Post, color: string}) {
    const post_url = '/posts/' + props.post.id;
    return (
        <div data-cy={"post-" + props.post.title} key={props.post.id} className={"rounded shadow-lg m-2 border-2 " + props.color}>
            <div className='relative m-2'>
                <div className="">                        
                    <React.Fragment>
                        <Link to={post_url}>
                            <p className='url_styling text-lg font-semibold'>{props.post.title}</p>
                        </Link>
                    </React.Fragment>
                </div>
                <div>
                    <p className="font-light">{props.post.body.slice(0, 50) + "..."}</p>
                </div>
                <div className='absolute top-0 right-0'>
                    +1
                    <button>⬆</button>
                    <button>⬇</button>
                </div>
                <div className='absolute bottom-0 right-0 font-thin italic'>
                    {props.post.user} 
                </div>
            </div>
        </div>
    )
}