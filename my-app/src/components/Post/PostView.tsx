import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Post } from "./Post";
import { jsx } from "@emotion/react";

export const PostView = (props: any) => {
    let { id } = useParams<{ id: string }>();

    const [post, setPost] = useState<Post>();

    useEffect(() => {
        fetch('http://localhost:8080/posts/' + id)
        .then((response) => response.json())
        .then((json) => {
            let new_post: Post = json;
            setPost(new_post);
            console.log(new_post);
        })
    })

    let html_data: JSX.Element;
    if (post === undefined) {
        html_data = <div>loading</div>
    }
    else {
        html_data = <div>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
        </div>
    }
    
    return (
        <div>
            {html_data}
        </div>
    )
}