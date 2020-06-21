import Controller from './controller';
import express from 'express';
import path from 'path';

export default class IndexController extends Controller {
	constructor() {
		super('');
		this.router.get(this.path, this.getIndex);
	}

	getIndex(request: express.Request, response: express.Response) {
		response.sendFile(path.join(__dirname, '../public/index.html'), (err) => {
			if (err) {
				console.log(err);
			}
		});
	}
}
