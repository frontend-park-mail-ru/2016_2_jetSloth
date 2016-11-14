'use strict';

import Router from './modules/router.js'
import SignInView from './views/signin.js'
import SignUpView from './views/signup.js'
import MainView from './views/main.js'


window.onload = function () {
    let routerConfig = function () {
        (new Router)
            .addRoute('/signin', SignInView)
            .addRoute('/signup', SignUpView)
            .addRoute('/', MainView)
            .start();
    }

    routerConfig();
}