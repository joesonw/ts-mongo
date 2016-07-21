/// <reference path="../typings/index"/>
import * as mongo from 'mongodb';


export default class Database {
    private static db: mongo.Db;
    private static uri: string;
    public static async connect():Promise<mongo.Db> {
        if (this.db) return this.db;
        return await new Promise<mongo.Db>((resolve, reject) => {
            mongo.MongoClient.connect(this.uri, (err, db) => {
                if (err) return reject(err);
                this.db = db;
                return resolve(this.db);
            })
        });
    }
    public static setUri(uri: string) {
        this.uri = uri;
    }
}
