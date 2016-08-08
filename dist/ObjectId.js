"use strict";
const mongodb_1 = require('mongodb');
class ObjectId {
    constructor(id) {
        if (id instanceof String) {
            this.value = id;
        }
        else if (id instanceof mongodb_1.ObjectID) {
            this.value = id.toHexString();
        }
        else if (id instanceof ObjectId) {
            this.value = id.value;
        }
    }
    toString() {
        return this.value;
    }
    toObjectID() {
        return new mongodb_1.ObjectID(this.value);
    }
    equals(value) {
        if (value instanceof String) {
            return this.value === value;
        }
        else if (value instanceof ObjectId) {
            return this.value === value.value;
        }
        else if (value instanceof mongodb_1.ObjectID) {
            return this.value === value.toHexString();
        }
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ObjectId;
