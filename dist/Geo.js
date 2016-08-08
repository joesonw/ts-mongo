"use strict";
class Geo {
    constructor(type, coordinates) {
        this.type = type;
        this.coordinates = coordinates;
    }
}
exports.Geo = Geo;
class GeoCondition {
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GeoCondition;
class Geometry extends GeoCondition {
    constructor(geo) {
        super();
        this.geo = geo;
    }
    query() {
        const geo = this.geo;
        let $geometry = {
            $type: geo.type
        };
        if (geo.type === 'GeometryCollection') {
            $geometry.geometries = [];
            for (const g of geo.coordinates) {
                $geometry.geometries.push({
                    type: g.type,
                    coordinates: g.coordinates
                });
            }
        }
        else {
            $geometry.coordinates = geo.coordinates;
        }
        return {
            $geometry
        };
    }
}
exports.Geometry = Geometry;
class Center extends GeoCondition {
    constructor(geo, radius) {
        super();
        this.geo = geo;
        this.radius = radius;
    }
    query() {
        return {
            $center: [this.geo.coordinates, this.radius]
        };
    }
}
exports.Center = Center;
class CenterSphere extends GeoCondition {
    constructor(geo, radius) {
        super();
        this.geo = geo;
        this.radius = radius;
    }
    query() {
        return {
            $centerSphere: [this.geo.coordinates, this.radius]
        };
    }
}
exports.CenterSphere = CenterSphere;
class Box extends GeoCondition {
    constructor(tl, br) {
        super();
        this.tl = tl;
        this.br = br;
    }
    query() {
        return {
            $box: [this.tl.coordinates, this.br.coordinates]
        };
    }
}
exports.Box = Box;
class PolygonRegion extends GeoCondition {
    constructor(...points) {
        super();
        this.points = points;
    }
    query() {
        return {
            $polygon: this.points.map(point => point.coordinates)
        };
    }
}
exports.PolygonRegion = PolygonRegion;
class Point extends Geo {
    constructor(lat, lng) {
        super('Point', [lat, lng]);
    }
}
exports.Point = Point;
class LineString extends Geo {
    constructor(coordinates) {
        super('LineString', coordinates);
    }
}
exports.LineString = LineString;
class Polygon extends Geo {
    constructor(coordinates) {
        super('Polygon', coordinates);
    }
}
exports.Polygon = Polygon;
class MultiPoint extends Geo {
    constructor(coordinates) {
        super('MultiPoint', coordinates);
    }
}
exports.MultiPoint = MultiPoint;
class MultiLineString extends Geo {
    constructor(coordinates) {
        super('MultiLineString', coordinates);
    }
}
exports.MultiLineString = MultiLineString;
class MultiPolygon extends Geo {
    constructor(coordinates) {
        super('MultiPolygon', coordinates);
    }
}
exports.MultiPolygon = MultiPolygon;
class GeometryCollection extends Geo {
    constructor(coordinates) {
        super('MultiPolygon', coordinates);
    }
}
exports.GeometryCollection = GeometryCollection;
