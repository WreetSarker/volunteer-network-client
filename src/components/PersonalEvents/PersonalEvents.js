import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import DetailPersonalEvents from '../../DetailPersonalEvents/DetailPersonalEvents';

const PersonalEvents = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [personalEvents, setPersonalEvents] = useState([]);

    useEffect(() => {
        fetch('https://glacial-cliffs-28661.herokuapp.com/getPersonalEvents')
            .then(resp => resp.json())
            .then(data => setPersonalEvents(data))
    }, [])

    return (
        <div>
            <h1>These are {loggedInUser.displayName || loggedInUser.name}'s events</h1>
            {
                personalEvents.map(ev => <DetailPersonalEvents ev={ev}></DetailPersonalEvents>)
            }
        </div>
    );
};

export default PersonalEvents;