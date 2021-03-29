import React, { useEffect, useState } from 'react';
import Event from '../Event/Event';
import './Home.css'

const Home = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch('https://glacial-cliffs-28661.herokuapp.com/events')
            .then(resp => resp.json())
            .then(data => setEvents(data))
    }, [])
    return (
        <div className="event-container">
            {
                events.map(event => <Event event={event}></Event>)
            }
        </div>
    );
};

export default Home;