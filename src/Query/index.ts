import * as mongo from 'mongodb';
import QueryComparison from './QueryComparison';
import Model, {
    fromDb
} from '../Model';
import Database from '../Database';
import * as _ from 'lodash';
import AggregateQuery from './AggregateQuery';
import * as Pipeline from './Pipeline';

export {
    Pipeline,
    AggregateQuery,
    QueryComparison
};
export default class Query<T extends Model>{
    public query = {};
    private model:new() => T;
    constructor(model: (new () => T), query?: {[key: string] : any}) {
        this.query = query;
        this.model = model;
    }
    public where(key: string): QueryComparison<T> {
        return new QueryComparison<T>(this.model, this.query, key);
    }
    public or(...query: Array< Query<T> >): Query<T> {
        return new Query(this.model, _.extend({
                $or: query.map(q => q.query)
            }, this.query));
    }
    public and(...query: Array< Query<T> >): Query<T> {
        return new Query(this.model, _.extend({
                $and: query.map(q => q.query)
            }, this.query));
    }
    public not(...query: Array< Query<T> >): Query<T> {
        return new Query(this.model, _.extend({
                $not: query.map(q => q.query)
            }, this.query));
    }
    public nor(...query: Array< Query<T> >): Query<T> {
        return new Query(this.model, _.extend({
                $nor: query.map(q => q.query)
            }, this.query));
    }
    public async aggregate(...cond: Array<AggregateQuery>) {
        const db = await Database.connect();
        const collection = this.model.prototype.__collection__;
        const doResult = await db
                    .collection(collection)
                    .aggregate(cond.map(q => q.query()))
                    .toArray();
        console.log(doResult);
    }

    public async findOne(): Promise<T> {
        const db = await Database.connect();
        const collection = this.model.prototype.__collection__;
        const doResult = await db
                    .collection(collection)
                    .findOne(this.query);
        return fromDb(this.model, doResult);
    }

    public async find(): Promise<Array<T>> {
        let result = [];
        const db = await Database.connect();
        const collection = this.model.prototype.__collection__;
        const doResult = await db
                    .collection(collection)
                    .find(this.query)
                    .toArray();
        for (const data of doResult) {
            const item = fromDb(this.model, data);
            if (item) {
                result.push(item);
            }
        }
        return result;
    }
}
