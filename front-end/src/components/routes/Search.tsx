import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Post } from "../types/Post";
import { Category } from "../types/Category";

export default function Home(props: {loggedIn: boolean}) {

    const [posts, setPosts] = useState<Array<Post>>([]);
    const [searchText, setSearchText] = useState<String>("");
    const [categories, setCategories] = useState<Array<Category>>([]);
    const [category, setCategory] = useState<String>("");

    const updateSearchedPosts = () => {
        let search_posts: Post[] = [];
            posts.forEach((post) => {
                if (category === "") {
                    console.log("category is null yay")
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
                    const post_url = '/posts/' + post.id;
                    let outline_color;
                    if (i % 2 === 0) {
                        outline_color = "border-sky-500";
                    } else {
                        outline_color = "border-orange-500";
                    }

                    return (
                        <div data-cy={"post-" + post.title} key={post.id} className={"rounded shadow-lg m-2 border-2 border-sky-500 " + outline_color}>
                        <div className='relative m-2'>
                            <div className="">                        
                                <React.Fragment>
                                    <Link to={post_url}>
                                        <p className='url_styling text-lg font-semibold'>{post.title}</p>
                                    </Link>
                                </React.Fragment>
                            </div>
                            <div>
                                <p className="font-light">{post.body.slice(0, 50) + "..."}</p>
                            </div>
                            <div className='absolute top-0 right-0'>
                                +1
                                <button>⬆</button>
                                <button>⬇</button>
                            </div>
                            <div className='absolute bottom-0 right-0 font-thin italic'>
                                {post.user} 
                            </div>
                        </div>
                    </div>
                    )
                });
    
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
            <div className="flex flex-col items-center justify-center mt-1">
                <div className="flex flex-col w-3/4">
                    <p className="text-xl font-bold">Search</p>
                    <form>
                        <input className="m-1 border-2 p-1 rounded border-slate-300" data-cy="search-box" type="text" placeholder="Post Title" onChange={(e) => setSearchText(e.target.value)} />
                        <br></br>
                        <select data-cy="category-selector" id="category m-1" onChange={(e) => setCategory(e.target.value)} className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold w-1/4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" required>
                            <option value="" disabled selected>Select Category</option>
                            {html_categories}
                        </select>
                    </form>
                </div>
                <div className="grid grid-cols-3 w-3/4">
                    {updateSearchedPosts()}
                </div>
            </div>
        </div>
    )
}