import React, { useEffect, useState } from 'react';
import Event from '../Event/Event';

const Home = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/events')
            .then(resp => resp.json())
            .then(data => setEvents(data))
    }, [])
    return (
        <div>
            {
                events.map(event => <Event event={event}></Event>)
            }
        </div>
    );
};

export default Home;