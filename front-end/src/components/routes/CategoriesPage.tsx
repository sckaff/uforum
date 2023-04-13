import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Post } from "../types/Post";

export default function CategoriesPage() {

    let { category } = useParams<{ category: string }>();
    const [posts, setPosts] = useState<Array<Post>>([]);

    const updatePosts = () => {
        let search_posts: Post[] = [];
            posts.forEach((post) => {
                if (post.category === category) {
                        search_posts.push(post);
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
    }, []);

    return (
        <div>
            <div className="text-center text-xl font-bold">{category} Posts!</div>
            <div className="flex flex-col items-center justify-center mt-1">
                <div className="grid grid-cols-3 w-3/4">
                    {updatePosts()}
                </div>
            </div>
        </div>
    )
}