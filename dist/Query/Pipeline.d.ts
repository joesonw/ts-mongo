import AggregateQuery from './AggregateQuery';
import Query from './';
import Model from '../Model';
export declare class MatchPipeline<T extends Model> extends AggregateQuery {
    private q;
    constructor(query: Query<T>);
    query(): {
        $match: {};
    };
}
export declare class LookUpPipeline<T extends Model> extends AggregateQuery {
    private from;
    private localField;
    private foreignField;
    private as;
    constructor(from: string, localField: string, foreignField: string, as: string);
    query(): {
        $lookup: {
            from: string;
            localField: string;
            foreignField: string;
            as: string;
        };
    };
}
