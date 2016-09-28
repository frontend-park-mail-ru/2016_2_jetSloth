(function () {
    'use strict';

    let session = -1;
    class Game {
        constructor (options) {
            this.el = options.el;
  	    this.backImg = document.createElement('img');
  	    this.backImg.setAttribute('src', '/components/game/gameBackGround.jpg');
  	    this.el.appendChild(this.backImg);
            this.render();
        }

        render () {
            //this.el.classList.add('button');
            //this.setAttrs(this.attrs);
            return this;
        }
	}
	window.Game = Game;
	window.session = session;
})();
