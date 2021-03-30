import React from 'react';

const DetailPersonalEvents = (props) => {
    const { name, date, email, imageURL, eventName } = props.ev;
    return (
        <div>
            <div>
                <img src={imageURL} alt="" />
                <h3>{eventName}</h3>
                <h4>{date}</h4>
            </div>
        </div>
    );
};

export default DetailPersonalEvents;