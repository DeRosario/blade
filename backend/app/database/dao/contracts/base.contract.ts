export default abstract class BaseContract {

	constructor(private collection: string, private validatorSchema: {}, private keys: string[]) {
	}

	getCollection() {
		return this.collection;
	}

	getValidatorSchema() {
		return this.validatorSchema;
	}

	getKeys() {
		return this.keys;
	}

}
