const COLORS = [
		'#11FF11',
		'#FF1111',
		'#1111FF',
		'#1FF111',
		'#111FF1',
		'#1F1F11',
		'#11F1F1',
		'#F1F1F1'
	];

const COLORS_BACK = [
		'#11AA11',
		'#AA1111',
		'#1111AA',
		'#1AA111',
		'#111AA1',
		'#1A1A11',
		'#11A1A1',
		'#A1A1A1'
	];

class Block {
	constructor(ctx, x, y, width, height, text, color = '#55FFFF') {
		this.color = color;
		this.x = x;
		this.y = y;
		this.ctx = ctx;
		this.text = text;
		this.width = width;
		this.height = height;
		this.isVisiable = true;
		this.isHidden = false;
		this.isSelected = false;
		this.isEnable = true;	
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
		if(this.isVisiable && this.isEnable) {
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
			this.ctx.fillStyle = '#FFFFFF';
			if(this.isSelected) {
				this.ctx.fillStyle = this.color;
				this.ctx.fillRect(this.x,this.y,this.width, this.height);
			}
			else {
				if(this.isEnable){
					this.ctx.fillStyle = '#5500FF';
					this.ctx.strokeRect(this.x,this.y,this.width, this.height);
				}
				else {
					this.ctx.fillStyle = '#111111';
					this.ctx.fillRect(this.x,this.y,this.width, this.height);
				}
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

class Field extends Block{
	constructor(ctx, x, y, width, height, num, owner, fld) {
			super(ctx, x, y, width, height, num); 
			this.fld = fld;
			this.num = num;
			this.isSelected = true;
			this.owner = -1;
	}
	onReady() {
		this.fld.showFld(this.num);
	}
	draw() {
		if(this.isVisiable) {
			if(this.owner >= 0) {
				this.ctx.fillStyle = COLORS_BACK[this.owner];
				this.ctx.fillRect(this.x,this.y,this.width, this.height);
				this.ctx.fillStyle = '#0';
				this.ctx.strokeRect(this.x,this.y,this.width, this.height);
			}
			else {
				this.ctx.fillStyle = '#5500FF';
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
}

class User extends Block{
		constructor(ctx, num, data, parent, cash = 5000) {
			super(ctx, 10, 10 + 80 * num, 300, 60, data); 
			this.cash = cash;
			this.blocks = []; 
			this.num = num;
			this.pos = 0;
			this.moneyField = new Block(ctx, 200, 10 + 80 * num, 110, 60, this.cash);
			this.blocks.push(this.moneyField);
		}
		addCash(sum) {
			this.cash += sum;
			this.moneyField.text = this.cash;
		}
		setCash(cash) {
			console.log("++>" + cash);
			this.cash = cash;
			this.moneyField.text = this.cash;
		}
		onReady() {
		
		}
}
class AuctionMenue extends Block{
		constructor(ctx, ui, ws) {
			super(ctx, 480, 200, 300, 100)
			this.ws = ws;
			this.wsFilter = /auction/;
			this.blocks = [];
			this.w = 120;
			this.h = 30;
			this.textField = new Block(ctx, this.x + 10, this.y + 10 , this.width - 20, 40, 'Купить предприятие');
			this.blocks.push(this.textField);
			this.yes = new Block(ctx, this.x + 10, this.y + this.height - this.h - 10, this.w, this.h, 'Купить');
			this.yes.onReady = ()=> {
				ws.send(JSON.stringify({
					action: "auction.yes",
					data: 0
				}));
				this.hide();
			};
			

			this.blocks.push(this.yes);
			this.not = new Block(ctx, this.x + this.width - 10 - this.w, this.y + this.height - this.h - 10, this.w, this.h, 'Отказаться');
			this.not.onReady = ()=> {
				ws.send(JSON.stringify({
					action: "auction.not",
					data: 0
				}));
				this.hide();
			};
			this.blocks.push(this.not);
			this.blocks.forEach(el=>{
				ui.addBlock(el);
			});
			this.hide();
			ws.addBlock(this);
		}
		onMessage(event) {
			this.yes.isSelceted = false;
			this.textField.text = `Купить ${event.field} за ${event.cost}$`;
			if (event.enable) {
				this.yes.isEnable = true;
			}
			else {
				this.yes.isEnable = false;
			}
			this.show();
		}
}
class FieldMenue extends Block{
		constructor(ctx, ui, ws) {
			super(ctx, 480, 200, 300, 100)
			this.ws = ws;
			this.field = 0;
			this.blocks = [];
			this.w = 120;
			this.h = 30;
			this.textField = new Block(ctx, this.x + 10, this.y + 10 , this.width - 20, 40, 'Field menue');
			this.blocks.push(this.textField);
			this.upgrage = new Block(ctx, this.x + 10, this.y + this.height - this.h - 10, this.w, this.h, 'Улучшить');
			this.upgrage.onReady = ()=> {
				ws.send(JSON.stringify({
					action: "field.upgrade",
					data: this.field
				}));
				this.hide();
			};
			this.blocks.push(this.upgrage);
			this.zalozhit = new Block(ctx, this.x + this.width - 10 - this.w, this.y + this.height - this.h - 10, this.w, this.h, 'Заложить');
			this.zalozhit.onReady = ()=> {
				ws.send(JSON.stringify({
					action: "field.zalozhit",
					data: this.field
				}));
				this.hide();
			};
			this.blocks.push(this.zalozhit);
			this.blocks.forEach(el=>{
				ui.addBlock(el);
			});
			this.hide();
			ws.addBlock(this);
		}
		showFld(val) {
			this.field = val;
			this.textField.text = this.field;
			this.show();
		}
}
class TradeMenue extends Block{
	constructor(ctx, ui) {
			super(ctx, 480, 200, 300, 300)
			this.blocks = [];
			this.wsFilter = /trade/;
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
class PayMenue extends Block{
	constructor(ctx, ui, ws) {
			super(ctx, 480, 200, 300, 100)
			this.ws = ws;
			this.wsFilter = /pay/;
			this.blocks = [];
			this.w = 120;
			this.h = 30;
			this.textField = new Block(ctx, this.x + 10, this.y + 10 , this.width - 20, 40, 'Need Pay');
			this.blocks.push(this.textField);
			this.yes = new Block(ctx, this.x + 10, this.y + this.height - this.h - 10, this.w, this.h, 'Pay');
			this.yes.onReady = ()=> {
				ws.send(JSON.stringify({
					action: "pay",
					data: 0
				}));
				this.hide();
			};
			

			this.blocks.push(this.yes);
			this.not = new Block(ctx, this.x + this.width - 10 - this.w, this.y + this.height - this.h - 10, this.w, this.h, 'Not pay');
			this.not.onReady = ()=> {
				ws.send(JSON.stringify({
					action: "notPay",
					data: 0
				}));
				this.hide();
			};
			this.blocks.push(this.not);
			this.blocks.forEach(el=>{
				ui.addBlock(el);
			});
			this.hide();
			ws.addBlock(this);
		}
		onMessage(event) {
			this.yes.isSelceted = false;
			this.textField.text = `Need pay ${event.cost}`;
			if (event.enable) {
				this.yes.isEnable = true;
			}
			else {
				this.yes.isEnable = false;
			}
			this.show();
		}
}


class MyStepMenue extends Block{
	constructor(ctx, ui, ws) {
			super(ctx, 480, 200, 300, 300)
			this.blocks = [];
			this.wsFilter = /myStep/;
			this.w = 120;
			this.h = 30;
			let el = new Block(ctx, this.x + this.width / 2 - this.w / 2, this.y + this.height - this.h - 10, this.w, this.h, "Roll Dice");
			el.onReady = () => {
				ws.send(JSON.stringify({action: "rollDice", data: null})); 
				this.hide();
			}
			this.blocks.push(new Block(ctx, this.x + 10, this.y + 10, this.width - 20,  this.height - 80, "Roll Dice"));
			this.blocks.push(el);
			this.blocks.forEach(el=>{
				ui.addBlock(el);
			});
			this.hide();
			ws.addBlock(this);
		}
}


class GameSquare extends Block {
		constructor(ctx, ui, fld) {
			super(ctx, 350, 10, 610, 610);
			this.fld = fld
			this.blocks = [];
			this.w = 50;
			this.h = 80;
			let j = 0;
			this.blocks.push(new Field(ctx, this.x, this.y, this.h, this.h, j++, -1,this.fld));
			for(var i = 0; i < 9; i++) {
					this.blocks.push(new Field(ctx, this.x + this.h + i * this.w, this.y + 0, this.w, this.h, j++, -1, this.fld));
			}
			this.blocks.push(new Field(ctx, this.x + 9 * this.w + this.h, this.y, this.h, this.h, j++, -1,this.fld));
			for(var i = 0; i < 9; i++) {
					this.blocks.push(new Field(ctx, this.x + 9 * this.w + this.h,  this.y + this.h + this.w * i, this.h, this.w, j++, -1,this.fld));
			}
			this.blocks.push(new Field(ctx, this.x + 9 * this.w + this.h, this.y + 9 * this.w + this.h, this.h, this.h, j++, -1,this.fld));
			for(var i = 8; i >= 0; i--) {
					this.blocks.push(new Field(ctx, this.x + this.h + i * this.w, this.y + 9 * this.w + this.h, this.w, this.h, j++, -1,this.fld));
			}
			this.blocks.push(new Field(ctx, this.x, this.y + 9 * this.w + this.h, this.h, this.h, j++, -1, this.fld));
			for(var i = 8; i >= 0; i--) {
					this.blocks.push(new Field(ctx, this.x + 0, this.y + this.h + this.w * i, this.h, this.w, j++, -1, this.fld));
			}
			this.blocks.forEach(el=>{
				ui.addBlock(el);
			});
		}
		update(obj) {
			console.log('update(obj)');
			let field = obj.field;
			let owner = obj.owner;
			this.blocks[field].owner = owner;
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
		this.cte = ctx;
		this.wsFilter = /gameState|moneyState|buyField/;
		ws.addBlock(this);
	}
	onMessage(msg, act) {
		if (act == 'gameState') {
			let i = 0;
			this.blocks = msg.names
			.map(el=> {
				let block = new User(this.ctx, i++, el);
				this.ui.addBlock(block);
				block.show();
				return block;
			})
		}
		else if (act == 'moneyState') {
			let i = 0;
			console.log("I AM HERE");
			for( i = 0; i < msg.length; i++) {
				this.blocks[i].setCash(msg[i]); 
			}
		}
		else if (act == 'buyField') {
			console.log('here');
			this.blocks[msg.owner].addCash(-msg.cost);
		}
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
		this.wsFilter = /step|buyField/;
		this.blocks = [];
		this.ctx = ctx;
		this.ub = new UsersBox(ctx, ui, ws);
		this.blocks.push(this.ub);
		this.fld = new FieldMenue(ctx, ui, ws)
		this.blocks.push(this.fld);
		this.gs = new GameSquare(ctx, ui, this.fld);
		this.blocks.push(this.gs);
		this.fg = new Figures(ctx, this.gs.blocks, ws, time);
		this.blocks.push(this.fg);	
		this.blocks.push(new AuctionMenue(ctx, ui, ws));
		//this.blocks.push(new TradeMenue(ctx, ui));
		this.blocks.push(new MyStepMenue(ctx, ui, ws));
		this.blocks.push(new PayMenue(ctx, ui, ws));
		this.ws.addBlock(this);
	}
	onMessage(val, action) {
		if(action == 'step') {
			this.fg.steps(val.step);
		}
		else if (action == 'buyField') {
			this.gs.update(val);
		}
	}
}

class Figures extends Block{
	constructor(ctx, blocks, ws, time) {
		super(ctx, 0,0,0,0);
		this.time = time;
		this.cur = 0;
		this.ws = ws;
		this.ctx = ctx;
		this.wsFilter = /gameState|step/;
		this.blocks = [];
		this.bs = blocks;
		ws.addBlock(this);
	}
	steps(val) {
		this.blocks[this.cur].steps += val;
		this.cur = (this.cur + 1) % this.blocks.length;
	}
	onMessage(data, action) {
		if (action == "gameState") {
			let i = 0;
			this.blocks = data.names.map(player=>{
				return new Figure(this.ctx, this.bs, {num: i++, pos: 0}, this.time)
			})
		}
		else if (action == "step") {

		}
	}
}
class Figure extends Block {
	constructor(ctx, blocks, player = {num: 0, pos: 0}, time) {
		super(ctx, blocks[player.pos].x, blocks[player.pos].y + player.num * 25, 20, 20,"",COLORS[player.num]);
		this.time = time;
		this.isSelected = true;
		this.show();
		this.player = player;
		this.steps = 0;
		this.pos = this.player.pos;
		this.num = this.player.num;
		this.bs = blocks;
		this.time.addBlock(this);
	}
	move(dt) {
		if(this.steps > 0) {
		if(this.bs[(this.pos + 1) % 40].x > this.x) {
			this.x += 5;
			if(this.bs[(this.pos + 1) % 40].x <= this.x) {
				this.pos += 1;
				this.pos = this.pos % 40;
				this.x = this.bs[this.pos].x;
				this.y = this.bs[this.pos].y  + this.num * 25;
				this.steps -= 1;
			}
		}
		else if(this.bs[(this.pos + 1) % 40].x < this.x) {
			this.x -= 5;
			if(this.bs[(this.pos + 1) % 40].x >= this.x) {
				this.pos += 1;
				this.pos = this.pos % 40;
				this.x = this.bs[this.pos].x;
				this.y = this.bs[this.pos].y  + this.num * 25;
				this.steps -= 1;
			}
		}
		else if(this.bs[(this.pos + 1) % 40].y > (this.y -  this.num * 25)) {
			this.y += 5;
			if(this.bs[(this.pos + 1) % 40].y <= (this.y  - this.num * 25)) {
				this.pos += 1;
				this.pos = this.pos % 40;
				this.x = this.bs[this.pos].x;
				this.y = this.bs[this.pos].y  + this.num * 25;
				this.steps -= 1;
			}
		}
		else if(this.bs[(this.pos + 1) % 40].y < (this.y -  this.num * 25)) {
			this.y -= 5;
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
