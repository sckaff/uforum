import React, { useState, useEffect } from "react";
import axios from "axios";
import { Post } from "../types/Post";
import authService from "../../services/auth.service";

type post_input = {
    title: string,
    body: string,
    category: string
}

export default function CreatePost(props: {loggedIn: boolean}) {

    const [title, setTitle] = useState<string>("");
    const [body, setBody] = useState<string>("");
    const [category, setCategory] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = authService.getToken();
        if (token !== null) {
            const post: post_input = {
                title: title,
                body: body,
                category: category,
            }

            const headers = {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                }
            }

            axios.post(
                    'http://localhost:8080/user/createpost',
                    post,
                    headers
                ).then((res) => {
                console.log(res);
            });
        } else {
            console.log('Not logged in');
        }

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input id="title" value={title} type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} required/><br/>
                <textarea id="body" value={body} placeholder="Body" onChange={(e) => setBody(e.target.value)} required/><br/>
                <input id="category" value={category} type="text" placeholder="Category" onChange={(e) => setCategory(e.target.value)} required/><br/>
                <button type="submit">Create</button>
            </form>
        </div>
    );
}