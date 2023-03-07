import React, { useState, useEffect } from "react";
import { Post } from "./Post";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

export const PostHome = () => {

    const [posts, setPosts] = useState<Array<Post>>([]);

    useEffect(() => {
        fetch('http://localhost:8080/posts')
        .then((response) => response.json())
        .then((json) => {
            let new_posts: Post[] = json;
            setPosts(new_posts);
            console.log(new_posts);
        })
    }, []);

    let gbm1: string = "Indie Live 3/24"
    let gbm2: string = "Indie Live 4/2"
    let gbm3: string = "PC Building Society 2/27"
    let gbm4: string = "OSC Casual Coding 3/7"
    let gbm5: string = "5/4 Classes end"

    let clubs: string = "Advertise clubs/organizations and related events"
    let events: string = "Campus or other events happening around the Gainesville area"
    let classes: string = "Class related posts, questions, and other related information"
    let schedule: string = "Post and discuss your schedules for upcoming semesters"
    let social: string = "For random campus happenings"
    let other: string = "For anything that does not fit into the other categories"

    let post1: string = "A penis is a organ on the male body. it does things and varies in size. I think it's funny"
    let post2: string = "A penis is a organ on the male body. it does things and varies in size. I think it's funny"
    let post3: string = "A penis is a organ on the male body. it does things and varies in size. I think it's funny"
    let post4: string = "A penis is a organ on the male body. it does things and varies in size. I think it's funny"
    let post5: string = "A penis is a organ on the male body. it does things and varies in size. I think it's funny"

    const events_data = [
        gbm1,
        gbm2,
        gbm3,
        gbm4,
        gbm5,
    ]

    const category_data = [
        clubs,
        events,
        classes,
        schedule,
        social,
        other,
    ]

    const recent_data = [
        post1,
        post2,
        post3,
        post4,
        post5,
    ]

    const data = {
        events: events_data,
        categories: category_data,
        recents: recent_data,
    }

    const html_events = data.events.map((event, i) => {
        return (
            <div className="bg-slate-100 rounded-lg border-2 border-slate-400">
                <p className="text-lg font-semibold rounded bg-blue-400">Event: {i}</p>
                <div>
                    <p className="font-light">{event}</p>
                </div>
            </div>
        )
    })

    const html_categories = data.categories.map((category, i) => {
        return (
            <div className="bg-slate-100 rounded-lg border-2 border-slate-400">
                <p className="text-lg font-semibold rounded bg-blue-400">Category: {i}</p>
                <div>
                    <p className="font-light">{category}</p>
                </div>
            </div>
        )
    })

    const html_recents = posts.map((post, i) => {
        const post_url = '/post/' + post.pID;

        return (
            <div className="bg-slate-100 rounded-lg border-2 border-slate-400">
                <p className="text-lg font-semibold rounded bg-blue-400">                        
                    <React.Fragment>
                        <Link to={post_url}>
                            <Typography className='url_styling'>{post.userName}: {post.title}</Typography>
                        </Link>
                    </React.Fragment>
                </p>
            <div>
                    <p className="font-light">{post.body.slice(0, 50) + "..."}</p>
                </div>
            </div>
        )
    })

    return (
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-2 font-google">
            <div className="col-span-4">
                <div className="text-center text-xl font-bold">
                    Events
                </div>
                <div className="grid gap-y-1">
                    {html_events}
                </div>
            </div>
            <div className="col-span-4">
                <div className="text-center text-xl font-bold">
                    Categories
                </div>
                <div className="grid gap-y-1">
                    {html_categories}
                </div>
            </div>
            <div className="col-span-4">
                <div className="text-center text-xl font-bold">
                    Recents
                </div>
                <div className="grid gap-y-1">
                    {html_recents}
                </div>
            </div>
        </div>
    )
}