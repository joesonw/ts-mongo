import QueryComparison from './QueryComparison';
import Model from '../Model';
import AggregateQuery from './AggregateQuery';
import * as Pipeline from './Pipeline';
export { Pipeline, AggregateQuery, QueryComparison };
export default class Query<T extends Model> {
    query: {};
    private model;
    constructor(model: (new () => T), query?: {
        [key: string]: any;
    });
    where(key: string): QueryComparison<T>;
    or(...query: Array<Query<T>>): Query<T>;
    and(...query: Array<Query<T>>): Query<T>;
    not(...query: Array<Query<T>>): Query<T>;
    nor(...query: Array<Query<T>>): Query<T>;
    aggregate(...cond: Array<AggregateQuery>): Promise<void>;
    findOne(): Promise<T>;
    find(): Promise<Array<T>>;
    count(): Promise<number>;
}
