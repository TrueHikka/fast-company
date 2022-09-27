import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import professionsService from "../services/professions.service";
import { toast } from "react-toastify";

const ProfessionsContext = React.createContext();

export const useProfessions = () => {
    return useContext(ProfessionsContext);
};

export const ProfessionsProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true);
    const [professions, setProfessions] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getProfessionsList();
    }, []);

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    function errorCatcher(error) {
        const { message } = error.responce.data;
        setError(message);
    }

    function getProfession(id) {
        return professions.find((p) => p._id === id);
    }

    async function getProfessionsList() {
        try {
            const { content } = await professionsService.get();
            setProfessions(content);
            setLoading(false);
        } catch (error) {
            errorCatcher();
        }
    }

    return (
        <ProfessionsContext.Provider
            value={{ isLoading, professions, getProfession }}
        >
            {children}
        </ProfessionsContext.Provider>
    );
};

ProfessionsProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
