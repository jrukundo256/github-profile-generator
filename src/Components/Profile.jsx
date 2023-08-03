import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const { username } = useParams();

  // Fetch user's profile
  useEffect(() => {
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

export default Profile
