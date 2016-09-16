(function() {
    'use strict';

    let userData = {};

    // function filter (str, rules = ['КЕК']) {
    //    return `//TODO: реализовать filter`;
    //}

    function onLogin (form, block) {
        userData = {

            user: form.elements['user'].value,
            email: form.elements['email'].value
        };

        var result = request('/users', userData);

        if( result != undefined ) {
            form.hidden = true;
            window.helloWorld.innerHTML = helloUser(userData.user, result);


            jsLogin.hidden = true;
            jsChat.hidden = false;

            if (userData.user) {
                userData.user = filter(userData.user);
                jsTitle.innerHTML = jsTitle.innerHTML.replace('%username%', userData.user);
            }
        }

        subscribe();
    }

    function createMessage (opts, isMy = false) {
        let message = document.createElement('div');
        let email = document.createElement('div');

        message.classList.add('chat__message');
        email.classList.add('chat__email');

        if (isMy) {
            message.classList.add('chat__message_my');
        } else {
            message.style.backgroundColor = `#${technolibs.colorHash(opts.email || '')}`;
        }
        message.innerHTML = opts.message;
        email.innerHTML = opts.email;
        message.appendChild(email);


        return message;
    }

    function onChat (form) {
        let data = {
            message: form.elements['message'].value,
            email: userData.email
        };

        let result = technolibs.request('/api/messages', data);
        form.reset();
    }

    function renderChat (items) {
        jsMessages.innerHTML = '';
        items.forEach(item => {
            let message = createMessage(item, item.email === userData.email);
            jsMessages.appendChild(message);
        });
        jsMessages.scrollTop = jsMessages.scrollHeight;
    }

    function subscribe () {
        technolibs.onMessage(data => {
            renderChat(Object.keys(data).map(key => data[key]));
        });
    }


    function plural (num) {

        if( num >= 2 && num <= 4 ) {
            return "раза";
        }else {
            return "раз";
        }
    }

    function helloUser (text, count) {
        return 'Привет, ' + text + ', вы заходили ' + count + ' раз.';
    }

    function hello (text) {
        return text;
    }

    function hello(text) {
        return 'Привет, ' + text;
    }

    function filter(str) {

        let rules = window.rules || [];

        rules = rules.map( rule => {
            return {
                regex: new RegExp(rule, 'g'),
                length: rule.length
            };
        });

        rules.forEach( rule => {
            str = str.replace(rule.regex, (new Array(rule.length + 1)).join('*'))
        });


        return str;
    }

    if (typeof exports === 'object') { // for Node.js
        exports.hello = hello;
        exports.plural = plural;
        exports.filter = filter;
    }else {
        window.onLogin = onLogin;
        window.onChat = onChat;
    }

})();


