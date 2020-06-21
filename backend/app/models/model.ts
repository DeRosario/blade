import { ObjectId } from 'mongodb';

export default abstract class Model {

  constructor(private _id?: ObjectId) {
  }

  getId(): ObjectId | undefined {
    return this._id;
  }

  setId(_id: ObjectId): void {
    this._id = _id;
  }

  abstract toJson(): object;
}
