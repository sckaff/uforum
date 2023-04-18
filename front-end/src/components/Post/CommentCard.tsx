import React from 'react';
import { Comment } from '../types/Comment';
import authService from "../../services/auth.service";
import axios from "axios";

export default function CommentCard(props: {comment: Comment, comments: Comment[], setComments: Function, userName: String}) {

    const handleDelete = (id: number) => {
        const token = authService.getToken();
        const headers = {
            headers: { 
                'Authorization': `Bearer ${token}`,
            }
        }
        axios.delete("http://localhost:8080/user/deletecomment/" + id, headers)
        .then((res) => {
            console.log(res);
            if (res.status === 200) {
                console.log("Post deleted");
                props.setComments(props.comments.filter((comment) => comment.id !== id));
            }
        });
    }

    const deleteButton = (user: String, id: number, body: String) => {
        if (user === props.userName) {
            return (
                <button data-cy={`comment-delete-${body}`} className="absolute bottom-2 right-2" onClick={() => handleDelete(id)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            )
        }
    }

    return (
        <div key={props.comment.id} className="relative min-w-96 rounded overflow-hidden border-2 p-3">
            <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{props.comment.user}</div>
            <div data-cy={"comment-" + props.comment.body}>{props.comment.body}</div>
            {deleteButton(props.comment.user, props.comment.id, props.comment.body)}
        </div>
    )


}
