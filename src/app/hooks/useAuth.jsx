import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/user.service";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setTokens } from "../services/localStorage.service";
import configFile from "../config.json"

const httpAuth = axios.create()

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
const [currentUser, setUser] = useState({})
const [error, setError] = useState(null);

async function logIn({ email, password}) {
	const url = `${configFile.authEndPoint}signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;

	try {
		const { data } = await httpAuth.post(url, {
			email,
			password,
			returnSecureToken: true
		});
		setTokens(data);
	} catch (error) {
		errorCatcher(error, setError);
		const { code, message } = error.response.data.error;
		if (code === 400) {
			if (message === "EMAIL_NOT_FOUND" || message === "INVALID_PASSWORD") {
				const errorObject = {
					email: "Неверный логин или пароль"
				};
				throw errorObject;
			}
		}
	}
}

async function signUp({ email, password, ...rest }) {
    const url = `${configFile.authEndPoint}signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;

	try {
		const { data } = await httpAuth.post(url, {
			email,
			password,
			returnSecureToken: true
		});
		setTokens(data)
		await createUser({_id: data.localId, email, ...rest})
	} catch (error) {
		errorCatcher(error)
		const {code, message} = error.response.data.error
		console.log(code, message)
		if(code===400){
			if(message==="EMAIL_EXISTS"){
				const errorObgect = {
					email: "Пользователь с таким Email уже существует"
				}
				throw errorObgect
			}
		}
	}
}

async function createUser(data) {
	try {
		const {content} = userService.create(data)
		setUser(content)
	} catch (error) {
		errorCatcher(error)
	}
}

function errorCatcher(error) {
	const { message } = error.response.data;
	setError(message);
}

useEffect(() => {
	if (error !== null) {
		toast(error);
		setError(null);
	}
}, [error]);

    return (
        <AuthContext.Provider value={{ signUp, logIn, currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AuthProvider;
