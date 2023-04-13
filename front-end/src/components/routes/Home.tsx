import React, { useEffect, useState } from 'react';
import { Post } from '../types/Post';
import { Category } from '../types/Category';
import { Link } from 'react-router-dom';


export default function Home(props: {loggedIn: boolean}) {

    const [posts, setPosts] = useState<Post[]>([]);
    const [categories, setCategories] = useState<Array<Category>>([]);


    useEffect(() => {
        fetch('http://localhost:8080/posts')
            .then((res) => res.json())
            .then((json) => {
                let post_data: Post[] = json.data;
                setPosts(post_data);
            })
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
        if (post.category === "Events") {
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
        }
        else {
            return null;
        }
    })

    const html_categories = categories.map((category, i) => {
        const categories_url = '/categories/' + category.title;
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
                        <React.Fragment>
                            <Link to={categories_url}>                     
                                <p className='url_styling text-lg font-semibold'>{category.description}</p>
                            </Link> 
                        </React.Fragment>
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
        <div className='flex flex-col overflow-hidden h-full p-2'>
            <div className="max-w-7xl mx-auto grid grid-cols-12 gap-2 h-full overflow-hidden">
                <div className="col-span-4 h-full overflow-y-auto">
                    <div data-cy="events-tab" className="text-center text-xl font-bold">
                        Events
                    </div>
                    <div className="grid gap-y-1">
                        {html_events}
                    </div>
                </div>
                <div className="col-span-4 h-full overflow-y-auto">
                    <div data-cy="categories-tab" className="text-center text-xl font-bold">
                        Categories
                    </div>
                    <div className="grid gap-y-1">
                        {html_categories}
                    </div>
                </div>
                <div className="col-span-4 h-full overflow-y-auto">
                    <div data-cy="recents-tab" className="text-center text-xl font-bold">
                        Recents
                    </div>
                    <div className="grid gap-y-1">
                        <div className='flex flex-col'>
                            {html_recents}
                        </div>
                        
                    </div>
                </div>
            </div>
            <br/>
            { props.loggedIn ? 
                <div></div> 
                : 
                <div className="flex items-center shadow bg-blue-500 text-white text-sm font-bold px-4 py-3 w-72 rounded m-2" role="alert">
                <svg className="fill-current shadow w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
                <p>Login to Post and Comment!</p>
              </div>
            }
        </div>

    );
}