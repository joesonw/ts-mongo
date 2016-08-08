import Query from './';
import Model from '../Model';
import GeoCondition, { Point, Geometry } from '../Geo';
export default class QueryComparison<T extends Model> {
    private key;
    private model;
    private query;
    constructor(model: new () => T, query: {
        [key: string]: any;
    }, key: string);
    eq(value: any): Query<T>;
    ne(value: any): Query<T>;
    gt(value: any): Query<T>;
    lt(value: any): Query<T>;
    gte(value: any): Query<T>;
    lte(value: any): Query<T>;
    in(value: Array<any>): Query<T>;
    nin(value: Array<any>): Query<T>;
    exist(value: Boolean): Query<T>;
    type(value: string): Query<T>;
    all(...value: Array<Query<T>>): Query<T>;
    elemMatch(query: Query<T>): Query<T>;
    size(value: number): Query<T>;
    geoWithin(geo: GeoCondition): Query<T>;
    geoIntersects(geo: Geometry): Query<T>;
    near(geo: Point, $maxDistance?: number, $minDistance?: number): Query<T>;
    nearSphere(geo: Point, $maxDistance?: number, $minDistance?: number): Query<T>;
}
