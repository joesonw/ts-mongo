"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const ReflectType_1 = require('./ReflectType');
require('reflect-metadata');
const Database_1 = require('./Database');
const _ = require('lodash');
const ObjectId_1 = require('./ObjectId');
class Model {
    toJSON() {
        let ret = {};
        for (const key in this.__schema__) {
            const value = this[key];
            if (value !== undefined) {
                const type = value.constructor;
                switch (type) {
                    case String:
                    case Number:
                    case Boolean:
                    case Date:
                        ret[key] = value;
                        break;
                    default:
                        if (value.toJSON) {
                            ret[key] = value.toJSON();
                        }
                        else if (value.toString) {
                            ret[key] = value.toString();
                        }
                        else {
                            ret[key] = value;
                        }
                }
            }
        }
        return ret;
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield Database_1.default.connect();
            const data = _.omit(this.toJSON(), '_id');
            const collection = db.collection(this.__collection__);
            if (this['_id'] !== undefined) {
                yield collection.findOneAndReplace({
                    _id: this['_id'].toObjectID()
                }, data);
            }
            else {
                const result = yield collection.insertOne(data);
                this['_id'] = new ObjectId_1.default(result.ops[0]._id);
            }
        });
    }
    remove() {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield Database_1.default.connect();
            const collection = db.collection(this.__collection__);
            if (this['_id'] !== undefined) {
                yield collection.deleteOne({
                    _id: this['_id'].toObjectID()
                });
            }
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Model;
function parseDb(type, value) {
    switch (type) {
        case String:
        case Number:
        case Boolean:
        case Date:
            return type(value);
        case ObjectId_1.default:
            return new ObjectId_1.default(value);
        default:
            switch (type.__proto__) {
                case Model:
                    return fromDb(type, value);
                case Array:
                    return new type(value);
            }
    }
}
function fromDb(model, data) {
    let result = new model();
    if (data === null || data === undefined) {
        return null;
    }
    const schema = model.prototype.__schema__;
    for (const key in schema) {
        const value = data[key];
        const type = schema[key];
        if (data[key]) {
            result[key] = parseDb(type, value);
        }
    }
    return result;
}
exports.fromDb = fromDb;
function Field(prototype, key) {
    const type = Reflect.getMetadata(ReflectType_1.default.TYPE, prototype, key);
    if (([String, Number, Boolean, Date, ObjectId_1.default].indexOf(type) === -1) &&
        (type.__proto__ !== Model)) {
        throw new Error(`@Field can only annotate primitive tyeps and models`);
    }
    prototype.__schema__ = prototype.__schema__ || {};
    prototype.__schema__[key] = type;
}
exports.Field = Field;
function ArrayField(embedType) {
    if (([String, Number, Boolean, Date, ObjectId_1.default].indexOf(embedType) === -1) &&
        (embedType.__proto__ !== Model)) {
        throw new Error(`@ArrayField can only take primitive tyeps and models`);
    }
    return (prototype, key) => {
        const type = Reflect.getMetadata(ReflectType_1.default.TYPE, prototype, key);
        if (Array !== type) {
            throw new Error(`@ArrayField can only annotate arrays`);
        }
        prototype.__schema__ = prototype.__schema__ || {};
        prototype.__schema__[key] = class extends Array {
            constructor(data) {
                const length = data.length;
                super(length);
                for (let i = 0; i < length; i++) {
                    this[i] = parseDb(embedType, data[i]);
                }
            }
            toJSON() {
                switch (embedType) {
                    case String:
                    case Number:
                    case Boolean:
                    case Date:
                        return this.map(i => i);
                    default:
                        if (embedType.prototype.toJSON) {
                            return this.map(i => i.toJSON());
                        }
                        else if (embedType.prototype.toString) {
                            return this.map(i => i.toString());
                        }
                        else {
                            return this.map(i => i);
                        }
                }
            }
        }
        ;
    };
}
exports.ArrayField = ArrayField;
function Collection(name) {
    return function (target) {
        Object.defineProperty(target.prototype, '__collection__', {
            configurable: false,
            writable: false,
            enumerable: false,
            value: name
        });
        Object.defineProperty(target.prototype, '__schema__', {
            configurable: false,
            writable: false,
            enumerable: false,
            value: target.prototype.__schema__
        });
    };
}
exports.Collection = Collection;
