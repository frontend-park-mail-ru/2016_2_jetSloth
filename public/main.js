'use strict';

import WSManager from './components/game/wsmanager.js'
window.wsm = new WSManager(`ws://${window.location.host}`);
console.log(wsm);
import Router from './modules/router.js'
import SignInView from './views/signin/signin.js'
import SignUpView from './views/signup/signup.js'
import GameGateView from './views/gameGate/gameGate.js'
import MainView from './views/main/main.js'
import AppView from './views/app/app.js'


window.onload = function () {
    let routerConfig = function () {
        (new Router)
            .addRoute('/signin', SignInView)
            .addRoute('/signup', SignUpView)
            .addRoute('/app', AppView)
			.addRoute('/gameGate', GameGateView)
            .addRoute('/', MainView)
            .start();
    }

    routerConfig();
}
