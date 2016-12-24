'use strict';

const parser = require('body-parser');
const technoDoc = require('techno-gendoc');
const path = require('path');
var server = require('http').createServer()
  , url = require('url')
  , WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({ server: server })
  , express = require('express')
  , app = express()
  , port = process.env.PORT || 4000;
 
['/', '/signin', '/signup', '/app'].forEach((paths) => { app.use(paths, express.static('public', {maxAge: 1})); });
 
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
	msgFail() {
		player.con.send(JSON.stringify({
			action: "fail",
			data: {
				player: this.curPlayer,
			}
		}))
	}
	msgWin() {
		player.con.send(JSON.stringify({
			action: "fail",
			data: {
				player: this.curPlayer,
			}
		}))
	}
	msgStart() {
	    this.players.forEach(player => {
            player.con.send(JSON.stringify({
                action: "start",
                data: null
            }))
        })
    }
	msgRollDice() {
		console.log("msgRollDice()");
		this.players.forEach(player => {
			player.con.send(JSON.stringify({
				action: "rollDice",
				data: {
					firstDice: this.firstDice,
					secondDice: this.secondDice,
					player: this.curPlayer
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
		this.players[this.curPlayer].addMoney(-val);
		this.players[this.fields[this.players[this.curPlayer].pos].owner].addMoney(val);
		this.msgMoneyState();
		this.nextPlayer();
	}
	msgMoneyState(){
		console.log("moneyState");
		let cashs = [];
		this.players.forEach(player => {
			cashs.push(player.money);
		});
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


let games = {};
let players = {};
let openGames = {};
class DB {
    constructor() {
        this.users = []
    }
    rating() {
    	return users.map(user => {return user.stars});
	}
}

let db = new DB();

class OpenGame {
    constructor(count, authorConnection, playerID, playerName) {
        this.players = [];
        this.players.push(new Player(authorConnection, playerID, playerName));
        this.count = count;
    }

    addPlayer(playerConnection, playerID, playerName) {
        this.players.push(new Player(playerConnection, playerID, playerName));
    }

    isReady() {
        return this.players.length == this.count
    }

    toGame() {
        if (this.isReady()) {
            return new Game(this.players);
        }
        console.log("OpenGame can not make Game");
    }
    deletePlayer(id) {
		var i;
    	for(i = 0; i < this.players.length; i++) {
    		if(this.players[i].id == id) {
    			this.players.splice(i, 1);
				return;
			}
		}
	}
}

let lastId = 0;
let lastCurGameId = 0;
let lastGameId = 0;
wss.on('connection', function(ws) {
	let openGame;
	let myNum;
	let curGame = {};
	let curGameId;
	let gameId;
	let id = lastId++;
 	ws.on('message', function(userMsg) {
		try {
			userMsg = JSON.parse(userMsg);
		}
		catch(err) {
			userMsg = {action: "err", data: "err"}
		}
		if (userMsg.action == "createGame") {
			myNum = 0;
			curGame = new OpenGame(userMsg.data, ws, id, 'Anon');
			curGameId = lastCurGameId++;
			gameId = lastGameId++;
			openGames[curGameId] = curGame;
		}
		else if (userMsg.action == "joinGame") {
			myNum = 1;
			curGameId = userMsg.data;
			gameId = userMsg.data;
			openGames[userMsg.data].addPlayer(ws, id, "MyName");
			Object.keys(openGames).forEach((num,ind) => {
				openGames[num].deletePlayer(id);
			})
            if (openGames[userMsg.data].isReady()) {
                curGame = openGames[userMsg.data];
                curGame = curGame.toGame();
				console.log(curGame);
                games[gameId] = curGame;
				delete openGames[userMsg.data];
                curGame.msgStart();
				curGame.start();
            }
		}
		else if (userMsg.action == "rating") {
			ws.send(JSON.stringify({
				action: "rating",
				data: db.rating()
			}));
		}
		else if (userMsg.action == "openGamesStatus") {
			ws.send(
				JSON.stringify({
					action: "openGames",
					data: Object.keys(openGames).map(
						(p1,p2) => {
							return [p1]
						}
					)
				})
			);
		}
		else if (userMsg.action == "rollDice") {
			games[gameId].rollDice();
		}
		else if (userMsg.action == "auction.yes") {
			games[gameId].buyField(myNum);
		}
		else if (userMsg.action == "auction.not") {
			games[gameId].notBuyField(myNum);
		}
		else if (userMsg.action == "pay") {
			games[gameId].pay();
		}
		else if (userMsg.action == "province.zalozhit") {
			console.log("zalozhit");
		}
		else if (userMsg.action == "province.update") {
		}
		else if (userMsg.action == "prison.out") {
		}
  	});
  ws.on('close', function() {});
});
 
server.on('request', app);
server.listen(port, function () { console.log('Listening on ' + server.address().port) });


