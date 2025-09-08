import { useState } from "react";
import "../stylings/stylelog.css";

function Login({ setPage, setLoggedInUserId }) {
    const [uname, setUname] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!uname || !password) {
            alert("Please fill the form");
            return;
        }

        fetch("/users.json")
            .then((res) => res.json())
            .then((users) => {
                let foundUser = users.find(
                    (user) =>
                        (user.username === uname || user.email === uname) &&
                        user.password === password
                );
                if (foundUser) {
                    alert("Welcome " + foundUser.username);
                    localStorage.setItem("loggedinUserid", foundUser.id);
                    setLoggedInUserId(foundUser.id);
                    setPage("profile");
                } else {
                    alert("No such user found");
                }
            });
    };

    return (
        <div id="centerDiv">
            <form id="loginForm" onSubmit={handleSubmit}>
                <label>
                    Username or Email:{" "}
                    <input
                        type="text"
                        id="name"
                        value={uname}
                        onChange={(e) => setUname(e.target.value)}
                    />
                </label>
                <label>
                    Password:{" "}
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <button type="submit">Sign in</button>
            </form>
            <div id="exampleInfo">
                <p>
                    use username: <strong>pedopascal</strong> and password:{" "}
                    <strong>asdfjkl098</strong> for testing
                </p>
            </div>
        </div>
    );
}

export default Login;
