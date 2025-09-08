import "../stylings/styleheader.css";

function Header({ setPage, isLoggedIn, handleLogout }) {
    return (
        <nav id="header">
            <div id="leftNav">
                <img src="/logo.png" />
                <span>The Student Hub</span>
            </div>
            <div id="rightNav">
                <ul>
                    <li onClick={() => setPage("home")}>Home</li>
                    <li onClick={() => alert("This page isn't ready yet")}>About Us</li>
                    <li onClick={() => alert("This page isn't ready yet")}>Contact Us</li>
                    <li onClick={() => setPage("profile")}>Profile</li>
                    {isLoggedIn ? (
                        <li id="logbtn" onClick={handleLogout}>Logout</li>
                    ) : (
                        <li id="logbtn" onClick={() => setPage("login")}>Login</li>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Header;
