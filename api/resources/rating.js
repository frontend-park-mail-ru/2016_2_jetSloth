exports.get = {
    "tags": ["rating"],
    "description": "Выводит рейтинг пользователей",
    "parameters": [],
    "responses": {
        "200": {
            "schema": {
                "description": "Массив пользователей которые в рейтинг попали",
                "type": "array",
                "items": {
                    "$ref": "#/definitions/Medalist"
                }
            }
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
