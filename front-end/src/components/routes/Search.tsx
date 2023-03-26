import React, { useEffect, useState } from "react";
import { Post } from "../types/Post";
import { Category } from "../types/Category";

export default function Home(props: {loggedIn: boolean}) {

    const [posts, setPosts] = useState<Array<Post>>([]);
    const [categories, setCategories] = useState<Array<Category>>([]);
    const [searched_posts, setSearchedPosts] = useState<Array<Post>>([]);

    const handleChangeSearch = (input: String) => {
        console.log(input);

        let search_posts: Post[] = [];
        if (input === "") {
            setSearchedPosts(search_posts);
        }
        else {
            posts.forEach((post) => {
                if (post.title.toLowerCase().includes(input.toLowerCase())) {
                    search_posts.push(post);
                }
            });
            setSearchedPosts(search_posts);
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

    const html_posts = searched_posts.map((post, i) => {
        return (
            <div key={i} className="max-w-sm rounded overflow-hidden shadow-lg p-2">
                <div className="font-bold text-xl mb-2 bg-sky-200 rounded-lg">{post.title}</div>
                <p>{post.body}</p>
                <p>{post.category}</p>
            </div>
        )
    });

    return (
        <div>
            <h1>Home</h1>
            <p>Logged in: {props.loggedIn ? "Yes" : "No"}</p>
            <form>
                <input type="text" placeholder="Search" onChange={(e) => handleChangeSearch(e.target.value)} />
            </form>
            {html_posts}
        </div>
    )
}