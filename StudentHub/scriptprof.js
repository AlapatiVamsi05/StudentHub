if (localStorage.getItem("loggedinUserid")) {
    document.querySelector("#logbtn").textContent = "logout"
}
document.querySelector("#logbtn").addEventListener("click", () => {
    if (localStorage.getItem("loggedinUserid")) {
        localStorage.clear("loggedinUserid")
        alert("loggedout")
        window.location.href = `index.html`
    } else {
        window.location.href = `login.html`
    }
})
function profileRender(userId) {
    fetch("users.json")
        .then(res => res.json())
        .then(users => {
            users.forEach(user => {
                if (user.id == userId) {
                    let profileContainer = document.querySelector("#profileContainer")
                    profileContainer.innerHTML = `
                                    <h1>${user.username}</h1>
                                    <h3>${user.email}</h3>
                                    <span>${user.bio}</span>
                                    <p>Joined at ${new Date(user.joinedAt).toLocaleString()}</p>
                                    <button id="createdbtn">See posts that you created</button>
                                    <div id="createdPostsContainer" style="display:none"></div>
                                    <button id="savedbtn">See posts that you saved</button>
                                    <div id="savedPostsContainer" style="display:none"></div>
                                `
                    document.querySelector("#createdbtn").addEventListener("click", () => {
                        if (document.querySelector("#createdPostsContainer").style.display === "none") {
                            document.querySelector("#createdPostsContainer").style.display = "flex"
                            createdPostsRender(userId)
                        } else {
                            document.querySelector("#createdPostsContainer").style.display = "none"
                        }
                    })

                    document.querySelector("#savedbtn").addEventListener("click", () => {
                        if (document.querySelector("#savedPostsContainer").style.display === "none") {
                            document.querySelector("#savedPostsContainer").style.display = "flex"
                            savedPostsRender(userId)
                        } else {
                            document.querySelector("#savedPostsContainer").style.display = "none"
                        }
                    })
                }
            });
        })
}

function createdPostsRender(userId) {
    fetch("users.json")
        .then(res => res.json())
        .then(users => {
            users.forEach(user => {
                if (user.id == userId) {
                    let postsContainer = document.querySelector("#createdPostsContainer")
                    postsContainer.innerHTML = ``
                    fetch("posts.json")
                        .then(res => res.json())
                        .then(posts => {
                            posts.forEach(post => {
                                user.createdPosts.forEach(createdPostId => {
                                    if (createdPostId == post.id) {
                                        let postDiv = document.createElement("div")
                                        postDiv.className = "postDiv"

                                        let titleDiv = document.createElement("h2");
                                        titleDiv.textContent = post.title;
                                        postDiv.appendChild(titleDiv);

                                        let contentDiv = document.createElement("p");
                                        contentDiv.textContent = post.content;
                                        postDiv.appendChild(contentDiv);

                                        if (post.comments && post.comments.length > 0) {
                                            let commentsDiv = document.createElement("div");
                                            commentsDiv.classList.add("comments");
                                            commentsDiv.style.display = "none";

                                            post.comments.forEach(comment => {
                                                let commentDiv = document.createElement("p");
                                                commentDiv.innerHTML = `<strong>${comment.user}</strong>: ${comment.comment} <br><small>${new Date(comment.createdAt).toLocaleString()}</small>`;
                                                commentsDiv.appendChild(commentDiv);
                                            });

                                            let toggleBtn = document.createElement("button");
                                            toggleBtn.textContent = "See Comments";
                                            toggleBtn.addEventListener("click", () => {
                                                if (commentsDiv.style.display === "none") {
                                                    commentsDiv.style.display = "block";
                                                    toggleBtn.textContent = "Hide Comments";
                                                } else {
                                                    commentsDiv.style.display = "none";
                                                    toggleBtn.textContent = "See Comments";
                                                }
                                            });
                                            postDiv.appendChild(toggleBtn)
                                            postDiv.appendChild(commentsDiv)
                                        }
                                        postsContainer.appendChild(postDiv)
                                    }
                                })
                            })
                        })
                }
            });
        })
}

function savedPostsRender(userId) {
    fetch("users.json")
        .then(res => res.json())
        .then(users => {
            users.forEach(user => {
                if (user.id == userId) {
                    let postsContainer = document.querySelector("#savedPostsContainer")
                    postsContainer.innerHTML = ``
                    fetch("posts.json")
                        .then(res => res.json())
                        .then(posts => {
                            posts.forEach(post => {
                                user.savedPosts.forEach(savedPostId => {
                                    if (savedPostId == post.id) {
                                        let postDiv = document.createElement("div")
                                        postDiv.className = "postDiv"

                                        let titleDiv = document.createElement("h2");
                                        titleDiv.textContent = post.title;
                                        postDiv.appendChild(titleDiv);

                                        let contentDiv = document.createElement("p");
                                        contentDiv.textContent = post.content;
                                        postDiv.appendChild(contentDiv);

                                        let metaDiv = document.createElement("small");
                                        metaDiv.textContent = `Posted by ${post.author} on ${new Date(post.createdAt).toLocaleString()}`;
                                        postDiv.appendChild(metaDiv);

                                        if (post.comments && post.comments.length > 0) {
                                            let commentsDiv = document.createElement("div");
                                            commentsDiv.classList.add("comments");
                                            commentsDiv.style.display = "none";

                                            post.comments.forEach(comment => {
                                                let commentDiv = document.createElement("p");
                                                commentDiv.innerHTML = `<strong>${comment.user}</strong>: ${comment.comment} <br><small>${new Date(comment.createdAt).toLocaleString()}</small>`;
                                                commentsDiv.appendChild(commentDiv);
                                            });

                                            let toggleBtn = document.createElement("button");
                                            toggleBtn.textContent = "See Comments";
                                            toggleBtn.addEventListener("click", () => {
                                                if (commentsDiv.style.display === "none") {
                                                    commentsDiv.style.display = "block";
                                                    toggleBtn.textContent = "Hide Comments";
                                                } else {
                                                    commentsDiv.style.display = "none";
                                                    toggleBtn.textContent = "See Comments";
                                                }
                                            });
                                            postDiv.appendChild(toggleBtn)
                                            postDiv.appendChild(commentsDiv)
                                        }
                                        postsContainer.appendChild(postDiv)
                                    }
                                })
                            })
                        })
                }
            });
        })
}

let userId = localStorage.getItem("loggedinUserid")
if (!userId) {
    document.querySelector("#profileContainer").textContent = "Log in to see your profile."
} else {
    profileRender(userId)
}