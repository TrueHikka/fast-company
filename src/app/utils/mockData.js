import { useEffect, useState } from "react";
import professions from "../mockData/professions.json";
import qualities from "../mockData/qualities.json";
import users from "../mockData/users.json";
import httpService from "../services/http.service";

const useMockData = () => {
    const statusConsts = {
        idle: "NotStarted",
        pending: "In Process",
        successed: "Ready",
        error: "Error occured"
    };

    const [error, setError] = useState(null);
    const [status, setStatus] = useState();
    const [progress, setProgress] = useState(0);
    const [count, setCount] = useState(0);

    const summuryCount = professions.length + qualities.length + users.length;

    const incrementCount = () => {
        setCount((prev) => prev + 1);
    };

    const updateProgress = () => {};

    useEffect(() => {
        if (count !== 0 && status === statusConsts.idle) {
            setStatus(statusConsts.pending);
        }

        const newProgress = Math.floor((count / summuryCount) * 100);
        if (progress < newProgress) {
            setProgress(() => newProgress);
        }
    }, [count]);

    async function initialize() {
        try {
            for (const prof of professions) {
                await httpService.put("profession/" + prof._id, prof);
                incrementCount();
            }
        } catch (error) {
            setError(error);
        }
    }

    return { error, initialize };
};

export default useMockData;
