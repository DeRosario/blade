import BaseDAO from '../dao/base.DAO';
import { ObjectId, Db } from 'mongodb';
import BaseContract from '../contracts/base.contract';
import ConnectionMongoDBManager from './connection';
import Model from '../../../models/model';
export default abstract class BaseDAOImpl < T extends Model > implements BaseDAO < T > {

	constructor(private contract: BaseContract) {
	}

	getContract(): BaseContract {
		return this.contract;
	}

	async getAll(): Promise<T[]> {
		const dbConnection: Db = await ConnectionMongoDBManager.getDb();
		const datas: any[] = await dbConnection.collection(this.contract.getCollection()).find().toArray();
		const result: T[] = [];
		for (let i = 0; i < datas.length; i++) {
			result.push(this.parseOut(datas[i]));
		}
		return result;
	}

	async getOne(id: ObjectId): Promise<T> {
		const dbConnection: Db = await ConnectionMongoDBManager.getDb();
		const data = await dbConnection.collection(this.contract.getCollection()).findOne({_id: id});
		const result: T = this.parseOut(data);
		return result;
	}

	async add(item: T): Promise<ObjectId> {
		const dbConnection: Db = await ConnectionMongoDBManager.getDb();
		const request = this.parseIn(item);
		const data = await dbConnection.collection(this.contract.getCollection()).insertOne(request);
		const result: ObjectId = data.insertedId;
		return result;
	}

	async update(item: T): Promise<boolean> {
		const dbConnection: Db = await ConnectionMongoDBManager.getDb();
		const request = this.parseIn(item);
		const data: any = await dbConnection.collection(this.contract.getCollection()).updateOne({_id: item.getId()}, request);
		let result: boolean;
		if (data.modifiedCount === 1.0) {
			result = true;
		} else {
			result = false;
		}
		return result;
	}

	async remove(id: ObjectId): Promise<boolean> {
		const dbConnection: Db = await ConnectionMongoDBManager.getDb();
		const data: any = await dbConnection.collection(this.contract.getCollection()).deleteOne({_id: id});
		let result: boolean;
		if (data.deletedCount === 1.0) {
			result = true;
		} else {
			result = false;
		}
		return result;
	}

	abstract parseIn(object: T): any;
	abstract parseOut(datas: any): T;
}
