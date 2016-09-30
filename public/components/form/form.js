(function () {
    'use strict';

    // import
    let Button = window.Button;

    class Form {

        /**
         * Конструктор класса Form
         */
        constructor (options = { data: {} }) {
            this.data = options.data;
            this.el = options.el;
	    this.validator = options.validator;
	    this.form = document.createElement('form');

	    this.title = document.createElement('div');
	    	this.title.innerHTML = this.data.title;
	    this.form.appendChild(this.title);

	    this.inputsList = document.createElement('div');
            	let { fields = [] } = this.data;
            	fields.forEach(field => {this.inputsList.appendChild(field)});
	    this.form.appendChild(this.inputsList);

	    this.controlsList = document.createElement('div');
	    this.controlsList.className = "js-controls";
	    	let { controls = [] } = this.data;
            	controls.forEach(data => {
                	let control = new Button({text: data.text}).render();
                	this.controlsList.appendChild(control.el);
            	});
	    this.form.appendChild(this.controlsList);
        }

        /**
         * Подписка на событие
         * @param {string} type - имя события
         * @param {function} callback - коллбек
         */
        on (type, callback) {
            this.form.addEventListener(type, callback);
        }

        /**
         * Взять данные формы
         * @return {object}
         */
        getFormData () {
            let elements = this.form.elements;
            let fields = {};
            Object.keys(elements).forEach(element => {
                let name = elements[element].name;
                let value = elements[element].value;

                if (!name) {
                    return;
                }

                fields[name] = value;
            });

            return fields;
        }
	

    }

    //export
    window.Form = Form;
})();
