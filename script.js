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

function renderPosts() {
    document.querySelector("#mapContainer").innerHTML = ""
    document.querySelector("#repoContainer").innerHTML = ""
    fetch("posts.json")
        .then(res => res.json())
        .then(posts => {
            let postContainer = document.querySelector("#postContainer");
            postContainer.innerHTML = "";

            posts.forEach(post => {
                let postDiv = document.createElement("div");
                postDiv.className = "postDiv"

                let titleDiv = document.createElement("h2");
                titleDiv.textContent = post.title;
                postDiv.appendChild(titleDiv);

                let contentDiv = document.createElement("p");
                contentDiv.textContent = post.content;
                postDiv.appendChild(contentDiv);

                let metaDiv = document.createElement("small");
                metaDiv.textContent = `Posted by ${post.author} on ${new Date(post.createdAt).toLocaleString()}`;
                metaDiv.className = "metaDiv"
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

                    postDiv.appendChild(toggleBtn);
                    postDiv.appendChild(commentsDiv);
                }

                postContainer.appendChild(postDiv);
            });
        })
}

function renderMaps() {
    document.querySelector("#postContainer").innerHTML = ""
    document.querySelector("#repoContainer").innerHTML = ""
    document.querySelector("#mapContainer").innerHTML = "This feature is not available yet!"
}

function renderRepos() {
    document.querySelector("#postContainer").innerHTML = ""
    document.querySelector("#mapContainer").innerHTML = ""
    document.querySelector("#repoContainer").innerHTML = "This feature is not available yet!"
}

renderPosts();
