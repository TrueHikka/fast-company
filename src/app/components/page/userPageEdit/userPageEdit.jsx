import React, { useState, useEffect } from "react";
import api from "../../../api";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";

const UserPageEdit = () => {
    const params = useParams();
    const { userId } = params;

    const [data, setData] = useState({
        email: "",
        name: "",
        profession: "",
        sex: "male",
        qualities: []
    });

    const [qualities, setQualities] = useState([]);
    const [professions, setProfessions] = useState([]);

    // const [updateUser, setUpdateUser] = useState();

    // useEffect(() => {
    //     api.users
    //         .update(userIndex, userData)
    //         .then((index, data) => setUpdateUser(index, data));
    // }, []);
    // console.log(updateUser);
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);
    console.log(user);
    const history = useHistory();

    const handleSave = () => {
        history.replace("/users/:userId");
    };

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };

    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };

    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfessions(professionsList);
            // console.log(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
            // console.log(qualitiesList);
        });
    }, []);

    const handleChange = (target) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { profession, qualities } = data;
        console.log({
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        });
    };

    if (user) {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 p-4 shadow">
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                            />
                            <SelectField
                                label="Выбери свою профессию"
                                defaultOption="Choose..."
                                name="profession"
                                value={data.profession}
                                options={professions}
                                onChange={handleChange}
                            />
                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                label="Выберите ваш пол"
                                name="sex"
                                value={data.sex}
                                onChange={handleChange}
                            />
                            <MultiSelectField
                                label="Выберите ваши качества"
                                name="qualities"
                                options={qualities}
                                defaultValue={data.qualities}
                                onChange={handleChange}
                            />
                            <Link to={`/users/${userId}`}>
                                <button
                                    className="btn btn-primary w-100 mx-auto"
                                    type="submit"
                                    onClick={handleSave}
                                >
                                    Обновить
                                </button>
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        );
    } else {
        return <h1>Loading</h1>;
    }
};

export default UserPageEdit;
