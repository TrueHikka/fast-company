import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useSelector } from "react-redux";
import {
    getQualitiesBiIds,
    getQualitiesLoadingStatus
} from "../../../store/qualities";

const QualitiesList = ({ qualities }) => {
    const isLoading = useSelector(getQualitiesLoadingStatus());
	const qualitiesList = useSelector(getQualitiesBiIds(qualities));
    
	if (isLoading) return "Loading...";

    return (
        <>
            {qualitiesList.map((qual) => (
                <Quality key={qual._id} {...qual} />
            ))}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
