(function () {
    'use strict';

    // import
    const Block = window.Block;
    const Button = window.Button;
    const Input = window.Input;

    class Form extends Block {

        /**
         * Конструктор класса Form
         */
        constructor(options = {data: {}}) {
            super('form');
            // this.template = window.fest['form/form.tmpl'];
            this.data = options.data;
            this._el = options.el;
            this.render();
        }

        /**
         * Обновляем HTML
         */
        render() {
            // this._updateHtml();
            this._installItems();
        }

        /**
         * Обнуляем форму
         */
        reset() {
            this._el.querySelector('form').reset();
        }

        /**
         * Обновить html компонента
         */
        _updateHtml() {
            // this._el.innerHTML = this.template(this.data);
        }

        /**
         * Вставить управляющие элементы в форму
         */
        _installItems() {
            let {fields = []} = this.data;

            fields.forEach(data => {
                let input = new Input({
                    attrs: {
                        type: data.type,
                        name: data.name,
                        placeholder: data.placeholder
                    }
                });
                this._el.appendChild(input._get());
            });


            let {controls = []} = this.data;

            controls.forEach(data => {
                let control = new Button({
                    text: data.text,
                    attrs: data.attrs
                    });
                this._el.appendChild(control._get());
            });
        }
    }

    window.Form = Form;
})();