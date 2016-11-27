export default class UIManager {
	constructor(ctx, example) {
		this.clickable = [];
		example.addEventListener('click', event => {
				this.clickable.forEach(el=>{
					el.unSelect();
					if (el.x < event.clientX 
						&& el.y < event.clientY
						&& (el.x + el.width) > event.clientX 
						&& (el.y + el.height) > event.clientY) {
						el.onClick(event.clientX - el.x, event.clientY - el.y);
					}
				})
		})
	}
	addBlock(block) {
		this.clickable.push(block);
	}
}
window.UIManger = UIManager;
