export default GeoCondition;
export abstract class Geo {
    public type: string;
    public coordinates: any;
    constructor(type: string, coordinates) {
        this.type = type;
        this.coordinates = coordinates;
    }
}

abstract class GeoCondition {
    abstract query(): any;
}

export class Geometry extends GeoCondition {
    private geo: Geo;
    constructor(geo: Geo) {
        super();
        this.geo = geo;
    }
    query(): any {
        const geo = this.geo;
        let $geometry: any = {
            $type: geo.type
        };
        if (geo.type === 'GeometryCollection') {
            $geometry.geometries = [];
            for (const g of geo.coordinates) {
                $geometry.geometries.push({
                    type: (<Geo>g).type,
                    coordinates: (<Geo>g).coordinates
                })
            }
        } else {
            $geometry.coordinates = geo.coordinates;
        }
        return {
            $geometry
        };
    }
}

export class Center extends GeoCondition {
    private geo: Point;
    private radius: number;
    constructor(geo: Point, radius: number) {
        super();
        this.geo = geo;
        this.radius = radius;
    }
    query(): any {
        return {
            $center: [this.geo.coordinates, this.radius]
        };
    }
}

export class CenterSphere extends GeoCondition {
    private geo: Point;
    private radius: number;
    constructor(geo: Point, radius: number) {
        super();
        this.geo = geo;
        this.radius = radius;
    }
    query(): any {
        return {
            $centerSphere: [this.geo.coordinates, this.radius]
        };
    }
}

export class Box extends GeoCondition {
    private tl: Point;
    private br: Point;
    constructor(tl: Point, br: Point) {
        super();
        this.tl = tl;
        this.br = br;
    }
    query(): any {
        return {
            $box: [this.tl.coordinates, this.br.coordinates]
        };
    }
}

export class PolygonRegion extends GeoCondition {
    private points: Array<Point>;
    constructor(...points: Array<Point>) {
        super();
        this.points = points;
    }
    query(): any {
        return {
            $polygon: this.points.map(point => point.coordinates)
        };
    }
}

export class Point extends Geo {
    constructor(lat: number, lng: number) {
        super('Point', [lat, lng]);
    }
}

export class LineString extends Geo {
    constructor(coordinates: Array<Point>) {
        super('LineString', coordinates);
    }
}

export class Polygon extends Geo {
    constructor(coordinates: Array<LineString>) {
        super('Polygon', coordinates);
    }
}

export class MultiPoint extends Geo {
    constructor(coordinates: Array<Point>) {
        super('MultiPoint', coordinates);
    }
}

export class MultiLineString extends Geo {
    constructor(coordinates: Array<LineString>) {
        super('MultiLineString', coordinates);
    }
}

export class MultiPolygon extends Geo {
    constructor(coordinates: Array<Polygon>) {
        super('MultiPolygon', coordinates);
    }
}

export class GeometryCollection extends Geo {
    constructor(coordinates: Array<Geo>) {
        super('MultiPolygon', coordinates);
    }
}
