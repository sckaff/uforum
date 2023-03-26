import React, { useState, useEffect } from "react";
import { Post } from "../types/Post";
import { Comment } from "../types/Comment";
import { useParams } from "react-router-dom";

export default function PostView() {

    let { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<Post>();
    const [comments, setComments] = useState<Comment[]>([]);
    
    useEffect(() => {
        fetch('http://localhost:8080/posts/' + id)
            .then((res) => res.json())
            .then((json) => {
                let post_data: Post = json.data;
                setPost(post_data);
            });
    }, []);

    const commentList = comments.map((Comment, i) => {
        return (
            <div className="max-w-sm rounded overflow-hidden shadow-lg border-2 p-2">
            <h1 className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{Comment.user}</h1>
            <p>{Comment.text}</p>
        </div>
        )
    });

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
                <div>
                    <p>Comments:</p>
                        <div>
                          {commentList}  
                        </div>

                </div>
            </div>
        );
    }
}