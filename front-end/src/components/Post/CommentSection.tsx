import React, {useState, useEffect} from "react";
import axios from "axios";
import { Comment } from "../types/Comment";
import authService from "../../services/auth.service";

type comment_input = {
    Body: string,
    PostID: number,
}

export default function CommentSection(props: {postID: number}) {
    
    const [comments, setComments] = useState<Array<Comment>>([]);
    const [body, setBody] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = authService.getToken();
        if (token !== null) {
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
            console.log("Comment Submmitted to ID:" +  props.postID + ". response: " + res);
            loadComments();
    }).catch((err) => {
        console.log("Comment Failed!!" + err);
    });
    } else {
        console.log('Not logged in');
    }
    }

    useEffect(() => {
       loadComments();
    }, []);

    const loadComments = () => {
        fetch('http://localhost:8080/getcomments/' + props.postID)
            .then((res) => res.json())
            .then((json) => {
                let comment_data: Comment[] = json.data;
                setComments(comment_data);
                console.log("Sucessfully grabbed comments for ID: " + props.postID + "Array: " + comment_data);
            });
    }


    const commentList = comments.map((comment) => {
        console.log(comment.Body);
            return (
                <div key={comment.ID} className="max-w-sm rounded overflow-hidden shadow-lg border-2 p-2">
                    <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{comment.User}</div>
                    <div>{comment.Body}</div>
                </div>
            )
        });

        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <input id="body" value={body} type="text" placeholder="Comment" onChange={(e) => setBody(e.target.value)} required/><br/>
                    <button type="submit">Submit</button>
                </form>
                {commentList}
            </div>
        );
}