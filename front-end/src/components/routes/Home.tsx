import React, { useEffect, useState } from 'react';
import { Post } from '../types/Post';
import { Category } from '../types/Category';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Home(props: {loggedIn: boolean}) {

    let navigate = useNavigate();
    const [posts, setPosts] = useState<Post[]>([]);
    const [categories, setCategories] = useState<Array<Category>>([]);

    const handleCreatePost = () => {
        navigate('/posts/create')
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

    // Currently uses the same html as the posts, but will be changed to display posts in the event category
    const html_events = posts.map((post, i) => {
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
    })

    const html_categories = categories.map((category, i) => {
        let outline_color;
        if (i % 2 === 0) {
            outline_color = "border-sky-500";
        } else {
            outline_color = "border-orange-500";
        }

        return (
            <div data-cy={category.title} key={category.id} className={"rounded shadow-lg m-2 border-2 border-sky-500 " + outline_color}>
                <div className='relative m-2'>
                    <div className="">                        
                        <p className='url_styling text-lg font-semibold'>{category.description}</p>
                    </div>
                    <div>
                        <p className="font-light">{category.description}</p>
                    </div>
                </div>
            </div>
        )
    })

    const html_recents = posts.map((post, i) => {
        const post_url = '/posts/' + post.id;
        let outline_color;
        if (i % 2 === 0) {
            outline_color = "border-sky-500";
        } else {
            outline_color = "border-orange-500";
        }

        return (
            <div data-cy={"post-" + post.title} key={post.id} className={"rounded shadow-lg m-2 border-2 " + outline_color}>
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
    })

    return (
        <div>
            <div className="max-w-7xl mx-auto grid grid-cols-12 gap-2">
                <div className="col-span-4">
                    <div data-cy="events-tab" className="text-center text-xl font-bold">
                        Events
                    </div>
                    <div className="grid gap-y-1">
                        {html_events}
                    </div>
                </div>
                <div className="col-span-4">
                    <div data-cy="categories-tab" className="text-center text-xl font-bold">
                        Categories
                    </div>
                    <div className="grid gap-y-1">
                        {html_categories}
                    </div>
                </div>
                <div className="col-span-4">
                    <div data-cy="recents-tab" className="text-center text-xl font-bold">
                        Recents
                    </div>
                    <div className="grid gap-y-1">
                        {html_recents}
                    </div>
                </div>
            </div>
            <br/>
            { props.loggedIn ? 
                <div>
                    <button data-cy="create-post-button" onClick={handleCreatePost} className="box-content border-2 rounded bg-slate-300 border-slate-500">Create Post!</button>
                </div> 
                : 
                <div>Login to create a post!</div>
            }
        </div>

    );
}