exports.post = {
	"tags": ["signin"],
	"description": "Метод авторизирующий пользователя",
	"parameters": [
		{
			"name": "email",
			"description": "Электроная почта пользователя",
			"type": "string"
		},
		{
			"name": "password",
			"description": "Пароль пользователя",
			"type": "string"
		},

	],
	"responses": {
		"200": {
	
				"description": "Содержит ключ сессии пользователя",
				"type": "string"
		},
		"400": {
			"description": "Ошибка при выполнении запроса"
		}
	},
	"x-amples": [{
		"description": "Вход пользователя",
		"request": {
			"params": {
				"email": "test",
				"password": "test"
			}
		},
		"response": {
			"status": 200,
			"headers": {
				"content-type": "application/json"
			},
			"validator": function (res) {

				if (typeof res.email !== 'string' ) {
					return 'не корректный email';
				}

				if (typeof res.password !== 'string') {
					return 'не корректный тpassword';
				}


				return true;
			}
		}
	}]
};
