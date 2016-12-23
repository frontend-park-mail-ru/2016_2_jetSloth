var WebSocketServer = new require('ws');

var webSocketServer = new WebSocketServer.Server({port: process.env.PORT || 8081});

class Player {
	constructor(con) {
		this.money = 5000;
		this.event = 0;
		this.pos = 0;
		this.con = con;
		this.name = "Anonimus";
		this.isActive = true;
	}
	move(stepLen) {
		this.pos = (this.pos + stepLen) % 40;
	}
	msgYourStep() {
		this.con.send(JSON.stringify({
			action: "myStep",
			data: 0
		}))
	}
	msgStep(player, step) {
		this.con.send(JSON.stringify({
			action: "step",
			data: {
				player: player,
				step: step
			}
		}))
	}
	addMoney(money) {
		this.money += money;
	}
}

class Field {
	constructor(cost, monopoly = -1, owner = -1) {
		this.cost = cost;
		this.zalog = cost;
		this.upgrades = cost;
		this.a = [10, 20, 40, 80, 160, 320];
		this.monopoly = monopoly;
		this.owner = owner || -1;
		this.upgrades = 0;
		this.spesial = 0;
	}
	payCost() {
		return this.a[this.upgrades];
	}
	upgrade() {
		this.upgrades += 1;
	}
	setOwner(owner) {
		this.owner = owner;
	}
	zalogMoney() {
		return this.zalog;
	}
	zalozhitMoney() {
		let val = this.zalog;
		let i;
		for (i = 0; i < this.upgrades; i++) {
			val += a[i]
		}
	}
}

class Game {
	constructor(players) {
		this.players = players;
		this.curPlayer = 0;
		this.playersCount = this.players.length;
		this.isActive = true;
		this.acurPlayer = -1;
		this.afiled = -1;
		this.abecomer = 0;
		this.fields = [
			new Field(1000),
			new Field(1000),
			new Field(1000),
			new Field(1000),
			new Field(1000),
			new Field(1000),
			new Field(1000),
			new Field(1000),
			new Field(1000),
			new Field(1000),
			new Field(1000),
			new Field(1000),
			new Field(1000),
			new Field(1000),
			new Field(1000),
			new Field(1000),
			new Field(1000),
			new Field(1000),
			new Field(1000),
			new Field(1000),
			new Field(1000),
			new Field(1000),
			new Field(1000),
			new Field(1000),
			new Field(1000),
			new Field(1000),
			new Field(1000),
			new Field(1000),
			new Field(1000),
			new Field(1000),
			new Field(1000),
			new Field(1000),
			new Field(1000),
			new Field(1000),
			new Field(1000),
			new Field(1000),
			new Field(1000),
			new Field(1000),
			new Field(1000),
			new Field(1000)
		]
	}
	start() {
		console.log("start()");
		this.msgState();
		setTimeout(()=>{this.msgYourStep();}, 1000);
	}

	msgState() {
		console.log("msgState()");
		let names = [];
		let poses = [];
		let cashs = [];
		this.players.forEach(player => {names.push(player.name), poses.push(player.pos), cashs.push(player.money)})
		this.players.forEach(player => {
			player.con.send(JSON.stringify({
				action: "gameState",
				data: {
					cashs: cashs, 
					names: names,
					poses: poses,
					fields: this.fields,
					curPlayer: this.curPlayer
				}
			}))
		});
	}
	msgRollDice() {
		console.log("msgRollDice()");
		this.players.forEach(player => {
			player.con.send(JSON.stringify({
				action: "rollDice",
				data: {
					firstDice: this.firstDice,
					secondDice: this.secondDice,
					player: this.currPlayer
				}
			}))
		});
	}

	msgMove() {
		console.log("msgMove()")
		this.players.forEach(player => {player.msgStep(this.curPlayer, this.stepLen)});
	}

	msgYourStep() {
		console.log("msgYourStep()");
		this.players[this.curPlayer].msgYourStep();
	}
	msgBuyField() {
		console.log("msgBuyField()");
		let out = JSON.stringify({
			action: "buyField",
			data: {
				owner: this.curPlayer,
				field: this.players[this.curPlayer].pos,
				cost: this.cost
			}
		});
		this.players.forEach(player => {player.con.send(out)});		
	}

	msgPay() {
		console.log("pay()");
		let enable = this.players[this.curPlayer].money >= this.fields[this.players[this.curPlayer].pos].payCost();
		let fail = !enable;
		let enableMoney = this.players[this.curPlayer].money;
		if (fail) {
			this.fields.forEach(field => {
				if (field.owner == this.curPlayer) {
					enableMoney += field.zalozhitMoney();
				}
			})
		}
		fail = enableMoney < this.fields[this.players[this.curPlayer].pos].payCost();
		let out = JSON.stringify({
			action: "pay",
			data: {
				cost: this.fields[this.players[this.curPlayer].pos].payCost(),
				field: this.players[this.curPlayer].pos,
				enable: enable,
				fail: fail 
			}
		});
		this.players[this.curPlayer].con.send(out);		
	}

	msgAuction() {
		console.log("msgAuction()");
		this.players[this.acurPlayer].con.send(JSON.stringify({
				action: "auction",
				data: {
					cost: this.fields[this.afield].cost,
					field: this.afield,
					enable: this.players[this.acurPlayer].money >= this.fields[this.players[this.curPlayer].pos].cost
				}
			}));
	}

	rollDice() {
		console.log("rollDice()")
		this.firstDice = Math.floor(Math.random() * 5) + 1;
		this.secondDice = Math.floor(Math.random() * 5) + 1;
		this.stepLen = this.firstDice + this.secondDice;
		this.move();
		
	}
	move() {
		console.log("move()")
		this.stepLen = this.firstDice + this.secondDice;
		console.log(this.stepLen);
		this.players[this.curPlayer].move(this.stepLen);
		this.msgMove();
		this.event();
	}
	
	event() {
		console.log("event()");
		let owner = this.fields[this.players[this.curPlayer].pos].owner
		if (owner == -1) {
			this.auction();
		}
		else if (owner >= 0 && owner != this.curPlayer){
			this.msgPay();
		}
		else {
			this.nextPlayer();
		}
	}
	pay() {
		console.log("pay()");
		let val = this.fields[this.players[this.curPlayer].pos].payCost();
		console.log("==>" + val)
		this.players[this.curPlayer].addMoney(-val);
		this.players[this.fields[this.players[this.curPlayer].pos].owner].addMoney(val);
		this.msgMoneyState();
		this.nextPlayer();
	}
	msgMoneyState(){
		console.log("moneyState")
		let cashs = [];
		this.players.forEach(player => {
			cashs.push(player.money);
		})
		this.players.forEach(player => {
			player.con.send(JSON.stringify({
				action: "moneyState",
				data: cashs
			}))
		})
	}
	auction() {
		console.log("auction()");
		if (this.acurPlayer == -1) {
			this.abecomer = this.curPlayer;
			this.acurPlayer = this.curPlayer;
		}
		else {
			this.acurPlayer = (this.acurPlayer + 1) % this.playersCount;
			while ((!this.players[this.acurPlayer].isActive) && (this.acurPlayer != this.abecomer)) {
				this.acurPlayer = Math.floor((this.acurPlayer + 1) % this.playersCount);
			}
			console.log(this.acurPlayer);
			console.log(this.abecomer);
			if (this.acurPlayer == this.abecomer) {
				this.acurPlayer = -1;
				this.nextPlayer();
				return;
			}
		}
		this.afield = this.players[this.curPlayer].pos;
		this.msgAuction();
	}
	
	buyField(userNum) {
		console.log("buyField(userNum)");
		if (this.players[userNum].money >= this.fields[this.players[this.curPlayer].pos].cost) {
			this.players[userNum].money -= this.fields[this.players[this.curPlayer].pos].cost;
			this.fields[this.players[this.curPlayer].pos].owner = userNum;
			this.cost = this.fields[this.players[this.curPlayer].pos].cost;
			this.msgBuyField();
			this.nextPlayer();
			this.acurPlayer = -1;
		}
	}
	notBuyField(userNum) {
		console.log("notBuyField(userNum)");
		this.auction();
	}

	nextPlayer() {
		console.log("nextPlayer()");
		this.curPlayer = Math.floor((this.curPlayer + 1) % this.playersCount);
		while (!this.players[this.curPlayer].isActive) {
			this.curPlayer = Math.floor((this.curPlayer + 1) % this.playersCount);
		}
		this.msgYourStep();
	}
	
}


let games = [];
let players = [];
webSocketServer.on('connection', function(ws) {
	let myNum = players.length;
	players.push(new Player(ws));
	if (players.length == 2) {
		games.push(new Game(players));
		games[0].start();
	}
 	ws.on('message', function(userMsg) {
		userMsg = JSON.parse(userMsg);
		if (userMsg.action == "rollDice") {
			games[0].rollDice();
		}
		else if (userMsg.action == "auction.yes") {
			games[0].buyField(myNum);
		}
		else if (userMsg.action == "auction.not") {
			games[0].notBuyField(myNum);
		}
		else if (userMsg.action == "pay") {
			games[0].pay();
		}
		else if (userMsg.action == "province.zalozhit") {
		}
		else if (userMsg.action == "province.update") {
		}
		else if (userMsg.action == "prison.out") {
		}
  	});
  ws.on('close', function() {});
});
