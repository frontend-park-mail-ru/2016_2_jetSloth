(function () {
    'use strict';

    const Block = window.Block;
    const Button = window.Button;
    const Input = window.Input;

    class Form extends Block {
        constructor(options = {data: {}}) {
            super('form');
            this.template = window.fest['form/form.tmpl'];
            this.data = options.data;
            this._el = options.el;
            this.render();
        }

        render() {
            this._updateHtml();
            this._installItems();
        }

        reset() {
            this._el.querySelector('form').reset();
        }

        _updateHtml() {
            this._el.innerHTML = this.template(this.data);
        }


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
                this._el.querySelector('.js-inputs').appendChild(input._get());

            });


            let {controls = []} = this.data;

            controls.forEach(data => {
                let control = new Button({
                    text: data.text,
                    attrs: data.attrs
                    });
                this._el.querySelector('.js-controls').appendChild(control._get());
            });
        }
    }

    window.Form = Form;
})();