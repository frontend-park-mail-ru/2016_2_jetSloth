import TimeManager from '../game/timemanager'
import UIManager from '../game/uimanager'
import Root from '../game/elements'


export default class Game{
	constructor(canvas) {
		this._el = canvas;
		this.ctx = canvas.getContext('2d');
		this.ctx.strokeRect(0,0, this._el.width, this._el.height);
		this.ws = window.wsm;
		this.ui = new UIManager(this.ctx, this._el);
		this.time = new TimeManager(this.ctx);
		this.root = new Root(this._el, this.ctx, this.ui, this.ws, this.time);
		this.ws.start();
	}
}
