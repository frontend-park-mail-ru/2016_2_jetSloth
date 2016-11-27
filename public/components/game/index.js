var WebSocketServer = new require('ws');

var webSocketServer = new WebSocketServer.Server({port: process.env.PORT || 8081});
webSocketServer.on('connection', function(ws) {
	setTimeout(()=>{
	ws.send(JSON.stringify({
		action: 'auction',
		data: 10
	}))}, 1500);
	setInterval(()=>{
	ws.send(JSON.stringify({
		action: 'dice',
		data: {
			firstDice: 3,
			secondDice: 2
		}
	}))}, 2500);
	
	setTimeout(()=>{
	ws.send(JSON.stringify({
		action: 'players',
		data: [
			{
				name: 'Ivan',
				color: '#222222'
			},
			{
				name: 'Oleg',
				color: '#111111'
			}
		]
	}))}, 1000);
 	ws.on('message', function(userMsg) {
    		ws.send(JSON.stringify({
				action: 2,
				data: 12
			}))
  	});
  ws.on('close', function() {});
});
