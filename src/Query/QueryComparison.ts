import Query from './';
import Model from '../Model';
import * as _ from 'lodash';
import GeoCondition , {
    Point,
    Geometry
} from '../Geo';

export default class QueryComparison<T extends Model> {
    private key: string;
    private model: new() => T;
    private query: {[key: string] : any};

    constructor(model: new() => T, query: {[key: string] : any}, key: string) {
        this.key = key;
        this.model = model;
        this.query = query;
    }
    public eq(value): Query<T> {
        return new Query<T>(this.model, _.extend({
            [this.key]: {
                $eq: value
            }
        }, this.query));
    }
    public ne(value): Query<T> {
        return new Query<T>(this.model, _.extend({
            [this.key]: {
                $ne: value
            }
        }, this.query));
    }
    public gt(value): Query<T> {
        return new Query<T>(this.model, _.extend({
            [this.key]: {
                $gt: value
            }
        }, this.query));
    }
    public lt(value): Query<T> {
        return new Query<T>(this.model, _.extend({
            [this.key]: {
                $lt: value
            }
        }, this.query));
    }
    public gte(value): Query<T> {
        return new Query<T>(this.model, _.extend({
            [this.key]: {
                $gte: value
            }
        }, this.query));
    }
    public lte(value): Query<T> {
        return new Query<T>(this.model, _.extend({
            [this.key]: {
                $lte: value
            }
        }, this.query));
    }
    public in(value: Array<any>): Query<T> {
        return new Query<T>(this.model, _.extend({
            [this.key]: {
                $in: value
            }
        }, this.query));
    }
    public nin(value: Array<any>): Query<T> {
        return new Query<T>(this.model, _.extend({
            [this.key]: {
                $nin: value
            }
        }, this.query));
    }
    public exist(value: Boolean): Query<T> {
        return new Query<T>(this.model, _.extend({
            [this.key]: {
                $exist: value
            }
        }, this.query));
    }
    public type(value: string): Query<T> {
        return new Query<T>(this.model, _.extend({
            [this.key]: {
                $type: value
            }
        }, this.query));
    }
    public all(...value: Array< Query<T> >): Query<T> {
        return new Query<T>(this.model, _.extend({
            [this.key]: {
                $all: value.map(query => query.query)
            }
        }, this.query));
    }
    public elemMatch(query: Query<T>): Query<T> {
        return new Query<T>(this.model, _.extend({
            [this.key]: {
                $elemMatch: query.query
            }
        }, this.query));
    }
    public size(value: number): Query<T> {
        return new Query<T>(this.model, _.extend({
            [this.key]: {
                $size: value
            }
        }, this.query));
    }


    public geoWithin(geo: GeoCondition): Query<T>  {
        return new Query<T>(this.model, _.extend({
            [this.key]: {
                $geoWithin: geo.query()
            }
        }, this.query));
    }
    public geoIntersects(geo: Geometry): Query<T>  {
        return new Query<T>(this.model, _.extend({
            [this.key]: {
                $geoIntersects: {
                    $geometry: geo.query()
                }
            }
        }, this.query));
    }
    public near(geo: Point, $maxDistance?: number, $minDistance?: number): Query<T>  {
        return new Query<T>(this.model, _.extend({
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
    public nearSphere(geo: Point, $maxDistance?: number, $minDistance?: number): Query<T>  {
        return new Query<T>(this.model, _.extend({
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
