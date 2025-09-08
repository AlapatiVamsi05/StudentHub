import { useEffect, useState } from "react";
import "../stylings/styleprof.css";

function Profile({ loggedInUserId }) {
    const [user, setUser] = useState(null);
    const [createdPosts, setCreatedPosts] = useState([]);
    const [savedPosts, setSavedPosts] = useState([]);
    const [showCreated, setShowCreated] = useState(false);
    const [showSaved, setShowSaved] = useState(false);

    useEffect(() => {
        if (!loggedInUserId) return;

        fetch("/users.json")
            .then((res) => res.json())
            .then((users) => {
                const currentUser = users.find((u) => u.id == loggedInUserId);
                if (currentUser) {
                    setUser(currentUser);

                    fetch("/posts.json")
                        .then((res) => res.json())
                        .then((posts) => {
                            setCreatedPosts(
                                posts.filter((p) => currentUser.createdPosts.includes(p.id))
                            );
                            setSavedPosts(
                                posts.filter((p) => currentUser.savedPosts.includes(p.id))
                            );
                        });
                }
            });
    }, [loggedInUserId]);

    if (!loggedInUserId) {
        return <p>Log in to see your profile.</p>;
    }

    if (!user) return <p>Loading profile...</p>;

    return (
        <div id="profileContainer">
            <h1>{user.username}</h1>
            <h3>{user.email}</h3>
            <span>{user.bio}</span>
            <p>Joined at {new Date(user.joinedAt).toLocaleString()}</p>

            <button onClick={() => setShowCreated(!showCreated)}>
                See posts that you created
            </button>
            {showCreated &&
                createdPosts.map((post) => (
                    <div key={post.id} className="postDiv">
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                    </div>
                ))}

            <button onClick={() => setShowSaved(!showSaved)}>
                See posts that you saved
            </button>
            {showSaved &&
                savedPosts.map((post) => (
                    <div key={post.id} className="postDiv">
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                    </div>
                ))}
        </div>
    );
}

export default Profile;
