(function() {
    'use strict';

	const Router = window.Router;
	const SignInView = window.SignInView;
	const SignUpView = window.SignUpView;
	const MainView = window.MainView;

	(new Router)
		.addRoute('/signin', SignInView)
		.addRoute('/signup', SignUpView)
		.addRoute('/', MainView)
		.start();
})();
