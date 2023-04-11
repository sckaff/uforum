import React, { useEffect, useState } from 'react';
import authService from '../../services/auth.service';
import { Link } from 'react-router-dom';

export default function Homebar(props: {loggedIn: boolean}) {

    const loginButton = () => {
        if (props.loggedIn === false) {
            return (
                <Link data-cy="login-button" to="/profile/login" data-testid="LogInBtn">
                    <div className="block mt-4 lg:inline-block lg:mt-0 text-sky-200 hover:text-white">Login</div>
                </Link>
            );
        } else {
            console.log("token: " + localStorage.getItem("token"));
            return (
                <Link data-cy="profile-button" to="/profile">
                    <div className="block mt-4 lg:inline-block lg:mt-0 text-sky-200 hover:text-white">Profile</div>
                </Link>
            );
        }
    }

    const createPostButton = () => {
        if (props.loggedIn === true) {
            return (
                <Link data-cy="create-post-button" to="/posts/create">
                    <div className="absolute right-0 mr-6 block lg:inline-block lg:mt-0 text-sky-200 hover:text-white">Create Post</div>
                </Link>
            );
        } else {
            return;
        }
    }

    return (
        <nav className="flex items-center justify-between flex-wrap bg-sky-500 p-6">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <span className="font-bold text-xl tracking-tight">UForum</span>
            </div>
            <div className="block lg:hidden">
                <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                </button>
            </div>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="text-sm lg:flex-grow">
                <>
                <Link data-cy="home-button" to="/" className="block mt-4 lg:inline-block lg:mt-0 text-sky-200 hover:text-white mr-4" data-testid="HomeBtn">
                    Home
                </Link>
                <Link data-cy="search_button" to="/posts/search" className="block mt-4 lg:inline-block lg:mt-0 text-sky-200 hover:text-white mr-4" data-testid="SearchBtn">
                    Search
                </Link>
                {loginButton()}
                {createPostButton()}
                </>
                </div>
                {/* <div>
                <a href="#" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Download</a>
                </div> */}
            </div>
        </nav>
    );
}