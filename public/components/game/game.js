(function () {
    'use strict';
    class Game {
        constructor (options) {
            this.el = options.el;
  	    this.backImg = document.createElement('img');
  	    this.backImg.setAttribute('src', '/components/game/gameBackGround.jpg');

	    this.info = document.createElement('div');
	    this.el.appendChild(this.info);
  	    this.el.appendChild(this.backImg);
            this.render();
	   // this.el.addEventListener('onchange', function(event){});
        }

        render () {
            //this.el.classList.add('button');
            //this.setAttrs(this.attrs);
            return this;
        }
	start(session) {
		this.info.innerHTML = "<h1>your session: " + session + "</h1>";
		
		}
	}
	window.Game = Game;
})();
