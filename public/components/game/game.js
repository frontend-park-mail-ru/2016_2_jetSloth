import TimeManager from '../game/timemanager'
import UIManager from '../game/uimanager'
import WSManager from '../game/wsmanager'
import Root from '../game/elements'


export default class Game{
	constructor(canvas, root = 'ws://127.0.0.1') {
		this._el = canvas;
		this.ctx = canvas.getContext('2d');
		this.ctx.strokeRect(0,0, this._el.width, this._el.height);
		this.ws = new WSManager(root);
		this.ui = new UIManager(this.ctx, this._el);
		this.time = new TimeManager(this.ctx);
		this.root = new Root(this._el, this.ctx, this.ui, this.ws, this.time);
		this.ws.start();
	}
}
