import React, { useEffect, useState, useRef, useContext } from "react";
import AuthService from "../../services/auth.service";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
    username: string;
    password: string;
    accessToken: string;
}

export default function Login(props: {loggedIn: boolean, setLoggedIn: Function}) {

    let navigate = useNavigate();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [visibility, setVisibility] = useState<string>("invisible");
    const [error, setError] = useState<boolean>(true);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log("submitting")
        e.preventDefault();
        
        AuthService.login(username, password)
            .then((res) => {
                console.log(res);
                if (res.token) {
                    setError(false);
                    props.setLoggedIn(true);
                    navigate("/profile");
                }
            })
            .catch((err) => {
                setError(true);
                console.log(err);
                setVisibility("visible");
            });
    }

    if (props.loggedIn) {
        navigate("/profile");
        return (
            <div>
                Already logged in!
            </div>
        )
    }
    else {
        return (
            // <div>
            //     <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                    // <input id="username" type="text" value={username} placeholder="Username" onChange={(e) => setUsername(e.target.value)} required/>
                    // <input id="password" type="password" value={password} placeholder="Password" onChange={(e) => {setPassword(e.target.value)}} required/>
                    // <button type="submit">Login</button>
            //     </form>
            // </div>
    
            <div>
                <div className="card">
                    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                        <input id="username" type="text" value={username} placeholder="Username" onChange={(e) => setUsername(e.target.value)} required/>
                        <input id="password" type="password" value={password} placeholder="Password" onChange={(e) => {setPassword(e.target.value)}} required/>
                        <button type="submit">Login</button>
                    </form>
                </div>
                <div>
                <div>
                    <div className="footer">
                        <Link to="/profile/register">
                            Don't have an account? Register here!
                        </Link>
                    </div>
                </div>
                <div className={visibility}>
                    <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                        HEY!
                    </div>
                    <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                        <p>Failed to login</p>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}