module.exports =  {
	"type": "object",
	"description": "Web socket сообщения посылаемые игроку сервером о действиях происодящих в игре (например начало игры, конец игры, ход пользователя)",

	"properties": {
		"actionId": {
			"description": "Идентификатор игрового события",
			"type": "integer",
			"minimum": 0
		},
		"actionData": {
			"description": "Данные игрового события",
			"type": "integer",
			"minimum": 0

		}
	},
	"required": ["actionId", "actionData"]
};
