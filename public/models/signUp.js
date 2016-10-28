(function () {
	//import
	const Model = window.Model;
	
	class SignUpModel extends Model {

		constructor(attributes) {
			super(attributes);
		}

		url() {
			return `${this.baseUrl}/signUp.json`;
		}
	}
	
	//export
	window.SignUpModel = SignUpModel;
	
})();
