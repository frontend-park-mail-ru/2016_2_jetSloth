(function() {
    'use strict';
	const Router = window.Router;
	const RatingView = window.RatingView;
	const GameView = window.GameView;
	const PregameView = window.PregameView;
	const MainView = window.MainView;
	const SignInView = window.SignInView;
	const SignUpView = window.SignUpView;


	// TIP: роуты нужно указывать от наиболее специфичного к наименее специфичному
	// З.Ы. чтобы более ранние роуты не были префиксами более поздних ;]
	(new Router)
		.addRoute('/game', GameView)
		.addRoute('/rating', RatingView)
		.addRoute('/signIn', SignInView)
		.addRoute('/signUp', SignUpView)
		.addRoute('/pregame', PregameView)
		.addRoute('/', MainView)
		.start();
})();
