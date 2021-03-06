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
				data.forEach(medalist => {str += `<br/>${medalist.name}  ${medalist.wins}`});
				return str;
				
			};
			this.init();
			this.render();
		}
		init() {
			this.model = new RatingModel();
			this.model.fetch().then(function(data) {this.set(data)}.bind(this), function() {console.log("wrong password or username")});
		}
		set(data) {
			this.data.medalists = data;
			return this.render();
		}
		render() {
			this._el.innerHTML = this.template(this.data.medalists);
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
