exports.get = {
    "tags": ["game"],
    "description": "Метод отдает игроку информацию об играх к которым можно присоедениться (те игры которые были созданы, но еще не начались т.к. не достаточно пользоветелей вступило в игру",
    "parameters": [{
        "name": "session",
        "in": "header",
        "description": "Сессия",
        "type": "string"
    }, ],
    "responses": {
        "200": {
            "schema": {
                "description": "Массив данных об играх к которым можно присоедениться",
                "type": "array",
                "items": {
                    "$ref": "#/definitions/Game"
                }
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
                "session": "1"
            }
        },
        "response": {
            "status": 200,
            "headers": {
                "content-type": "application/json"
            },
            "validator": function(res) {

                if (typeof res.session !== 'string') {
                    return 'не корректный текст сообщения';
                }

                return true;
            }
        }
    }]
};
exports.post = {
    "tags": ["game"],
    "description": "Web Socket Метод включает игрока в игру",
    "parameters": [{
        "name": "session",
        "in": "header",
        "description": "Сессия",
        "type": "string"
    }, {
        "name": "gameId",
        "in": "query",
        "description": "Номер игры",
        "type": "string"
    }],
    "responses": {
        "200": {
            "description": "Устанавливается Web Socket соединение теперь сервер в течении игры будет посылать WSMessage игроку",
            "schema": {
                "$ref": "#/definitions/WSMessage"
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
                "session": "1",
                "gameId": 1
            }
        },
        "response": {
            "status": 200,
            "headers": {
                "content-type": "application/json"
            },
            "validator": function(res) {

                if (typeof res.gameId !== 'number') {
                    return 'не корректный id';
                }

                if (typeof res.session !== 'string') {
                    return 'не корректая сессия';
                }

                return true;
            }
        }
    }]
};
exports.put = {
    "tags": ["game"],
    "description": "Создает новую игру с заданым количеством мест",
    "parameters": [{
        "name": "session",
        "in": "header",
        "description": "Сессия",
        "type": "string"
    }, {
        "name": "count",
        "in": "query",
        "description": "Количество игроков в игре",
        "type": "integer"
    }],
    "responses": {
        "200": {
            "description": "Данные об игре которую создал пользователь",
            "schema": {
                "$ref": "#/definitions/Game",
            }
        },
        "400": {
            "description": "Ошибка при выполнении запроса"
        }
    },
    "x-amples": [{
        "description": "создание новой игры",
        "request": {
            "params": {
                "session": "1",
                "count": 2
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

                if (res.count < 2) {
                    return 'слишком мало игроков';
                }

                if (res.count > 6) {
                    return 'слишком много игроков';
                }

                if (typeof res.message !== 'string') {
                    return 'не корректный идентификатор сессии';
                }
                return true;
            }
        }
    }]
};
exports.delete = {
    "tags": ["game"],
    "description": "Метод удаляет пользователя из текущей игры",
    "parameters": [{
        "name": "session",
        "in": "Header",
        "description": "Сессия",
        "type": "string"
    }],
    "responses": {
        "200": {
            "schema": {
                "description": "Ничего не передается"
            }
        },
        "400": {
            "description": "Ошибка при выполнении запроса"
        }
    },
    "x-amples": [{
        "description": "Выход тестового пользователя",
        "request": {
            "params": {
                "session": "1"
            }
        },
        "response": {
            "status": 200,
            "headers": {
                "content-type": "application/json"
            },
            "validator": function(res) {
                if (typeof res.message !== 'string') {
                    return 'не корректный идентификатор сессии';
                }

                return true;
            }
        }
    }]
};
