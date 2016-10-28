exports.get = {
    "tags": ["signup"],
    "description": "При заходе на эту страницу пользователю должна выводится таже самая форма что и при входе на serverAdress/ фронтендовский роутер все поймет и выведет страницу с формой signup",
    "parameters": [],
    "responses": {
        "200": {
            "schema": {
                "description": "Содержит ключь сессии пользователя",
                "type": "string"
            }
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
            "validator": function(res) {

                if (typeof res.id !== 'number') {
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

exports.post = {
    "tags": ["signup"],
    "description": "Метод регистрирует нового пользователя",
    "parameters": [{
            "name": "username",
            "description": "Логин пользователя",
            "type": "string"
        }, {
            "name": "name",
            "description": "Пароль пользователя",
            "type": "string"
        }

    ],
    "responses": {
        "200": {
            "schema": {
                "description": "Содержит ключь сессии пользователя",
                "type": "string"
            }
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
            "validator": function(res) {

                if (typeof res.id !== 'number') {
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
