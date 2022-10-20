import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import { useHistory, useParams } from "react-router-dom";
import { useProfessions } from "../../hooks/useProfession";
import { mapArrayData } from "../../utils/funcMapArrData";
import { useQualities } from "../../hooks/useQualities";
import { useAuth } from "../../hooks/useAuth";

const UserEditForm = () => {
    const params = useParams();
    const { userId } = params;

	const {userUpdate} = useAuth()

    const [isLoading, setIsLoading] = useState(false);

    const history = useHistory();

	const {professions} = useProfessions()
	const professionsList = mapArrayData(professions)

	const {qualities} = useQualities()
	const qualitiesList = mapArrayData(qualities)

    const [errors, setErrors] = useState({});

    const [data, setData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "male",
        qualities: []
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const newData = {
            ...data,
			qualities: data.qualities.map(q => q.value)
		}
		try {
			userUpdate(newData)
			history.replace(`/users/${userId}`);
		} catch (error) {
			setErrors(error)
		}
    };

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
                        options={professionsList}
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
                        options={qualitiesList}
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
