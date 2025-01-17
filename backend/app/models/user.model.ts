import {
	ObjectID
} from 'mongodb';
import Model from './model';

export default class UserModel extends Model {

	constructor(private lastName: string, private firstName: string, private email: string, private password: string, id ?: ObjectID) {
		super(id);
	}

	getLastName(): string {
		return this.lastName;
	}

	setLastName(lastName: string): void {
		this.lastName = lastName;
	}

	getFirstName(): string {
		return this.firstName;
	}

	setFirstName(firstName: string): void {
		this.firstName = firstName;
	}

	getEmail(): string {
		return this.email;
	}

	setEmail(email: string): void {
		this.email = email;
	}

	getPassword(): string {
		return this.password;
	}

	setPassword(password: string): void {
		this.password = password;
	}

	toJson(): object {
		throw new Error('Method not implemented.');
	}
}
