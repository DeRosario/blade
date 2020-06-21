import {
	ObjectID
} from 'mongodb';
import Model from './model';

export default class UserModel extends Model {

	constructor(private lastName: string, private firstName: string, private email: string, private password: string, private admin: boolean, private activated: boolean, id ?: ObjectID) {
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

	getAdmin(): boolean {
		return this.admin;
	}

	setAdmin(admin: boolean): void {
		this.admin = admin;
	}

	getActivated(): boolean {
		return this.activated;
	}

	setActivated(activated: boolean): void {
		this.activated = activated;
	}

	toJson(): object {
		throw new Error('Method not implemented.');
	}
}
