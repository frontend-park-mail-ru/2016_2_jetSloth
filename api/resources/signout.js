exports.post = {
	"tags": ["signout"],
	"description": "Метод для выхода пользователя",
	"parameters": [
		{
			"name": "session",
			"in": "header",
			"description": "Сессия",
			"type": "string"
		}

	],
	"responses": {
		"200": {
			"description": "Ничего не содержит",
				
		},
		"400": {
			"description": "Ошибка при выполнении запроса"
		}
	},
	"x-amples": [{
		"description": "создание тестового сообщения",
		"request": {
			"params": {
				"login": "test",
				"text": "Проверяем"
			}
		},
		"response": {
			"status": 200,
			"headers": {
				"content-type": "application/json"
			},
			"validator": function (res) {

				if (typeof res.id !== 'number' ) {
					return 'не корректный id';
				}

				if (typeof res.message !== 'string') {
					return 'не корректный текст сообщения';
				}

				if (typeof res.email !== 'string') {
					return 'не корректный login';
				}

				return true;
			}
		}
	}]
};
