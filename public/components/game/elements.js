class Block {
	constructor(ctx, x, y, width, height, text) {
		this.x = x;
		this.y = y;
		this.ctx = ctx;
		this.text = text;
		this.width = width;
		this.height = height;
		this.isVisiable = true;
		this.isHidden = false;
		this.isSelected = false;	
	}
	select() {
		if (this.isVisiable) {
			this.isSelected = true;
			this.clear();
		}
	}
	unSelect() {
		if (this.isVisiable) {
			this.isSelected = false;
			this.clear();
		}
	}
	onReady() {}
	onClick() {
		if(this.isVisiable) {
			this.select();
			this.onReady();
		}
		return this.isVisiable;
	}
	onMessage(event) {
		alert('here ' + event);
		this.show();
	}
	hide() {
		this.isHidden = true;
		this._hide();
	}
	_hide() {
		this.isVisiable = false;
		this.clear();
		if(this.blocks != null) {
				this.blocks.forEach(el => {
					el._hide()
			});
		}
	}
	clear() {
		this.ctx.clearRect(this.x - 1, this.y - 1, this.width + 2, this.height + 2);
	}
	show() {
		this.isHidden = false;
		this._show();
	}
	_show() {
		if(this.isHidden == false) {
			this.isVisiable = true;
			if(this.blocks != null) {
					this.blocks.forEach(el => {
						el._show()
				});
			}
		}
	}
	draw() {
		if(this.isVisiable) {
			if(this.isSelected) {
				this.ctx.fillStyle = this.isSelected?'#5500FF':'#55FFFF';
				this.ctx.fillRect(this.x,this.y,this.width, this.height);
			}
			else {
				this.ctx.fillStyle = this.isSelected?'#5500FF':'#55FFFF';
				this.ctx.strokeRect(this.x,this.y,this.width, this.height);
			}
			if(this.text != null) {
				this.ctx.fillStyle = "#00F";
    			this.ctx.font = "italic 15pt Arial";
    			this.ctx.fillText(this.text, this.x + 10, this.y + this.height - 10);
			}
			if(this.blocks != null) {
				this.blocks.forEach(el => {
					el.draw();
				});
			}
		}
	}
	update(time) {
		this.move && this.move();
	}
}
class User extends Block{
		constructor(ctx, num, data, parent) {
			super(ctx, 10, 10 + 80 * num, 300, 60, data && data.name); 
			this.num = num;
			this.pos = 0;
		}
		onReady() {
		
		}
}
class AuctionMenue extends Block{
		constructor(ctx, ui, ws) {
			super(ctx, 480, 200, 300, 100)
			alert(`${this.x} ${this.y} ${this.width} ${this.height}`);
			this.ws = ws;
			this.wsFilter = 'auction';
			this.blocks = [];
			this.w = 120;
			this.h = 30;
			this.blocks.push(new Block(ctx, this.x + 10, this.y + this.height - this.h - 10, this.w, this.h, 'Yes'));
			this.blocks.push(new Block(ctx, this.x + this.width - 10 - this.w, this.y + this.height - this.h - 10, this.w, this.h, 'Not'));
			this.blocks.forEach(el=>{
				el.onReady = ()=>{this.hide()}
				ui.addBlock(el);
			});
			this.hide();
			ws.addBlock(this);
		}
}
class TradeMenue extends Block{
	constructor(ctx, ui, ws) {
			super(ctx, 480, 200, 300, 300)
			this.blocks = [];
			this.wsFilter = 'trade';
			this.w = 120;
			this.h = 30;
			this.blocks.push(new Block(ctx, this.x + 10, this.y + this.height - this.h - 10, this.w, this.h));
			this.blocks.push(new Block(ctx, this.x + this.width - 10 - this.w, this.y + this.height - this.h - 10, this.w, this.h));
			this.blocks.forEach(el=>{
				ui.addBlock(el);
			});
			this.hide();
			ws.addBlock(this);
		}
}
class OkMenue extends Block{
	constructor(ctx, ui, ws) {
			super(ctx, 480, 200, 300, 300)
			this.blocks = [];
			this.wsFilter = 'ok';
			this.w = 120;
			this.h = 30;
			this.blocks.push(new Block(ctx, this.x + this.width / 2 - this.w / 2, this.y + this.height - this.h - 10, this.w, this.h));
			this.blocks.forEach(el=>{
				ui.addBlock(el);
			});
			this.hide();
			ws.addBlock(this);
		}
}
class GameSquare extends Block {
		constructor(ctx, ui) {
			super(ctx, 350, 10, 610, 610);
			this.blocks = [];
			this.w = 50;
			this.h = 80;
			let j = 0;
			this.blocks.push(new Block(ctx, this.x, this.y, this.h, this.h, j++));
			for(var i = 0; i < 9; i++) {
					this.blocks.push(new Block(ctx, this.x + this.h + i * this.w, this.y + 0, this.w, this.h, j++));
			}
			this.blocks.push(new Block(ctx, this.x + 9 * this.w + this.h, this.y, this.h, this.h, j++));
			for(var i = 0; i < 9; i++) {
					this.blocks.push(new Block(ctx, this.x + 9 * this.w + this.h,  this.y + this.h + this.w * i, this.h, this.w, j++));
			}
			this.blocks.push(new Block(ctx, this.x + 9 * this.w + this.h, this.y + 9 * this.w + this.h, this.h, this.h, j++));
			for(var i = 8; i >= 0; i--) {
					this.blocks.push(new Block(ctx, this.x + this.h + i * this.w, this.y + 9 * this.w + this.h, this.w, this.h, j++));
			}
			this.blocks.push(new Block(ctx, this.x, this.y + 9 * this.w + this.h, this.h, this.h, j++));
			for(var i = 8; i >= 0; i--) {
					this.blocks.push(new Block(ctx, this.x + 0, this.y + this.h + this.w * i, this.h, this.w, j++));
			}
			this.blocks.forEach(el=>{
				ui.addBlock(el);
			});
		}
		getPlants() {
			return this.blocks;
		}
}
class UsersBox extends Block{
	constructor(ctx, ui, ws) {
		super(ctx, 10, 10, 300, 650);
		this.blocks = [];
		this.ui = ui;
		this.ws = ws;
		this.wsFilter = 'players';
		ws.addBlock(this);
	}
	onMessage(msg) {
		let i = 0;
		this.blocks = msg
		.map(el=> {
			let block = new User(this.ctx, i++, el);
			this.ui.addBlock(block);
			block.show();
			return block;
		})
	}
	getUsers() {
		return this.blocks;
	}
}

export default class Root extends Block{
	constructor(obj, ctx, ui, ws, time) {	
		super(ctx, 0, 0, obj.width, obj.height);
		time.start(this);
		this.ws = ws;
		this.wsFilter = 'dice';
		this.blocks = [];
		this.ctx = ctx;
		this.ub = new UsersBox(ctx, ui, ws);
		this.blocks.push(this.ub);
		this.gs = new GameSquare(ctx, ui);
		this.blocks.push(this.gs);
		this.fg = new Figures(ctx, this.gs.blocks, ws);
		this.blocks.push(this.fg);	
		this.blocks.push(new AuctionMenue(ctx, ui, ws));
		this.blocks.push(new TradeMenue(ctx, ui, ws));
		this.ws.addBlock(this);
	}
	onMessage(val) {
		alert('here where');
		this.fg.steps(val.firstDice + val.secondDice);
	}
}

class Figures extends Block{
	constructor(ctx, blocks, ws) {
		super(ctx, 0,0,0,0);
		this.cur = 0;
		this.wsFilter = 'players'
		this.blocks = [];
		this.bs = blocks;
		this.ws = ws;
		this.ws.addBlock(this);
	}
	steps(val) {
		this.blocks[this.cur].steps += val;
		this.cur = (this.cur + 1) % this.blocks.length;
	}
	onMessage(players) {
		let i = 0;
		this.blocks = players.map(player=>{
			return new Figure(ctx, this.bs, {num: i++, pos: 0})
		})
	}
}
class Figure extends Block {
	constructor(ctx, blocks, player = {num: 0, pos: 0}) {
		super(ctx, blocks[player.pos].x, blocks[player.pos].y + player.num * 25, 20, 20);
		this.show();
		this.player = player;
		this.steps = 0;
		this.pos = this.player.pos;
		this.num = this.player.num;
		this.bs = blocks;
		time.addBlock(this);
	}
	move(dt) {
		if(this.steps > 0) {
		if(this.bs[(this.pos + 1) % 40].x > this.x) {
			this.x += 2;
			if(this.bs[(this.pos + 1) % 40].x <= this.x) {
				this.pos += 1;
				this.pos = this.pos % 40;
				this.x = this.bs[this.pos].x;
				this.y = this.bs[this.pos].y  + this.num * 25;
				this.steps -= 1;
			}
		}
		else if(this.bs[(this.pos + 1) % 40].x < this.x) {
			this.x -= 2;
			if(this.bs[(this.pos + 1) % 40].x >= this.x) {
				this.pos += 1;
				this.pos = this.pos % 40;
				this.x = this.bs[this.pos].x;
				this.y = this.bs[this.pos].y  + this.num * 25;
				this.steps -= 1;
			}
		}
		else if(this.bs[(this.pos + 1) % 40].y > (this.y -  this.num * 25)) {
			this.y += 2;
			if(this.bs[(this.pos + 1) % 40].y <= (this.y  - this.num * 25)) {
				this.pos += 1;
				this.pos = this.pos % 40;
				this.x = this.bs[this.pos].x;
				this.y = this.bs[this.pos].y  + this.num * 25;
				this.steps -= 1;
			}
		}
		else if(this.bs[(this.pos + 1) % 40].y < (this.y -  this.num * 25)) {
			this.y -= 2;
			if(this.bs[(this.pos + 1) % 40].y >= (this.y  - this.num * 25)) {
				this.pos += 1;
				this.pos = this.pos % 40;
				this.x = this.bs[this.pos].x;
				this.y = this.bs[this.pos].y  + this.num * 25;
				this.steps -= 1;
			}
		}
	}
	}
}
