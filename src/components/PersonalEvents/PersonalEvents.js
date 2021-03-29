import React, { useContext } from 'react';
import { UserContext } from '../../App';

const PersonalEvents = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div>
            <h1>These are {loggedInUser.displayName}'s events</h1>
        </div>
    );
};

export default PersonalEvents;