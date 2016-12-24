export default class UIManager {
	constructor(ctx, example) {
		this.clickable = [];
		example.addEventListener('click', event => {
				this.clickable.forEach(el=>{
					el.unSelect();
					if (el.x < event.pageX 
						&& el.y < event.pageY
						&& (el.x + el.width) > event.pageX 
						&& (el.y + el.height) > event.pageY) {
						el.onClick(event.pageX - el.x, event.pageY - el.y);
					}
				})
		})
	}
	addBlock(block) {
		this.clickable.push(block);
	}
}
window.UIManger = UIManager;
