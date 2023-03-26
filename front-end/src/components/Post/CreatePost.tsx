import React, { useState, useEffect } from "react";
import axios from "axios";
import { Category } from "../types/Category";
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
    const [categories, setCategories] = useState<Array<Category>>([]);

    useEffect(() => {
        fetch('http://localhost:8080/categories')
        .then((res) => res.json())
        .then((json) => {
            console.log(json);
            let category_data: Category[] = json.data;
            setCategories(category_data);
        });
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(category);
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

    const html_categories = categories.map((category, i) => {
        return (
            <option key={category.id} value={category.title}>{category.title}</option>
        )
    });

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input id="title" value={title} type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} required/><br/>
                <textarea id="body" value={body} placeholder="Body" onChange={(e) => setBody(e.target.value)} required/><br/>
                <select id="category" onChange={(e) => setCategory(e.target.value)} className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold w-36 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" required>
                    <option value="null" disabled selected>Select Category</option>
                    {html_categories}
                </select>
                <br/>
                <button type="submit">Create</button>
            </form>
        </div>
    );
}