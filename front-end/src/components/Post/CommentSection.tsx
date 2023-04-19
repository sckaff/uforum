import React, { useEffect, useState } from "react";
import { Comment } from "../types/Comment";
import CommentCard from "./CommentCard";
import authService from "../../services/auth.service";
import axios from "axios";

type comment_input = {
    Body: string,
    PostID: number,
}


const comment_class = "text-sm text-gray-base w-full border rounded";
const comment_error_class = comment_class + " border-red-500";

export default function CommentSectionNew(props: {postID: number}) {

    const [comments, setComments] = useState<Array<Comment>>([]);
    const [body, setBody] = useState<string>("");
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [commentInputBox, setCommentInputBox] = useState<string>(comment_class);
    const [isError, setError] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>("");

    useEffect(() => {
        fetch('http://localhost:8080/getcomments/' + props.postID)
        .then((res) => res.json())
        .then((json) => {
            authService.isLoggedIn().then((isLogged) => {
                setLoggedIn(isLogged);
                const token = authService.getToken();
                const headers = {
                    headers: { 
                        'Authorization': `Bearer ${token}`,
                    }
                }
                axios.get("http://localhost:8080/user/", headers)
                .then((res) => {
                    let json = res.data.data
                    setUserName(json.username);
                    console.log("Active User: " + userName);
                })
                .catch((err) => {
                    console.log("Error: " + err);
                });
            })
            let comment_data: Comment[] = json.data;
            setComments(comment_data);
        })
        .catch((err) => {
            console.log("Error: " + err);
        });
    }, [props.postID, userName]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setCommentInputBox(comment_class);
        setError(false);
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
                setBody("");
             }).catch((err) => {
                console.log("Comment Failed!!" + err);
            });

        }
        else {
            console.log("NOT LOGGED IN CANNOT CREATE POST")
            setCommentInputBox(comment_error_class);
            console.log("error happened")
            setError(true);
        }
    }
    const commentList = comments.map((comment) => {
        return (
            <CommentCard key={comment.id} comment={comment} comments={comments} setComments={setComments} userName={userName}/>
        )
    });

    const dispError = () => {
        if (isError) {
            return (
                <div className={"flex items-center font-medium tracking-wide text-red-500 text-xs my-1 ml-10"}>You must be logged in to comment!</div>
            )
        }
        else {
            return (
                <></>
            )
        }
    }

    return (
        <div className="p-2">
            <div>
                <p data-cy="comment-title" className="text-lg font-sans font-bold ml-3 mt-1">Create a comment:</p>
                <form onSubmit={handleSubmit}>
                    {dispError()}
                    <textarea className={commentInputBox} data-cy="comment-input" id="body" value={body} rows={4} placeholder="Comment" onChange={(e) => setBody(e.target.value)} required/><br/>
                    <button className="p-1 bg-orange-400 w-1/6 rounded mb-1 overflow-hidden shadow-lg mt-1" data-cy="comment-submit" type="submit">Submit</button>
                </form>
            </div>
            <div>
                <p data-cy="comment-title" className="text-lg font-sans font-bold mx-3">Comments:</p>
                {comments.length === 0 ? <div className="flex items-center justify-center font-medium tracking-wide text-gray-400 text-s">No comments yet!</div> : commentList}
            </div>
        </div>
    )
}