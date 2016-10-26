(function () {
	//import
	const Model = window.Model;
	
	class AvaliableGames extends Model {

		constructor(attributes) {
			super(attributes);
		}

		url() {
			return `${this.baseUrl}/signUp.json`;
		}
	}
	
	//export
	window.AvaliableGames = AvaliableGames;
	
})();
