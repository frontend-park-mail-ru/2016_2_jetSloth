(function () {
	//import
	const Model = window.Model;
	
	class SignInModel extends Model {

		constructor(attributes) {
			super(attributes);
		}

		url() {
			return `${this.baseUrl}/signIn.json`;
		}
	}
	
	//export
	window.SignInModel = SignInModel;
	
})();
