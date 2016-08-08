"use strict";
const _1 = require('./');
const _ = require('lodash');
class QueryComparison {
    constructor(model, query, key) {
        this.key = key;
        this.model = model;
        this.query = query;
    }
    eq(value) {
        return new _1.default(this.model, _.extend({
            [this.key]: {
                $eq: value
            }
        }, this.query));
    }
    ne(value) {
        return new _1.default(this.model, _.extend({
            [this.key]: {
                $ne: value
            }
        }, this.query));
    }
    gt(value) {
        return new _1.default(this.model, _.extend({
            [this.key]: {
                $gt: value
            }
        }, this.query));
    }
    lt(value) {
        return new _1.default(this.model, _.extend({
            [this.key]: {
                $lt: value
            }
        }, this.query));
    }
    gte(value) {
        return new _1.default(this.model, _.extend({
            [this.key]: {
                $gte: value
            }
        }, this.query));
    }
    lte(value) {
        return new _1.default(this.model, _.extend({
            [this.key]: {
                $lte: value
            }
        }, this.query));
    }
    in(value) {
        return new _1.default(this.model, _.extend({
            [this.key]: {
                $in: value
            }
        }, this.query));
    }
    nin(value) {
        return new _1.default(this.model, _.extend({
            [this.key]: {
                $nin: value
            }
        }, this.query));
    }
    exist(value) {
        return new _1.default(this.model, _.extend({
            [this.key]: {
                $exist: value
            }
        }, this.query));
    }
    type(value) {
        return new _1.default(this.model, _.extend({
            [this.key]: {
                $type: value
            }
        }, this.query));
    }
    all(...value) {
        return new _1.default(this.model, _.extend({
            [this.key]: {
                $all: value.map(query => query.query)
            }
        }, this.query));
    }
    elemMatch(query) {
        return new _1.default(this.model, _.extend({
            [this.key]: {
                $elemMatch: query.query
            }
        }, this.query));
    }
    size(value) {
        return new _1.default(this.model, _.extend({
            [this.key]: {
                $size: value
            }
        }, this.query));
    }
    geoWithin(geo) {
        return new _1.default(this.model, _.extend({
            [this.key]: {
                $geoWithin: geo.query()
            }
        }, this.query));
    }
    geoIntersects(geo) {
        return new _1.default(this.model, _.extend({
            [this.key]: {
                $geoIntersects: {
                    $geometry: geo.query()
                }
            }
        }, this.query));
    }
    near(geo, $maxDistance, $minDistance) {
        return new _1.default(this.model, _.extend({
            [this.key]: {
                $near: {
                    $geometry: {
                        type: geo.type,
                        coordinates: geo.coordinates
                    },
                    $maxDistance,
                    $minDistance
                }
            }
        }, this.query));
    }
    nearSphere(geo, $maxDistance, $minDistance) {
        return new _1.default(this.model, _.extend({
            [this.key]: {
                $nearSphere: {
                    $geometry: {
                        type: geo.type,
                        coordinates: geo.coordinates
                    },
                    $maxDistance,
                    $minDistance
                }
            }
        }, this.query));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = QueryComparison;
