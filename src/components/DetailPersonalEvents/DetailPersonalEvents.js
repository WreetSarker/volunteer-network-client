import React from 'react';
import './DetailPersonalEvents.css'

const DetailPersonalEvents = (props) => {
    const { name, date, email, imageURL, eventName } = props.ev;
    console.log(props.ev);
    const handleDelete = id => {
        console.log(id);
        fetch(`https://glacial-cliffs-28661.herokuapp.com/deleteEvent/${id}`, {
            method: 'DELETE',
        })
    }
    return (
        <div className="events-holder">
            <div className="img-container">
                <img src={imageURL} alt="" />
            </div>
            <div className="info">
                <h3>{eventName}</h3>
                <h4>{date}</h4>
                <button onClick={() => handleDelete(props.ev._id)} className="cancel-btn">Cancel</button>
            </div>
        </div>
    );
};

export default DetailPersonalEvents;