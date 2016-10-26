(function () {
	'use strict';

	const View = window.View;
	const Rating = window.Rating;

	class RatingView extends View {
		constructor(options = {}) {
			super(options);
			this._el = document.querySelector('.js-rating');
			this.hide();
		}
		init() {
			//this.resume();
		}
		resume(options = {}) {

			this._component = new Rating({
				el: this._el,
				data: {
					medalists: []
				}
			});
			this._component.render();
			this._component.subscribe();

			this.show();
		}


	}


	// export
	window.RatingView = RatingView;

})();
