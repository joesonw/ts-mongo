import AggregateQuery from './AggregateQuery';
import Query from './';
import Model from '../Model';

export class MatchPipeline<T extends Model> extends AggregateQuery {
    private q: Query<T>;
    constructor(query: Query<T>) {
        super();
    }
    query() {
        return {
            $match: this.q.query
        };
    }
}

export class LookUpPipeline<T extends Model> extends AggregateQuery {
    private from: string;
    private localField: string;
    private foreignField: string;
    private as: string;
    constructor(from: string,
        localField: string,
        foreignField: string,
        as: string) {
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
