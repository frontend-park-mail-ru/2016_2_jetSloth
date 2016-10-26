(function () {
	//import
	const Model = window.Model;
	
	class GameModel extends Model {

		constructor(attributes) {
			super(attributes);
		}

		url() {
			return `${this.baseUrl}/game.json`;
		}
	}
	
	//export
	window.GameModel = GameModel;
	
})();
