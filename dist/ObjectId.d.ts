import { ObjectID } from 'mongodb';
export default class ObjectId {
    private value;
    constructor(id?: string | ObjectID | ObjectId);
    toString(): string;
    toObjectID(): ObjectID;
    equals(value: ObjectID | string | ObjectId): boolean;
}
