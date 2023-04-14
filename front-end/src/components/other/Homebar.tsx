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
                <Link data-cy="create-post-button" to="/posts/create" className="block mt-4 ml-auto lg:inline-block lg:mt-0 text-sky-200 hover:text-white mr-4">
                    Create Post
                </Link>
            );
        } else {
            return;
        }
    }

    return (
        <div className="flex flex-row bg-sky-500 p-6">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <span className="font-bold text-xl tracking-tight">UForum</span>
            </div>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="flex flex-row text-sm lg:flex-grow">
                    <Link data-cy="home-button" to="/" className="block mt-4 lg:inline-block lg:mt-0 text-sky-200 hover:text-white mr-4" data-testid="HomeBtn">
                        Home
                    </Link>
                    <Link data-cy="search_button" to="/posts/search" className="block mt-4 lg:inline-block lg:mt-0 text-sky-200 hover:text-white mr-4" data-testid="SearchBtn">
                        Search
                    </Link>
                    {loginButton()}
                    {createPostButton()}
                </div>
                {/* <div>
                <a href="#" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Download</a>
                </div> */}
            </div>
        </div>
    );
}