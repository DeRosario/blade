import mongodb, {
	MongoClient,
	Db
} from 'mongodb';
import BaseContract from '../contracts/base.contract';
import UsersContract from '../contracts/users.contract';
import KeyboardsContract from '../contracts/keyboards.contract';
import MousesContract from '../contracts/mouses.contract';
import ScreensContract from '../contracts/screens.contract';

export default abstract class ConnectionMongoDBManager {
	private static db: Db;
	private static contracts: BaseContract[] = [
		new UsersContract(),
		new KeyboardsContract(),
		new MousesContract(),
		new ScreensContract()
	];

	private static DB_HOST = 'dev-blade-db-container';
	private static DB_PORT = '27017';
	private static DB_NAME = 'blade';

	static async getDb(): Promise < Db > {
		if (this.db === undefined) {
			try {
				this.db = await this.connectionToMongo();
				const collections: any[] = await this.getAllCollections();
				await this.initCollections(collections);
			} catch (e) {
				throw e;
			}
		}
		return this.db;
	}

	private static async connectionToMongo(): Promise < Db > {
		const mongoOptions = {
			reconnectTries: 60,
			reconnectInterval: 1000,
			autoReconnect: true,
			useNewUrlParser: true
		};

		const mongoURI = `mongodb://${this.DB_HOST}:${this.DB_PORT}/${this.DB_NAME}`;
		try {
			const mongo = await MongoClient.connect(mongoURI, mongoOptions);
			return mongo.db(this.DB_NAME);
		} catch (e) {
			throw new Error('[ConnectionMongoDBManager] - Echec de connexion à la base de données.');
		}
	}

	private static async getAllCollections() {
		return this.db.listCollections().toArray();
	}

	private static async initCollections(collections: any[]) {
		for (let i = 0; i < this.contracts.length; i++) {
			if (!this.isCollectionExist(this.contracts[i].getCollection(), collections)) {
				try {
					await this.createCollection(this.contracts[i]);
				} catch (e) {
					throw e;
				}
			}
		}
	}

	private static isCollectionExist(collection: string, collectionsInDb: any[]) {
		for (let i = 0; i < collectionsInDb.length; i++) {
			if (collectionsInDb[i].name !== undefined && collection === collectionsInDb[i].name) {
				return true;
			}
		}
		return false;
	}

	private static async createCollection(contract: BaseContract) {
		await this.db.createCollection(contract.getCollection(), contract.getValidatorSchema());
	}

}
