import 'date-fns';
import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { UserContext } from '../../App';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';


const Register = () => {
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [user, setUser] = useState({
        name: '',
        email: '',
        eventName: '',
        date: new Date().toDateString('dd/MM/yyyy'),
        error: '',
    });

    const [selectedDate, setSelectedDate] = useState({
        date: new Date().toDateString('dd/MM/yyyy')
    })

    const handleDateChange = (date) => {
        const newDate = { ...selectedDate };
        newDate.date = date.toDateString('dd/MM/yyyy');
        const newUserInfo = { ...user };
        newUserInfo.date = date.toDateString('dd/MM/yyyy');
        setUser(newUserInfo);
        setSelectedDate(newDate);
    };


    const handleSubmit = (e) => {

        history.replace(from);
        e.preventDefault();
    }



    const handleBlur = (event) => {
        let isFieldValid = true;
        if (event.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            newUserInfo.isSignedIn = true
            setUser(newUserInfo);
            setLoggedInUser(newUserInfo);
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" onBlur={handleBlur} name="name" placeholder="Full Name" />
                <br />
                <input type="text" onBlur={handleBlur} name="email" placeholder="Email" required />
                <br />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="start">
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Date"
                            value={selectedDate.date}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </Grid>
                </MuiPickersUtilsProvider>
                <br />
                <input type="text" onBlur={handleBlur} name="eventName" placeholder="Event Name" required />
                <br />
                <input type="submit" value="Registration" />
            </form>

        </div>
    );
};

export default Register;