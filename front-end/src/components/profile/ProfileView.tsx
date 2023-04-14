import React, { useEffect, useState } from "react";
import axios from "axios";
import { Post } from "../types/Post";
import authService from "../../services/auth.service";
import { useNavigate, Link } from "react-router-dom";

export default function ProfileView(props: {loggedIn: boolean, setLoggedIn: Function}) {

    let navigate = useNavigate();
    const [userPosts, setUserPosts] = useState<Array<Post>>([]);
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [creationDate, setCreationDate] = useState<string>("");

    const handleLogoutButton = async () => {
        authService.logout();
        props.setLoggedIn(false);
        navigate("/profile/login");
    }

    const handleDeletePost = (postid: number) => {
        const token = authService.getToken();
        if (props.loggedIn === false) {
            console.log("Error: not logged in")
        }
        else {
            const headers = {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                }
            }
            axios.delete("http://localhost:8080/user/deletepost/" + postid, headers)
                .then((res) => {
                    console.log(res);
                    if (res.status === 200) {
                        console.log("Post deleted");
                        setUserPosts(userPosts.filter((post) => post.id !== postid));
                    }
                });
        }
    }

    useEffect(() => {
        const token = authService.getToken();
        const headers = {
            headers: { 
                'Authorization': `Bearer ${token}`,
            }
        }
        axios.get("http://localhost:8080/user/", headers)
            .then((res) => {
                let json = res.data.data
                console.log(json)
                setUsername(json.username);
                setEmail(json.email);
                setCreationDate(json.CreatedAt);
            });
        axios.get("http://localhost:8080/user/posts", headers)
            .then((res) => {
                let json = res.data.data
                console.log(json)
                setUserPosts(json);
            });
    }, []);

    if(props.loggedIn) {

        const post_data = userPosts.map((post) => {
            const post_url = '/posts/' + post.id;
                    return (
                        <div data-cy={"post-" + post.title} key={post.id} className={"rounded shadow-lg m-2 border-2 border-sky-500"}>
                        <div className='relative m-2'>
                            <div className="">                        
                                <React.Fragment>
                                    <Link to={post_url}>
                                        <p className='url_styling text-lg font-semibold w-5/6'>{post.title}</p>
                                    </Link>
                                </React.Fragment>
                            </div>
                            <div>
                                <p className="font-light w-5/6">{post.body.slice(0, 50) + "..."}</p>
                            </div>
                            <div className='absolute top-0 right-0'>
                                +1
                                <button>⬆</button>
                                <button>⬇</button>
                            </div>
                            <div className='absolute bottom-0 right-0 font-thin italic'>
                                <br/><button data-cy={"post-delete-" + post.title} onClick={() => handleDeletePost(post.id)} className="bg-orange-400 w-14 rounded overflow-hidden shadow-lg">Delete</button>
                            </div>
                        </div>
                    </div>
                    )});

        return (
            <div className="flex flex-col items-center justify-center">
                <div className="grid grid-cols-3 gap-2 text-left w-2/3">
                <div className="col-span-3 rounded overflow-hidden shadow-xl font-bold text-center text-3xl w-full h-14">{username}'s Profile Page</div>
                    <div className="rounded overflow-hidden shadow-xl">
                       <div className="text-center text-xl font-sans font-bold">Profile Info:</div>
                            <div className="h-54 rounded shadow-lg m-2 border-2 p-2 border-sky-500">
                                <div className="font-sans">Username: {username}</div><br/>
                                <div className="font-sans">Email: {email}</div><br/>
                                <div className="font-sans">Upvote Count: ??? </div><br/>
                                <div className="font-sans">Member Since: {creationDate.slice(0, 10)} </div><br/>
                                <button onClick={handleLogoutButton} className="bottom-0 left-0 bg-orange-400 w-14 rounded overflow-hidden shadow-lg m-2">Logout</button>
                            </div>
                            <br/>
                            <div className="text-center text-xl font-sans font-bold">Friends List:</div><br/>
                            <div className="p-2 rounded shadow-lg m-2 border-2 border-sky-500">
                                <div className="font-sans">No friends yet!</div>
                            </div>
                        </div>
                    <div className="col-span-2 rounded overflow-hidden shadow-xl">
                         <div className="text-center text-xl font-sans font-bold">Posts:</div>
                        <div className="grid grid-cols-1 gap-2 content-center">
                            {post_data}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div>
                Please log-in to view profile!
            </div>
        );
    }
}