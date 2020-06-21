import express, { Router } from 'express';

export default abstract class Controller {
    path: string;
    router: Router = express.Router();
    constructor(path: string) {
        this.path = path;
    }
}
