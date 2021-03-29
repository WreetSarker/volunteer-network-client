import React from 'react';
import './Event.css'

const Event = (props) => {
    const { name, imageURL, _id } = props.event;
    // const handleDelete = id => {
    //     console.log(id);
    // }
    return (
        <div className="container">
            <div className="card-holder">
                <img src={imageURL} alt="" />
                <h3>{name}</h3>
                {/* <button onClick={() => handleDelete(_id)}>Delete</button> */}
            </div>
        </div>
    );
};

export default Event;