import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import api from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import { useHistory, useParams } from "react-router-dom";

const UserEditForm = () => {
    const params = useParams();
    const { userId } = params;

    const [isLoading, setIsLoading] = useState(false);

    const history = useHistory();

    const [data, setData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "male",
        qualities: []
    });

    const [qualities, setQualities] = useState([]);
    const [professions, setProfessions] = useState([]);
    const [errors, setErrors] = useState({});

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
            console.log(elem);
            for (const quality in qualities) {
                console.log(quality);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const { profession, qualities } = data;
        api.users.update(userId, {
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        });
        history.replace(`/users/${userId}`);
    };

    const transformData = (data) => {
        return data.map((qual) => ({ label: qual.name, value: qual._id }));
    };

    useEffect(() => {
        setIsLoading(true);
        api.users.getById(userId).then(({ profession, qualities, ...data }) =>
            setData((prevState) => ({
                ...prevState,
                ...data,
                qualities: transformData(qualities),
                profession: profession._id
            }))
        );
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfessions(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);

    useEffect(() => {
        if (data._id) setIsLoading(false);
    }, [data]);

    const validatorConfig = {
        name: {
            isRequired: {
                message: "Введите Ваше имя"
            }
        },
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        profession: {
            isRequired: {
                message: "Обязательно выберите Вашу профессию"
            }
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    const handleChange = (target) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    return (
        <>
            {!isLoading && Object.keys(professions).length > 0 ? (
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Имя"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        error={errors.name}
                    />
                    <TextField
                        label="Электронная почта"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        error={errors.email}
                    />
                    <SelectField
                        label="Выбери свою профессию"
                        defaultOption="Choose..."
                        name="profession"
                        value={data.profession}
                        options={professions}
                        onChange={handleChange}
                        error={errors.profession}
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
                    <button
                        className="btn btn-primary w-100 mx-auto"
                        type="submit"
                        disabled={!isValid}
                    >
                        Обновить
                    </button>
                </form>
            ) : (
                "Loading..."
            )}
        </>
    );
};

export default UserEditForm;
