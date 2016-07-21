import {
    ObjectID
} from 'mongodb';

export default class ObjectId {
    private value: string;
    constructor(id?: string | ObjectID | ObjectId) {
        if (id instanceof String) {
            this.value = id;
        } else if (id instanceof ObjectID) {
            this.value = id.toHexString();
        } else if (id instanceof ObjectId) {
            this.value = id.value;
        }
    }
    public toString(): string {
        return this.value;
    }
    public toObjectID(): ObjectID {
        return new ObjectID(this.value);
    }
    public equals(value: ObjectID | string | ObjectId): boolean {
        if (value instanceof String) {
            return this.value === value;
        } else if (value instanceof ObjectId) {
            return this.value === value.value;
        } else if (value instanceof ObjectID) {
            return this.value === value.toHexString();
        }
    }
}
