import React, { useState, useEffect } from "react";
import { Post } from "../types/Post";
import { useParams } from "react-router-dom";

export default function PostView() {

    let { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<Post>();

    useEffect(() => {
        fetch('http://localhost:8080/posts/' + id)
            .then((res) => res.json())
            .then((json) => {
                let post_data: Post = json.data;
                setPost(post_data);
            });
    }, []);

    if (post === undefined) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        );
    }
    else {
        return (
            <div>
                <div>
                    <p>{post.user}: {post.title}</p>
                </div>
                <div>
                    <p>{post.body}</p>
                </div>
            </div>
        );
    }
}