import axios from "axios";
import { useState } from "react";

import Navbar from "../Navbar";

function Register() {

    var [name, setName] = useState('');
    var [email, setEmail] = useState('');
    var [password, setPassword] = useState('');
    var [passwordConf, setPasswordConf] = useState('');
    var [errorMessage, setErrorMessage] = useState('');


    function registerUser() {

        if (password !== passwordConf) {
            setErrorMessage("Password and Confirm Password do not match!");
            return;
        }
        var user = {
            user_name: name,
            email: email,
            password: password,
            password_confirmation: passwordConf
        }
        axios.post('https://worksheet-auth.mashupstack.com/register', user).then(response => {
            setErrorMessage('');
            alert("Registration Successful");
        }).catch(error => {
            console.log("API Error:", error);

            if (error.response && error.response.data.errors) {
                setErrorMessage(
                    Object.values(error.response.data.errors)
                        .flat()
                        .join(' ')
                );
            } else if (error.response) {
                setErrorMessage("Registration failed. Please check your details.");
            } else {
                setErrorMessage("Unable to connect to the API. Please try again.");
            }
        })
    }

    return (

        <div className="container">
            <div className="row">
                <Navbar />
                <div className="col-8 offset-2">
                    <h1>Register</h1>
                    {errorMessage ? <div className="alert alert-danger">{errorMessage}</div> : ''}
                    <div className="form-group">
                        <label>Name:</label>
                        <input type="text"
                            className="form-control"
                            value={name}
                            onInput={(event) => setName(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="text"
                            className="form-control"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password"
                            className="form-control"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password:</label>
                        <input type="password"
                            className="form-control"
                            value={passwordConf}
                            onInput={(event) => setPasswordConf(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary float-right" onClick={registerUser}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Register;