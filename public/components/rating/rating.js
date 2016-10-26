(function () {
	'use strict';

	// import
	const Block = window.Block;
	const RatingModel = window.RatingModel;
	const Router = window.Router;


	class Rating extends Block {
		constructor({data = {medalists: []}, el}) {
			super('div');
			this.router = new Router();
			this.data = data;
			this._el = el;
			this.template = function(data) {
				let str = "<h3>Рейтинг</h3>"
				str += `<button class="goBackButton">X</button>`;
				str += "Nickname  Rating";
				this.data.medalists.forEach(medalist => {str += `<br/>${medalist.name}  ${medalist.wins}`});
				return str;
				
			};
			this.init();
			this.render();
		}
		init() {
		}
		render() {
			this._el.innerHTML = this.template([{name: "ivan", wins: 30},{name: "vlad", wins: 20}]);
		};
		subscribe() {
			this._el.onclick = function(event) {
				event.stopPropagation();
				if(event.target.classList.contains("goBackButton")) {
					this.router.back();
				}
				/**/			
			}.bind(this);
		}
	}

	//export
	window.Rating = Rating;
})();
