import React from 'react';
import './Event.css'

const Event = (props) => {
    const { name, imageURL } = props.event;
    return (
        <div>
            <div className="card-holder">
                <img src={imageURL} alt="" />
                <h3>{name}</h3>
            </div>
        </div>
    );
};

export default Event;