(function () {
    'use strict';

    if (typeof window === 'object') {

        //import
        let Button = window.Button;
        let Game = window.Game;
        let Form = window.Form;

        let signInPage = document.querySelector('.js-signin');
        let signUpPage = document.querySelector('.js-signup');
	let gamePage = document.querySelector('.js-game');

	let gameBox = new Game({
		el: document.createElement('div')
	});

        let signInForm = new Form({
            el: document.createElement('div'),
            data: {
                title: 'signIn',
                fields: [
                    {
                        name: 'email',
                        type: 'email'
                    },
                    {
                        name: 'password',
                        type: 'password'
                    }
                ],
                controls: [
                    {
                        text: 'Sign In',
                        attrs: {
                            type: 'submit'
                        }
                    }
                ]
            }
        });

	 let signUpForm = new Form({
            el: document.createElement('div'),
            data: {
                title: 'signUp',
                fields: [
                    {
                        name: 'email',
                        type: 'email'
                    },
		    {
                        name: 'name',
                        type: 'text'
                    },
                    {
                        name: 'password',
                        type: 'password'
                    }
                ],
                controls: [
                    {
                        text: 'Sign Up',
                        attrs: {
                            type: 'submit'
                        }
                    }
                ]
            }
        });

        signInForm.on('submit', event => {
            event.preventDefault();
            let formData = signInForm.getFormData();
            let body = {
			email: formData.email,
			password: formData.password
	    };
	    var myHeaders = new Headers();
	    myHeaders.append("Content-Type", "application/json");
	    fetch('/signin', {method: "post", headers: myHeaders, body: JSON.stringify(body)}) 
		.then(
		function(response) {
		if (response.status == 200) {
			let session = response.headers.get('session');
			signInPage.hidden = true;
			signUpPage.hidden = true;
			gamePage.hidden = false;
			gameBox.start(session);
			alert("your sesion:" + session);
		}
		else {
			alert("Что-то пошло не так (неправильный логин или пароль?)");
		}
		});

        });
        signUpForm.on('submit', event => {
            event.preventDefault();
            let formData = signUpForm.getFormData();
            let body = {
			email: formData.email,
			name: formData.name,
			password: formData.password
		};
	    var myHeaders = new Headers();
	    myHeaders.append("Content-Type", "application/json");
	    fetch('/signup', {method: "post", headers: myHeaders, body: JSON.stringify(body)}) 
		.then(
		function(response) {
		if (response.status == 200) {
			let session = response.headers.get('session');
			signInPage.hidden = true;
			signUpPage.hidden = true;
			gameBox.start(session);
			gamePage.hidden = false;
			alert("your sesion:" + session);
		}
		else {
			alert("Что-то пошло не так (пользователь уже существует?)");
		}
	        });
        });
        signInPage.appendChild(signInForm.el);
        
	signUpPage.appendChild(signUpForm.el);
	
	gamePage.appendChild(gameBox.el);

	gamePage.hidden = true;

        signInPage.hidden = false;

	signUpPage.hidden = false;
    }

})();
