exports.get = {
    "tags": ["signin"],
    "description": "При заходе на эту страницу пользователю должна выводится таже самая форма что и при входе на serverAdress/ фронтендовский роутер все поймет и выведет страницу с формой signin",
    "parameters": [],
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
            "validator": function(res) {

                if (typeof res.email !== 'string') {
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
exports.post = {
    "tags": ["signin"],
    "description": "Метод авторизирующий пользователя",
    "parameters": [{
            "name": "username",
            "description": "Логин пользователя",
            "type": "string"
        }, {
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
            "validator": function(res) {

                if (typeof res.email !== 'string') {
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
