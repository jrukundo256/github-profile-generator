
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [username, setUsername] = useState('');

    const navigate = useNavigate();
    

    const onUpdateUsername = (e) => {
        if (e.key === 'Enter') {
            console.log('Enter key pressed');
            // Navigate to the profile page with the entered username as a URL parameter
            navigate(`/profile/${username}`)
        }
    };

    return (
        <>
            <h2>Github Profile Generator</h2>
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

export default Home;
