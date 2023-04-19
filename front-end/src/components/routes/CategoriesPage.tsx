import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Post } from "../types/Post";
import PostCard from "../Post/PostCard";

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
                    let outline_color;
                    if (i % 2 === 0) {
                        outline_color = "border-sky-500";
                    } else {
                        outline_color = "border-orange-500";
                    }
                    return (
                        <PostCard post={post} color={outline_color} />
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