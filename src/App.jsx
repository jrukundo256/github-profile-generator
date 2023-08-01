import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams, Link } from 'react-router-dom'
import './App.css';

function Home() {
  const [username, setUsername] = useState('');

  const onUpdateUsername = (e) => {
    if (e.key === 'Enter') {
      console.log('Enter key pressed');
      // Redirect to the profile page with the entered username as a URL parameter
      window.location.href = `/profile/${username}`;
    }
  };

  return (
    <>
      <h1>Github Profile Generator</h1>
      <div className="form-control">
        {/* <label>Username</label> */}
        <input
          type='text'
          value={username}
          placeholder="Enter your Github username"
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={onUpdateUsername}
        />
      </div>
    </>
  );
}

function Profile() {
  const [userData, setUserData] = useState(null);
  const { username } = useParams();

  // Fetch user's profile
  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${username}`);
        const userData = await res.json();
        setUserData(userData);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    fetchUser();
  }, [username]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Profile Data for {username}</h2>
      <p>Username: {userData.login}</p>
      <img src={userData.avatar_url} alt="User Avatar" />
      <p>Followers: {userData.followers}</p>
      <p>Following: {userData.following}</p>
      <p>Repositories: {userData.public_repos}</p>
      <p>Location: {userData.location}</p>
      <p>Joined GitHub on: {userData.created_at}</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:username" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
