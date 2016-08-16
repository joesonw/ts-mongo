"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const QueryComparison_1 = require('./QueryComparison');
exports.QueryComparison = QueryComparison_1.default;
const Model_1 = require('../Model');
const Database_1 = require('../Database');
const _ = require('lodash');
const AggregateQuery_1 = require('./AggregateQuery');
exports.AggregateQuery = AggregateQuery_1.default;
const Pipeline = require('./Pipeline');
exports.Pipeline = Pipeline;
class Query {
    constructor(model, query) {
        this.query = {};
        this.query = query;
        this.model = model;
    }
    where(key) {
        return new QueryComparison_1.default(this.model, this.query, key);
    }
    or(...query) {
        return new Query(this.model, _.extend({
            $or: query.map(q => q.query)
        }, this.query));
    }
    and(...query) {
        return new Query(this.model, _.extend({
            $and: query.map(q => q.query)
        }, this.query));
    }
    not(...query) {
        return new Query(this.model, _.extend({
            $not: query.map(q => q.query)
        }, this.query));
    }
    nor(...query) {
        return new Query(this.model, _.extend({
            $nor: query.map(q => q.query)
        }, this.query));
    }
    aggregate(...cond) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield Database_1.default.connect();
            const collection = this.model.prototype.__collection__;
            const doResult = yield db
                .collection(collection)
                .aggregate(cond.map(q => q.query()))
                .toArray();
            console.log(doResult);
        });
    }
    findOne() {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield Database_1.default.connect();
            const collection = this.model.prototype.__collection__;
            const doResult = yield db
                .collection(collection)
                .findOne(this.query);
            return Model_1.fromDb(this.model, doResult);
        });
    }
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            let result = [];
            const db = yield Database_1.default.connect();
            const collection = this.model.prototype.__collection__;
            const doResult = yield db
                .collection(collection)
                .find(this.query)
                .toArray();
            for (const data of doResult) {
                const item = Model_1.fromDb(this.model, data);
                if (item) {
                    result.push(item);
                }
            }
            return result;
        });
    }
    count() {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield Database_1.default.connect();
            const collection = this.model.prototype.__collection__;
            const doResult = yield db
                .collection(collection)
                .count(this.query);
            return doResult;
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Query;
