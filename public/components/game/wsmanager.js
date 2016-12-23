export default class WSManager {
	constructor(url) {
		this.listeners = [];
		this.ready = false;
		this.socket = new WebSocket(url);
		this.socket.onerror = function(err) {
		}
		this.socket.onopen = function() {
			if(this.ready) this.send({action: 'ready'});
		}
		this.socket.onclose = function() {
			
		}
		this.socket.onmessage = msg => {
			let obj = JSON.parse(msg.data);
			this.listeners.forEach(el => {
				if(el.wsFilter != null && el.wsFilter.test(obj.action)) {
					el.onMessage(obj.data, obj.action);
				}
			});
		}
	}
	addBlock(block) {
		this.listeners.push(block);
	}
	start() {
		try {
			this.send({action: 'ready'}) 
		}
		catch(err) {
		};
		this.ready = true;
	}
	send(msg) {
		this.socket.send(msg)
	}
}
