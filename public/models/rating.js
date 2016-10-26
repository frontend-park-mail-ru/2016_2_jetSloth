(function () {
	//import
	const Model = window.Model;
	
	class RatingModel extends Model {

		constructor(attributes) {
			super(attributes);
		}

		url() {
			return `${this.baseUrl}/rating.json`;
		}
	}
	
	//export
	window.RatingModel = RatingModel;
	
})();
