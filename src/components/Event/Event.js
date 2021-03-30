import React, { useContext } from 'react';
import { UserContext } from '../../App';
import './Event.css'

const Event = (props) => {
    const { name, imageURL, _id } = props.event;
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    // const handleDelete = id => {
    //     console.log(id);
    // }
    const handleAddEvent = () => {
        const personalEvent = {};
        personalEvent.name = loggedInUser.name || loggedInUser.displayName;
        personalEvent.date = new Date().toDateString('dd/MM/yyyy');
        personalEvent.email = loggedInUser.email;
        personalEvent.imageURL = imageURL;
        personalEvent.eventName = name;
        console.log(personalEvent);
        fetch('https://glacial-cliffs-28661.herokuapp.com/personalEvent', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(personalEvent)
        })
    }
    return (
        <div className="container">
            <div className="card-holder">
                <img src={imageURL} alt="" />
                <h3 className="event-name">{name}</h3>
                {loggedInUser?.email && <button onClick={handleAddEvent} className="event-btn"> Add Event</button>}
                {/* <button onClick={() => handleDelete(_id)}>Delete</button> */}
            </div>
        </div>
    );
};

export default Event;