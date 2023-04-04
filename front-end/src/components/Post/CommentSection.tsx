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
    const [commentInputBox, setCommentInputBox] = useState<string>("text-sm text-gray-base w-full mr-3 py-5 px-11 h-2 border rounded mb-2 overflow-hidden");
    const [errorMsg, setErrorMsg] = useState<string>("flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-10 invisible");
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
        setCommentInputBox("text-sm text-gray-base w-full mr-3 py-5 px-11 h-2 border rounded mb-2 overflow-hidden");
        setErrorMsg("flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-10 invisible");
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
            setCommentInputBox("text-sm text-gray-base w-full mr-3 py-5 px-11 h-2 border rounded mb-2 overflow-hidden border-red-500");
            setErrorMsg("flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-10 visible");
        }
    }

    const commentList = comments.map((comment) => {
        return (
            <div key={comment.id} className="min-w-96 rounded overflow-hidden shadow-lg border-2 p-2">
                <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{comment.user}</div>
                <div data-cy={"comment-" + comment.body}>{comment.body}</div>
            </div>
        )
    });

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <br/>
                    <input className={commentInputBox} data-cy="comment-input" id="body" value={body} type="text" placeholder="Comment" onChange={(e) => setBody(e.target.value)} required/><br/>
                    <div className={errorMsg}>You must be logged in to comment!</div>
                    <button className="bg-orange-400 w-full mt-4 rounded mb-2 overflow-hidden shadow-lg" data-cy="comment-submit" type="submit">Submit</button>
                </form>
            </div>
            <div>
                {commentList}
            </div>
        </div>
    )
}