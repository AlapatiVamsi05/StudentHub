import { useState, useEffect } from "react";
import "../stylings/styleindex.css";
import "../stylings/stylepost.css";

function Posts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("/posts.json")
            .then((res) => res.json())
            .then((data) => setPosts(data))
    }, []);

    return (
        <div id="postContainer">
            {posts.length === 0 ? (
                <p>No posts to show :( </p>
            ) : (
                posts.map((post) => (
                    <div className="postDiv" key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                        <small className="metaDiv">
                            Posted by {post.author} on{" "}
                            {new Date(post.createdAt).toLocaleString()}
                        </small>

                        {post.comments && post.comments.length > 0 && (
                            <Comments comments={post.comments} />
                        )}
                    </div>
                ))
            )}
        </div>
    );
}

function Comments({ comments }) {
    const [show, setShow] = useState(false);

    return (
        <div>
            <button onClick={() => setShow(!show)}>
                {show ? "Hide Comments" : "See Comments"}
            </button>
            {show && (
                <div className="comments">
                    {comments.map((c, i) => (
                        <p key={i}>
                            <strong>{c.user}</strong>: {c.comment}
                            <br />
                            <small>{new Date(c.createdAt).toLocaleString()}</small>
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
}

function Roadmaps() {
    return <div id="mapContainer">This feature is not available yet!</div>;
}

function Repositories() {
    return <div id="repoContainer">This feature is not available yet!</div>;
}

function Home() {
    const [section, setSection] = useState("posts");

    return (
        <div id="mainDiv">
            <div id="sidebar">
                <ul>
                    <li onClick={() => setSection("posts")}>Posts</li>
                    <li onClick={() => setSection("maps")}>Roadmaps</li>
                    <li onClick={() => setSection("repos")}>GitHub Repositories</li>
                </ul>
            </div>

            <div id="contentDiv">
                {section === "posts" && <Posts />}
                {section === "maps" && <Roadmaps />}
                {section === "repos" && <Repositories />}
            </div>
        </div>
    );
}

export default Home;
