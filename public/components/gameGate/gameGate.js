import Block from '../block/block'
export default class GameGate extends Block{
	constructor(options) {
		super('options', options);
		this._el = options;
		this.active = true;
		this.fn();
		wsm.myOn(/openGames/, data => {
			this._el.innerHTML = '';
			this.mainForm = document.createElement('form');
			data.forEach(el => {
				let domObj = document.createElement('button');
				domObj.setAttribute("class", "btn btn_submit");
				domObj.setAttribute("name", `in${el[0]}`);
				domObj.innerHTML = 'Вступить';
				this.mainForm.appendChild(domObj);
			})
			this.newGameButton =  document.createElement('button');
			this.newGameButton.setAttribute("class", "btn btn_submit");
			this.newGameButton.setAttribute("name", `newGame`);
			this.newGameButton.innerHTML = 'Создать игру';
			this.mainForm.appendChild(this.newGameButton);
			this._el.appendChild(this.mainForm);
			this.mainForm.addEventListener("click", event=>{
				event.preventDefault();
				if(event.target.name == 'newGame') {
					wsm.send(JSON.stringify({
						action: 'createGame',
						data: 2
					}))
				}
				else {
					console.log(event.target.name);
					wsm.send(JSON.stringify({
						action: 'joinGame',
						data: 0
					}))
				}
			});
		})
	}
	fn() {
			if(this.active) {
				window.wsm.send(JSON.stringify({
					action: 'openGamesStatus', 
					data: null }))
				setTimeout(this.fn.bind(this), 1000)
			}
	}
}
