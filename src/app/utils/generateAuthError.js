export function generateAuthError(message) {
	switch (message) {
		case "INVALID_PASSWORD" || "EMAIL_NOT_FOUND":
			return "Неверный логин или пароль";
		case "EMAIL_EXISTS":
			return "Пользователь с таким Email уже существует"
		default: 
			return "Слишком много попыток входа. Попробуйте позднее";
	}
}