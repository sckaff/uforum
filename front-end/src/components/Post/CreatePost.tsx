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

const postBody_class = "text-sm text-gray-base w-96 border rounded m-2";
const postBody_error_class = postBody_class + " border-red-500";

export default function CreatePost(props: {loggedIn: boolean}) {

    const [title, setTitle] = useState<string>("");
    const [body, setBody] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [categories, setCategories] = useState<Array<Category>>([]);
    const [postTitleClassName, setPostTitleClassName] = useState<string>("text-sm text-gray-base w-96 mr-3 py-5 px-11 h-2 border border-gray-200 rounded mb-2 m-2");
    const [postAffirm, setPostAffirm] = useState<string>("font-medium tracking-wide text-green-500 text-xs mt-1 ml-2 invisible");


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
                setPostAffirm(" font-medium tracking-wide text-green-500 text-xs mt-1 ml-2 visible");
                setTitle("");
                setBody("");
                setCategory("");
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
        <div className="flex flex-col items-center justify-center mt-1 ">
         <div className="min-w-96 w-2/3 rounded overflow-hidden shadow-lg border-2 border-sky-500 flex flex-col items-center justify-center">
            <div className="text-xl font-sans font-bold">Create New Post!</div>
            <form onSubmit={handleSubmit}>
                <input className={postTitleClassName} data-cy="post-title-input" id="title" value={title} type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} required/><br/>
                <textarea className={postBody_class} data-cy="post-body-input" id="body" value={body} placeholder="Body" onChange={(e) => setBody(e.target.value)} required/><br/>
                <select data-cy="post-category-select" id="category" onChange={(e) => setCategory(e.target.value)} className="inline-flex w-2/3 m-2 justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold w-36 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" required>
                    <option value="null" disabled selected>Select Category</option>
                    {html_categories}
                </select>
                <button className="bg-orange-400 w-full rounded mb-1 overflow-hidden shadow-lg m-2" data-cy="post-submit-button" type="submit">Create</button>
                <div className={postAffirm}>Post Submitted!</div>
            </form>
            </div>
        </div>
    );
}