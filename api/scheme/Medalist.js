module.exports = {
    "type": "object",
    "description": "Информация об пользователе в рейтинге",

    "properties": {
        "username": {
            "description": "Логин пользователя",
            "type": "string"
        },
        "wins": {
            "description": "Количество побед",
            "type": "integer",
            "minimum": 0
        }
    },
    "required": ["username", "wins"]
};
