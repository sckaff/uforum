import React, { useEffect, useState } from "react";
import axios from "axios";
import { Post } from "../types/Post";
import authService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

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
        if (props.loggedIn == false) {
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
                    if (res.status == 200) {
                        console.log("Post deleted");
                        setUserPosts(userPosts.filter((post) => post.id != postid));
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
            return (
                <div key={post.id} className="box-content justify-self-center w-1/3 bg-slate-100 border-2 border-sky-300">
                    <div>Title: {post.title}</div>
                    <div>Body: {post.body}</div>
                    <div>Category: {post.category}</div>
                    <button data-cy={"post-delete-" + post.title} onClick={() => handleDeletePost(post.id)} className="box-content border-2 rounded bg-slate-300 border-slate-500">Delete</button>
                </div>
            )});

        return (
            <div className="grid grid-cols-2 text-center">
                <div>
                    Profile:
                    <div>Username: {username}</div>
                    <div>Email: {email}</div>
                    <div>Creation Date: {creationDate}</div>
                    <button onClick={handleLogoutButton} className="box-content border-2 rounded bg-slate-300 border-slate-500">Logout</button>
                </div>
                <div>
                    Posts:
                    <div className="grid grid-cols-1 gap-2 content-center">
                        {post_data}
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