'use strict';
import Model from '../modules/model'

export default class User extends Model {
		
	constructor(attributes) {
		super(attributes);
		this.tail = attributes.formType;
	}
	get defaults() {
		return {
			username: '',
			password: '',
			formType: ''
		}
	}
	get url() {
		return `/user/${this.tail}/`;
	}
	sendUser() {
		return this.send('POST', this.attributes, this.url);
	}
};
