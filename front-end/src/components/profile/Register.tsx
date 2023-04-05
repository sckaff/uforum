import React, { useState } from "react";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { object, string } from 'yup';


export default function Register(props: {loggedIn: boolean, setLoggedIn: Function}) {

    let navigate = useNavigate();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [inputUsernameClassName, setInputUserNameClassName] = useState<string>("text-sm text-gray-base w-full mr-3 py-5 px-11 h-2 border border-gray-200 rounded mb-2 overflow-hidden shadow-lg");
    const [inputEmailClassName, setInputEmailClassName] = useState<string>("text-sm text-gray-base w-full mr-3 py-5 px-11 h-2 border border-gray-200 rounded mb-2 overflow-hidden shadow-lg");
    const [inputPassWordClassName, setInputPassWordClassName] = useState<string>("text-sm text-gray-base w-full mr-3 py-5 px-11 h-2 border border-gray-200 rounded mb-2 overflow-hidden shadow-lg");
    const [errorMsgClassName, setErrorMsgClassName] = useState<string>("flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-10 invisible");

    let registerSchema = object({
        username: string().required('Please Fill Out All Fields'),
        password: string().required('Please Fill Out All Fields'),
        email: string().required('Please Fill Out All Fields').email('Not A Valid Email'),
      });
      
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setInputUserNameClassName("text-sm text-gray-base w-full mr-3 py-5 px-11 h-2 border border-gray-200 rounded mb-2 overflow-hidden shadow-lg");
        setInputEmailClassName("text-sm text-gray-base w-full mr-3 py-5 px-11 h-2 border border-gray-200 rounded mb-2 overflow-hidden shadow-lg");
        setInputPassWordClassName("text-sm text-gray-base w-full mr-3 py-5 px-11 h-2 border border-gray-200 rounded mb-2 overflow-hidden shadow-lg");
        console.log("submitting: " + username + ", " + password + ", " + email)

        await registerSchema
            .validate({username: username, password: password, email: email})
            .then((valid) => {
                //Check If email is UFL email
                let i = 0;
                while (email[i] !== '@') {
                    i++;
                }
                if (email.substring(i, i + 8) === "@ufl.edu") {
                    AuthService.register(username, email, password)
                    .then((res) => {
                        AuthService.login(username, password)
                        .then((res) => {
                            props.setLoggedIn(true);
                            navigate("/profile");
                        })
                    })
                    .catch((err) => {
                        console.log(err);
                        setErrorMsg(err);
                        setErrorMsgClassName("flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-10 visible");
                    });
                } else {
                    console.log(email.substring(i, i + 8));
                    setErrorMsg("Not a UFL Email");
                    setInputEmailClassName("text-sm text-gray-base w-full mr-3 py-5 px-11 h-2 border border-gray-200 rounded mb-2 overflow-hidden shadow-lg border-red-500");
                    setErrorMsgClassName("flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-10 visible");
                }
            })
            .catch((err) => {
                setErrorMsg(err.errors);
                setErrorMsgClassName("flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-10 visible");
                console.log(err.name);
                console.log(err.errors);
                console.log("submitting: " + username + ", " + password + ", " + email)
                if (username === "") {setInputUserNameClassName("text-sm text-gray-base w-full mr-3 py-5 px-11 h-2 border border-gray-200 rounded mb-2 overflow-hidden shadow-lg border-red-500");}
                if (password === "") {setInputPassWordClassName("text-sm text-gray-base w-full mr-3 py-5 px-11 h-2 border border-gray-200 rounded mb-2 overflow-hidden shadow-lg border-red-500");}
                if (email === "" || err.length !== 0) {setInputEmailClassName("text-sm text-gray-base w-full mr-3 py-5 px-11 h-2 border border-gray-200 rounded mb-2 overflow-hidden shadow-lg border-red-500");}
            });
    }

    if (props.loggedIn) {
        navigate("/profile");
        return (
            <div>
                Already Registered!
            </div>
        )
    }
    else {
        return (
                <div className="h-96 flex flex-col items-center justify-center">
                    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                        <input className={inputUsernameClassName} id="username" type="text" value={username} placeholder="Username" onChange={(e) => setUsername(e.target.value)} required/><br/>
                        <input className={inputEmailClassName} id="email" type="email" value={email} placeholder="Email" onChange={(e) => {setEmail(e.target.value)}} required/><br/>
                        <input className={inputPassWordClassName} id="password" type="password" value={password} placeholder="Password" onChange={(e) => {setPassword(e.target.value)}} required/><br/>
                        <div className={errorMsgClassName}>{errorMsg}</div>
                        <button className="bg-orange-400 w-full mt-4 rounded mb-2 overflow-hidden shadow-lg" type="submit">Register</button>
                    </form>
                </div>            
        );
    }
}