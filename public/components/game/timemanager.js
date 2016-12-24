export default class TimeManager {
	constructor(cfx) {
		this.listeners = [];
		this.isStopped = true;
	}
	start(root) {
		this.root = root;
		this.isStopped = false;
		this.startLoop();
	}
	startLoop() {
		let time;
		let	isStopped = this.isStopped;
		let exec = this.exec.bind(this);
		function step() {
			let now = Date.now();
			let	dt = now - (time || now);
			time = now;
			if (!isStopped) {
				requestAnimationFrame(step);
			}
			exec(dt);
		}
		step();
	}
	exec(dt) {
			let keys = this.keys;
			this.root.clear();
			this.listeners.forEach(listener => {
				listener.update(dt);
			});
			this.root.update(dt);
			this.root.draw();
	}
	addBlock(block) {
		this.listeners.push(block);
	}
}
