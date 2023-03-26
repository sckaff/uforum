import React, { useEffect, useState } from "react";
import { Post } from "../types/Post";
import { Category } from "../types/Category";

export default function Home(props: {loggedIn: boolean}) {

    const [posts, setPosts] = useState<Array<Post>>([]);
    const [searchText, setSearchText] = useState<String>("");
    const [categories, setCategories] = useState<Array<Category>>([]);
    const [category, setCategory] = useState<String>("");

    const updateSearchedPosts = () => {
        console.log(category);

        let search_posts: Post[] = [];
        if (searchText === "")
        {
            return [];
        }
        else
        {
            posts.forEach((post) => {
                if (category === "") {
                    if (post.title.toLowerCase().includes(searchText.toLowerCase())) {
                        search_posts.push(post);
                    }
                }
                else {
                    if (post.title.toLowerCase().includes(searchText.toLowerCase()) && post.category === category) {
                            search_posts.push(post);
                        }
                    }
                });
                return search_posts.map((post, i) => {
                    return (
                        <div key={i} className="max-w-sm rounded overflow-hidden shadow-lg p-2">
                            <div className="font-bold text-xl mb-2 bg-sky-200 rounded-lg">{post.title}</div>
                            <p>{post.body}</p>
                            <p>{post.category}</p>
                        </div>
                    )
                });
        }
    
    }

    useEffect(() => {
        fetch('http://localhost:8080/posts')
        .then((res) => res.json())
        .then((json) => {
            let post_data: Post[] = json.data;
            setPosts(post_data);
        });
        fetch('http://localhost:8080/categories')
            .then((res) => res.json())
            .then((json) => {
                let category_data: Category[] = json.data;
                setCategories(category_data);
            });
    }, []);

    const html_categories = categories.map((category, i) => {
        return (
            <option key={category.id} value={category.title}>{category.title}</option>
        )
    });

    return (
        <div>
            <h1>Home</h1>
            <p>Logged in: {props.loggedIn ? "Yes" : "No"}</p>
            <form>
                <input type="text" placeholder="Search" onChange={(e) => setSearchText(e.target.value)} />
                <select id="category" onChange={(e) => setCategory(e.target.value)} className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold w-36 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" required>
                    <option value="" disabled selected>Select Category</option>
                    {html_categories}
                </select>
            </form>
            {updateSearchedPosts()}
        </div>
    )
}