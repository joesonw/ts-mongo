export declare abstract class Geo {
    type: string;
    coordinates: any;
    constructor(type: string, coordinates: any);
}
declare abstract class GeoCondition {
    abstract query(): any;
}
export default GeoCondition;
export declare class Geometry extends GeoCondition {
    private geo;
    constructor(geo: Geo);
    query(): any;
}
export declare class Center extends GeoCondition {
    private geo;
    private radius;
    constructor(geo: Point, radius: number);
    query(): any;
}
export declare class CenterSphere extends GeoCondition {
    private geo;
    private radius;
    constructor(geo: Point, radius: number);
    query(): any;
}
export declare class Box extends GeoCondition {
    private tl;
    private br;
    constructor(tl: Point, br: Point);
    query(): any;
}
export declare class PolygonRegion extends GeoCondition {
    private points;
    constructor(...points: Array<Point>);
    query(): any;
}
export declare class Point extends Geo {
    constructor(lat: number, lng: number);
}
export declare class LineString extends Geo {
    constructor(coordinates: Array<Point>);
}
export declare class Polygon extends Geo {
    constructor(coordinates: Array<LineString>);
}
export declare class MultiPoint extends Geo {
    constructor(coordinates: Array<Point>);
}
export declare class MultiLineString extends Geo {
    constructor(coordinates: Array<LineString>);
}
export declare class MultiPolygon extends Geo {
    constructor(coordinates: Array<Polygon>);
}
export declare class GeometryCollection extends Geo {
    constructor(coordinates: Array<Geo>);
}
