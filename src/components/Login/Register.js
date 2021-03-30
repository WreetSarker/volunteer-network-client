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
    const [newUser, setNewUser] = useState(false);
    const [pass, setPass] = useState({
        password: '',
        confirmPassword: ''
    });
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        error: '',
        success: false,
    });

    const [selectedDate, setSelectedDate] = useState({
        date: new Date()
    })

    const handleDateChange = (date) => {
        const newDate = { ...selectedDate };
        newDate.date = date
        setSelectedDate(newDate);
    };


    const handleSubmit = (e) => {



        e.preventDefault();
    }



    const handleBlur = (event) => {
        let isFieldValid = true;
        let passValue = '';
        let confirmedPass = '';
        if (event.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
        }


        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo);
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