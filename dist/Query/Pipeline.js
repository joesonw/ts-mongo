"use strict";
const AggregateQuery_1 = require('./AggregateQuery');
class MatchPipeline extends AggregateQuery_1.default {
    constructor(query) {
        super();
    }
    query() {
        return {
            $match: this.q.query
        };
    }
}
exports.MatchPipeline = MatchPipeline;
class LookUpPipeline extends AggregateQuery_1.default {
    constructor(from, localField, foreignField, as) {
        super();
        this.from = from;
        this.localField = localField;
        this.foreignField = foreignField;
        this.as = as;
    }
    query() {
        return {
            $lookup: {
                from: this.from,
                localField: this.localField,
                foreignField: this.foreignField,
                as: this.as
            }
        };
    }
}
exports.LookUpPipeline = LookUpPipeline;
