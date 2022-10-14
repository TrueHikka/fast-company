import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/user.service";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setTokens } from "../services/localStorage.service";

const httpAuth = axios.create({
	baseURL: "https://identitytoolkit.googleapis.com/v1/",
	params: {
		key: process.env.REACT_APP_FIREBASE_KEY
	}
})

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
const [currentUser, setUser] = useState({})
const [error, setError] = useState(null);

async function logIn({ email, password}) {
	try {
		const { data } = await httpAuth.post(`accounts:signInWithPassword`, {
			email,
			password,
			returnSecureToken: true
		});
		setTokens(data);
	} catch (error) {
		errorCatcher(error, setError);
		const { code, message } = error.response.data.error;
		if (code === 400) {
			switch (message) {
				case "INVALID_PASSWORD" || "EMAIL_NOT_FOUND":
					throw new Error("Неверный логин или пароль")
				default:
					throw new Error("Слишком много попыток входа. Попробуйте позднее.")
			}
		}
	}
}

async function signUp({ email, password, ...rest }) {
	try {
		const { data } = await httpAuth.post(`accounts:signUp`, {
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
