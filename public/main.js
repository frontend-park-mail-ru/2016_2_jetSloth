(function() {
    'use strict';
    if (typeof window === 'object') {
        //import
        let Button = window.Button;
        let Game = window.Game;
        let Form = window.Form;
        let Input = window.Input;

        let signInPage = document.querySelector('.js-signin');
        let signUpPage = document.querySelector('.js-signup');
        let gamePage = document.querySelector('.js-game');

        let gameBox = new Game({
            el: document.createElement('div')
        });
        let domain = 'https://monopolygames.herokuapp.com';

        let signInForm = new Form({
            el: document.createElement('div'),
            validator: function() {

                let data = signInForm.getFormData();
                let result = true;
                let pasReg = /[\d\w]{5,65}/;
                let emailReg = /([\d\w])+@([\d\w])+/;
                alert("!!!" + signInForm.form.elements);
                let elements = signInForm.form.elements;
                if (!emailReg.test(data.email)) {
                    elements.email.className = 'invalidInput';
                    result = false;
                }
                if (!pasReg.test(data.password)) {
                    elements.password.className = "invalidInput";
                    result = false;
                }
                return result;
            },
            data: {
                title: 'signIn',
                fields: [
                    new Input('text', 'email', 'email'),
                    new Input('password', 'password', 'password')
                ],
                controls: [{
                    text: 'Sign In',
                    attrs: {
                        type: 'submit'
                    }
                }],
            }
        });

        let signUpForm = new Form({
            el: document.createElement('div'),
            validator: function() {
                let data = signUpForm.getFormData();
                let result = true;
                let pasReg = /[\d\w]{5,65}/;
                let emailReg = /([\d\w])+@([\d\w])+/;
                let nameReg = /[\w]{3,65}/;
                let form = signUpForm.form;
                let elements = form.elements;
                if (!emailReg.test(data.email)) {
                    form.elements.email.className = "invalidInput";
                    result = false;
                }
                if (!nameReg.test(data.name)) {
                    form.elements.name.className = "invalidInput";
                    result = false;
                }
                if (!pasReg.test(data.password)) {
                    form.elements.password.className = "invalidInput";
                    result = false;
                }
                if (data.password != data.password2) {
                    form.elements.password2.className = "invalidInput";
                    result = false;
                }
                return result;
            },
            data: {
                title: 'signUp',
                fields: [
                    new Input('text', 'email', 'email'),
                    new Input('text', 'name', 'name'),
                    new Input('password', 'password', 'password'),
                    new Input('password', 'password2', 'repeat password'),
                ],
                controls: [{
                    text: 'Sign Up',
                    attrs: {
                        type: 'submit'
                    }
                }]
            }
        });

        signInForm.on('change', event => {
            if (event.target.className == "invalidInput")
                alert(event.target.name);
            event.target.className = "validInput";
        });
        signInForm.on('submit', event => {
            event.preventDefault();
            let formData = signInForm.getFormData();
            if (signInForm.validator()) {
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                fetch(domain + '/signin', {
                        method: "post",
                        headers: myHeaders,
                        body: JSON.stringify(formData)
                    })
                    .then(
                        function(response) {
                            if (response.status == 200) {
                                let session = response.headers.get('session');
                                signInPage.hidden = true;
                                signUpPage.hidden = true;
                                gamePage.hidden = false;
                                gameBox.start(session);
                                alert("your sesion:" + session);
                            } else {
                                alert("Что-то пошло не так (неправильный логин или пароль?)");
                            }
                        });
            } else {}


        });
        signUpForm.on('change', event => {
            if (event.target.className == "invalidInput")
                event.target.className = "validInput";
        });
        signUpForm.on('submit', event => {
            event.preventDefault();
            let formData = signUpForm.getFormData();

            if (signUpForm.validator()) {
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                fetch(domain + '/signup', {
                        method: "post",
                        headers: myHeaders,
                        body: JSON.stringify(formData)
                    })
                    .then(
                        function(response) {
                            if (response.status == 200) {
                                let session = response.headers.get('session');
                                signInPage.hidden = true;
                                signUpPage.hidden = true;
                                gameBox.start(session);
                                gamePage.hidden = false;
                            } else {
                                alert("Что-то пошло не так (пользователь уже существует?)");
                            }
                        });
            } else {}
        });
        signInPage.appendChild(signInForm.form);

        signUpPage.appendChild(signUpForm.form);

        gamePage.appendChild(gameBox.el);

        gamePage.hidden = true;

        signInPage.hidden = false;

        signUpPage.hidden = false;
    }

    function filter(str, rules = ['KEK']) {
        rules = rules.map(rule => {
            return {
                regexp: new RegExp('\\b' + rule + '\\b', 'g'),
                length: rule.length
            };
        });

        rules.forEach(rule => {
            str = str.replace(rule.regexp, (new Array(rule.length + 1)).join('*'))
        });
        return str;
    }
    if (typeof exports === 'object') {
        exports.filter = filter;
    } else {
        window.filter = filter;
    }
})();
