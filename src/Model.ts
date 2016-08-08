import ReflectType from './ReflectType';
import 'reflect-metadata';
import {Db } from 'mongodb';
import Database from './Database';
import * as _ from 'lodash';
import ObjectId from './ObjectId';

export default class Model {
    public __collection__: string;
    public __schema__: {
        [key: string]:  any;
    };
    toJSON(): {[key: string] : any} {
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
                        } else if (value.toString) {
                            ret[key] = value.toString();
                        } else {
                            ret[key] = value;
                        }
                }
            }
        }
        return ret;
    }
    async save(): Promise<void> {
        const db = await Database.connect();
        const data = _.omit(this.toJSON(), '_id');
        const collection = db.collection(this.__collection__);
        if (this['_id'] !== undefined) {
            await collection.findOneAndReplace({
                _id: (<ObjectId>this['_id']).toObjectID()
            }, data);
        } else {
            const result = await collection.insertOne(data);
            this['_id'] = new ObjectId(result.ops[0]._id);
        }
    }
    async remove(): Promise<void> {
        const db = await Database.connect();
        const collection = db.collection(this.__collection__);
        if (this['_id'] !== undefined) {
            await collection.deleteOne({
                _id: (<ObjectId>this['_id']).toObjectID()
            });
        }
    }
}

function parseDb(type, value) {
    switch (type) {
        case String:
        case Number:
        case Boolean:
        case Date:
            return type(value);
        case ObjectId:
            return new ObjectId(value);
        default:
            switch (type.__proto__) {
                case Model:
                    return fromDb(type, value);
                case Array:
                    return new type(value);
            }
    }
}

export function fromDb<T extends Model>(model: new() => T, data): T {
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

export function Field<T extends Model>(prototype: T, key: string): void {
    const type = Reflect.getMetadata(ReflectType.TYPE, prototype, key);
    if (([String, Number, Boolean, Date, ObjectId].indexOf(type) === -1) &&
        (type.__proto__ !== Model)) {
        throw new Error(`@Field can only annotate primitive tyeps and models`);
    }
    prototype.__schema__ = prototype.__schema__ || {};
    prototype.__schema__[key] = type;
}

export function ArrayField<T extends Model>(embedType) {
    if (([String, Number, Boolean, Date, ObjectId].indexOf(embedType) === -1) &&
            (embedType.__proto__ !== Model)) {
        throw new Error(`@ArrayField can only take primitive tyeps and models`);
    }
    return (prototype: T, key: string):void => {
        const type = Reflect.getMetadata(ReflectType.TYPE, prototype, key);
        if (Array !== type) {
            throw new Error(`@ArrayField can only annotate arrays`);
        }
        prototype.__schema__ = prototype.__schema__ || {};
        prototype.__schema__[key] = class extends Array<typeof embedType> {
            constructor(data: Array<typeof embedType>) {
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
                        } else if (embedType.prototype.toString) {
                            return this.map(i => i.toString());
                        } else {
                            return this.map(i => i);
                        }
                }
            }
        };
    }
}

export function Collection(name: string) {
    return function<T extends Model>(target: new () => T) {
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
    }
}
