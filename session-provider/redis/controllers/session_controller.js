
import { Controller, DefaultWorker, Worker, textResult, Route, jsonResult } from "fortjs";

export class SessionController extends Controller {

    @Worker()
    async add() {
        const key = this.body.key;
        const value = this.body.value;
        await this.session.set(key, value);
        return textResult("saved");
    }

    @Worker()
    @Route("/add-many")
    async addMany() {
        const key1 = this.body.key1;
        const value1 = this.body.value1;
        const key2 = this.body.key2;
        const value2 = this.body.value2;
        await this.session.setMany({
            [key1]: value1,
            [key2]: value2
        })
        return textResult("saved");
    }

    @Worker()
    async exist() {
        const key = this.query.key;
        if (await this.session.isExist(key)) {
            return textResult('key is found');
        }
        else {
            return textResult("key is not found");
        }

    }

    @Worker()
    async get() {
        const key = this.query.key;
        const valueFromSession = await this.session.get(key);
        return jsonResult({
            value: valueFromSession
        });
    }

    @Worker()
    async update() {
        const key = this.body.key;
        const value = this.body.value;
        await this.session.set(key, value);
        return textResult("updated");
    }

    @Worker()
    async remove() {
        const key = this.query.key;
        await this.session.remove(key);
        return textResult("removed");
    }

    @Worker()
    async clear() {
        await this.session.clear();
        return textResult("cleared");
    }

    @Worker()
    async getAll() {
        const valueFromSession = await this.session.getAll();
        return jsonResult({
            value: valueFromSession
        });
    }
}