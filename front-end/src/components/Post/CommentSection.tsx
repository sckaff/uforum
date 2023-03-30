import React, { useEffect, useState } from "react";
import { Comment } from "../types/Comment";
import authService from "../../services/auth.service";
import axios from "axios";

type comment_input = {
    Body: string,
    PostID: number,
}

export default function CommentSectionNew(props: {postID: number}) {

    const [comments, setComments] = useState<Array<Comment>>([]);
    const [body, setBody] = useState<string>("");
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        fetch('http://localhost:8080/getcomments/' + props.postID)
        .then((res) => res.json())
        .then((json) => {
            authService.isLoggedIn().then((isLogged) => {
                setLoggedIn(isLogged);
            })
            let comment_data: Comment[] = json.data;
            setComments(comment_data);
        });
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        if (loggedIn) {
            const token = authService.getToken();
            const comment: comment_input = {
                Body: body,
                PostID: props.postID,
            }
            const headers = {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                }
            }

            axios.post(
                'http://localhost:8080/user/createcomment',
                comment,
                headers
            ).then((res) => {
                let new_comment = res.data.data;
                setComments([...comments, new_comment])
             }).catch((err) => {
                console.log("Comment Failed!!" + err);
            });

        }
        else {
            console.log("NOT LOGGED IN CANNOT CREATE POST")
        }
    }

    const commentList = comments.map((comment) => {
        return (
            <div key={comment.id} className="max-w-sm rounded overflow-hidden shadow-lg border-2 p-2">
                <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{comment.user}</div>
                <div>{comment.body}</div>
            </div>
        )
    });

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input id="body" value={body} type="text" placeholder="Comment" onChange={(e) => setBody(e.target.value)} required/><br/>
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div>
                {commentList}
            </div>
        </div>
    )
}