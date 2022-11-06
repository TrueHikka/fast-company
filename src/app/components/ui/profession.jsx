import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
    getProfessionsByIds,
    getProfessionsLoadingStatus,
    loadProfessionsList
} from "../../store/professions";

const Profession = ({ id }) => {
    const dispatch = useDispatch();
    const professionsList = useSelector(getProfessionsByIds(id));
    const isLoading = useSelector(getProfessionsLoadingStatus());

    useEffect(() => {
        dispatch(loadProfessionsList());
    }, []);

    if (!isLoading) {
        return <p>{professionsList.name}</p>;
    } else return "Loading...";
};

Profession.propTypes = {
    id: PropTypes.string
};

export default Profession;
