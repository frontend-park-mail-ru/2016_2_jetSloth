module.exports = {
    "type": "object",
    "description": "Информация об игре",

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
