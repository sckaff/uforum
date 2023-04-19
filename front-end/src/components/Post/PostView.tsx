import React, { useState, useEffect } from "react";
import { Post } from "../types/Post";
import { useParams } from "react-router-dom";
import CommentSection from "./CommentSection";

export default function PostView() {

    const [post, setPost] = useState<Post>();
    const { id } = useParams<{ id: string }>();
    
    useEffect(() => {
        fetch('http://localhost:8080/posts/' + id)
            .then((res) => res.json())
            .then((json) => {
                let post_data: Post = json.data;
                setPost(post_data);
            });
    }, [id]);


    if (post === undefined) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        );
    }
    else {
        return (
            <div className="flex flex-col items-center justify-center mt-1  ">
                <div className="relative min-w-96 w-2/3 rounded overflow-hidden shadow-lg border-2 border-sky-500">
                        <div className="m-3">
                            <div className="text-xl font-sans font-bold m-1">
                                {post.title}
                            </div>
                            <div className="text-lg font-sans italic inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                Posted By: {post.user}
                            </div>
                            <div className="text-lg font-sans italic inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                {post.category}
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 m-3">
                                +1
                                <button>⬆</button>
                                <button>⬇</button>
                        </div>
                        <div className="text-lg font-sans ml-3">
                            {post.body}
                        </div>
                        <br/>
                        </div>
                        <br/>
                        <div className="relative min-w-96 w-2/3 rounded overflow-hidden shadow-lg border-2 border-sky-500">
                            <div className="min-w-96 rounded overflow-hidden shadow-lg border-gray-200">
                                <div>
                                <CommentSection postID={post.id}/> 
                                </div>
                            </div>
                </div>
                <br/><br/>
            </div>
        );
    }
}