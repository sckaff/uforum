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
    const [visibility, setVisibility] = useState<string>("invisible");

    let registerSchema = object({
        username: string().required('Please Fill Out All Fields'),
        password: string().required('Please Fill Out All Fields'),
        email: string().required('Please Fill Out All Fields').email('Not A Valid Email'),
      });
      
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
                        setVisibility("visible");
                    });
                } else {
                    console.log(email.substring(i, i + 8));
                    setErrorMsg("Not a UFL Email");
                }
            })
            .catch((err) => {
                setErrorMsg(err.errors);
                setVisibility("visible");

                console.log(err.name);
                console.log(err.errors); 
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
            <div>
                <div className="card">
                    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                        <input id="username" type="text" value={username} placeholder="Username" onChange={(e) => setUsername(e.target.value)} required/>
                        <input id="email" type="email" value={email} placeholder="email" onChange={(e) => {setEmail(e.target.value)}} required/>
                        <input id="password" type="password" value={password} placeholder="Password" onChange={(e) => {setPassword(e.target.value)}} required/>
                        <button type="submit">Register</button>
                    </form>
                </div>
                <div>
                <div className={visibility}>
                <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                        HEY!
                    </div>
                    <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                        <p>{errorMsg}</p>
                    </div>                </div>
                </div>
                <div>
                </div>
            </div>
            
        );
    }
}