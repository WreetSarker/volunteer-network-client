import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useHistory, useLocation } from 'react-router';
import { UserContext } from '../../App';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}

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


    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((res) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    updateUserName(user.name);
                    setLoggedInUser(newUserInfo)
                    history.replace(from)

                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo)
                });
        }
        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((res) => {
                    if (pass.password === pass.confirmPassword) {
                        const newUserInfo = { ...user };
                        newUserInfo.error = '';
                        newUserInfo.success = true;
                        setUser(newUserInfo);
                        setLoggedInUser(newUserInfo);
                        history.replace(from)
                    }
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo)
                });
        }

        e.preventDefault();
    }

    const updateUserName = name => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name,

        }).then(function () {
            // Update successful.
        }).catch(function (error) {
            // An error happened.
        });
    }


    const handleBlur = (event) => {
        let isFieldValid = true;
        let passValue = '';
        let confirmedPass = '';
        if (event.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
        }
        if (event.target.name === 'password') {
            const isPasswordValid = event.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(event.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;
            if (isFieldValid) {
                const newPassInfo = { ...pass };
                newPassInfo[event.target.name] = event.target.value;
                setPass(newPassInfo)
            }
        }
        if (event.target.name === 'confirmPassword') {
            const isConfirmedPasswordValid = event.target.value.length > 6;
            const confirmedPasswordHasNumber = /\d{1}/.test(event.target.value);
            isFieldValid = isConfirmedPasswordValid && confirmedPasswordHasNumber;
            if (isFieldValid) {
                const newPassInfo = { ...pass };
                newPassInfo[event.target.name] = event.target.value;
                setPass(newPassInfo)
            }
        }

        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo);
        }
    }
    return (
        <div>
            <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />

            <label htmlFor="newUser">New User Sign up</label>
            <form onSubmit={handleSubmit}>
                {newUser && <input type="text" onBlur={handleBlur} name="name" placeholder="type your name" />}
                <br />
                <input type="text" onBlur={handleBlur} name="email" placeholder="email" required />
                <br />
                <input type="password" onBlur={handleBlur} name="password" placeholder="password" required />
                <br />
                <input type="password" onBlur={handleBlur} name="confirmPassword" placeholder="confirm password" required />
                <br />
                <input type="submit" value="Submit" />
            </form>
            <p style={{ color: 'red' }}>{user.error}</p>
            {user.success && console.log('success') && <h2 style={{ color: 'red' }}>User {newUser ? 'created' : 'logged in'} successfully</h2>}
        </div>
    );
};

export default Register;