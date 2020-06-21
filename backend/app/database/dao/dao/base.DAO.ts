import { ObjectID } from 'mongodb';

export default interface BaseDAO<T> {
    getAll(): Promise<T[]>;
    getOne(id: ObjectID): Promise<T>;
    add(item: T): Promise<ObjectID>;
    update(item: T): Promise<boolean>;
    remove(id: ObjectID): Promise<boolean>;
}
