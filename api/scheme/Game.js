module.exports =  {
	"type": "object",
	"description": "Информация об игре",

	"properties": {
		"gameId": {
			"description": "Идентификатор игры",
			"type": "integer",
			"minimum": 0
		},
		"usersArray": {
			"description": "Массив строк являющихся именами игроков подключенных к игре",
			"type": "array",
			"items": {
					"type": "string"
				}
		}
	},
	"required": ["gameId", "usersArray"]
};
